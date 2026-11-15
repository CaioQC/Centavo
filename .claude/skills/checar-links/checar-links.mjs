// Confere os links das notas do Centavo. Uso (na raiz do repositório):
//   node .claude/skills/checar-links/checar-links.mjs            -> todas as notas
//   node .claude/skills/checar-links/checar-links.mjs a.md b.md  -> só esses arquivos
// Sai com código 1 se encontrar problema.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, normalize, relative } from 'node:path'

const ROOT = process.cwd()
const SKIP_DIRS = new Set(['node_modules', '.git', '.obsidian', '.trash', 'templates'])
const ROOT_FILES = ['CLAUDE.md', 'README.md']
const DIRS = ['docs', '.claude', '.github']

// Exemplos de propósito nas notas: caminho/relativo.md, adr-09-....md, fase-N.md
const isPlaceholder = (t) => t.includes('...') || t.startsWith('caminho/') || /(^|\/)fase-N\.md$/.test(t)

function walk(dir, out) {
  if (!existsSync(dir)) return
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out)
    } else if (name.endsWith('.md')) out.push(p)
  }
}

function files() {
  const args = process.argv.slice(2)
  if (args.length) return args
  const out = ROOT_FILES.filter((f) => existsSync(f))
  for (const d of DIRS) walk(d, out)
  return out
}

const problems = []
const report = (file, line, kind, target) =>
  problems.push(`${relative(ROOT, file).replaceAll('\\', '/')}:${line}  ${kind}  ${target}`)

for (const file of files()) {
  let inFence = false
  readFileSync(file, 'utf8').split('\n').forEach((raw, i) => {
    const n = i + 1
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; return }
    if (inFence) return

    const spans = [...raw.matchAll(/`([^`]+)`/g)].map((m) => m[1])
    const text = raw.replace(/`[^`]*`/g, '')

    for (const m of text.matchAll(/\[\[[^\]]+\]\]/g)) report(file, n, 'wikilink (use link Markdown relativo)', m[0])

    for (const m of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1]
      if (/^(https?:|mailto:|#)/.test(target) || isPlaceholder(target)) continue
      const [path, anchor] = target.split('#')
      if (anchor !== undefined) report(file, n, 'link para seção (linke a nota inteira)', target)
      if (path && !existsSync(normalize(join(dirname(file), decodeURIComponent(path))))) {
        report(file, n, 'link quebrado', target)
      }
    }

    for (const s of spans) {
      if (/^(docs|\.claude|\.github)\/\S+\.(md|json|mjs)$/.test(s) && !isPlaceholder(s) && !existsSync(s)) {
        report(file, n, 'caminho entre crases não existe', s)
      }
    }
  })
}

if (problems.length) {
  console.log(problems.join('\n'))
  console.log(`\n${problems.length} problema(s).`)
  process.exit(1)
}
console.log('Links OK.')
