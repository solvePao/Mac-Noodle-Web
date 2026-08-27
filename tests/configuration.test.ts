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

describe('Cloudflare Workers deployment', () => {
  it('deploys the Astro output as Workers Static Assets', () => {
    const config = JSON.parse(read('wrangler.jsonc'))
    const packageJson = JSON.parse(read('package.json'))

    expect(config.pages_build_output_dir).toBeUndefined()
    expect(config.main).toBeUndefined()
    expect(config.assets).toEqual({ directory: './dist' })
    expect(packageJson.scripts.deploy).toBe('npm run build && wrangler deploy')
  })

  it('does not retain the GitHub Pages workflow', () => {
    expect(existsSync(join(root, '.github/workflows/pages.yml'))).toBe(false)
  })

  it('uses the custom Cloudflare domain as the public origin', () => {
    const publicFiles = [read('README.md'), read('src/layouts/Layout.astro'), read('src/components/Hero.vue')].join('\n')

    expect(publicFiles).toContain('https://macnoodle.solvepao.com')
    expect(publicFiles).not.toContain('mac-noodle-web.pages.dev')
    expect(publicFiles).not.toContain('Hosted on Cloudflare Pages')
  })

  it('documents native Workers Builds instead of repository-owned deployment automation', () => {
    const readme = read('README.md')

    expect(readme).toContain('Workers Builds')
    expect(readme).toContain('`npx wrangler deploy`')
    expect(readme).not.toContain('Cloudflare Pages is the sole deployment path')
    expect(existsSync(join(root, '.github/workflows/deploy.yml'))).toBe(false)
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
  it('uses the Better University Cappuccino palette with light mode as the default', () => {
    const layout = read('src/layouts/Layout.astro')

    expect(layout).toContain('<html lang="en" data-theme="light">')
    expect(layout).toContain(':root[data-theme="dark"]')
    expect(layout).not.toContain('@media (prefers-color-scheme: dark)')
    expect(layout).toContain('--noodle-accent: #854442')
    expect(layout).toContain('--noodle-bg: #fff4e6')
    expect(layout).toContain('--noodle-accent: #be9b7b')
    expect(layout).toContain('--noodle-bg: #241b19')
  })
})

describe('product artwork', () => {
  it('uses the supplied app icon and marketing visuals', () => {
    const hero = read('src/components/Hero.vue')
    const gallery = read('src/components/ProductGallery.vue')
    const header = read('src/components/SiteHeader.vue')

    expect(existsSync(join(root, 'assets/4A035189-C821-4892-B2C4-FE461C30127B.png'))).toBe(true)
    expect(existsSync(join(root, 'assets/29FAE49F-DEF2-4403-9C96-CA1C60329E99.png'))).toBe(true)
    expect(hero).toContain('cleanSmarterAsset.src')
    expect(gallery).toContain('storageOverviewAsset.src')
    expect(gallery).toContain('reclaimableSpaceAsset.src')
    expect(gallery).toContain('controlAsset.src')
    expect(header).toContain('appIconAsset.src')
  })
})

describe('support page', () => {
  it('publishes a canonical support route with email and public help channels', () => {
    const support = read('src/pages/support.astro')

    expect(support).toContain('canonicalPath="/support"')
    expect(support).toContain('Questions?')
    expect(support).toContain('contact@solvepao.com')
    expect(support).toContain('SolvePao Research')
    expect(support).toContain('issues/new')
  })
})

describe('company attribution', () => {
  it('identifies SolvePao Research as Mac Noodle\'s parent company', () => {
    const layout = read('src/layouts/Layout.astro')

    expect(layout).toContain('A product of SolvePao Research.')
    expect(layout).toContain('mailto:contact@solvepao.com')
    expect(layout).toContain('© {year} SolvePao Research')
  })
})
