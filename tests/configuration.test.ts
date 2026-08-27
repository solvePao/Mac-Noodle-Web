import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')

function read(path: string): string {
  return readFileSync(join(root, path), 'utf8')
}

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? sourceFiles(path) : [path]
  })
}

describe('Cloudflare Pages deployment', () => {
  it('uses Pages configuration rather than a Workers assets deployment', () => {
    const config = JSON.parse(read('wrangler.jsonc'))
    const packageJson = JSON.parse(read('package.json'))

    expect(config.pages_build_output_dir).toBe('./dist')
    expect(config.assets).toBeUndefined()
    expect(packageJson.scripts.deploy).toContain('wrangler pages deploy')
  })

  it('does not retain the GitHub Pages workflow', () => {
    expect(existsSync(join(root, '.github/workflows/pages.yml'))).toBe(false)
  })

  it('uses the custom Cloudflare domain as the public origin', () => {
    const publicFiles = [read('README.md'), read('src/layouts/Layout.astro'), read('src/components/CommandSection.vue')].join('\n')

    expect(publicFiles).toContain('https://macnoodle.solvepao.com')
    expect(publicFiles).not.toContain('mac-noodle-web.pages.dev')
  })
})

describe('static release integration', () => {
  it('contains no GitHub API client in application source', () => {
    const source = sourceFiles(join(root, 'src'))
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n')

    expect(source).not.toContain('api.github.com')
    expect(source).not.toContain('useReleases')
    expect(source).not.toContain('ReleaseList')
    expect(source).not.toContain('Testimonials')
  })

  it('uses the canonical repository in the installer', () => {
    const installer = read('public/install.sh')

    expect(installer).toContain('readonly repository="solvePao/Mac-Noodle-Web"')
    expect(installer).not.toContain('Mac-Noodle-App')
  })
})

describe('container context', () => {
  it('ignores root build artifacts and dependencies', () => {
    const ignored = read('.dockerignore').split(/\r?\n/)

    expect(ignored).toEqual(
      expect.arrayContaining(['node_modules', 'dist', '.astro', '.wrangler', '.git']),
    )
    expect(ignored).not.toContain('web/node_modules')
  })
})

describe('visual theme', () => {
  it('uses the Better University Cappuccino palette', () => {
    const layout = read('src/layouts/Layout.astro')

    expect(layout).toContain('--noodle-accent: #854442')
    expect(layout).toContain('--noodle-bg: #fff4e6')
    expect(layout).toContain('--noodle-accent: #be9b7b')
    expect(layout).toContain('--noodle-bg: #241b19')
  })
})
