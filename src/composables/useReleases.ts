import { ref, onMounted } from 'vue'

const REPOSITORY = 'solvePao/Mac-Noodle-App'

export interface Asset {
  name: string
  browser_download_url: string
  size: number
  download_count: number
}

export interface Release {
  id: number
  name: string
  tag_name: string
  published_at: string
  html_url: string
  draft: boolean
  assets: Asset[]
}

export function packageAsset(release: Release): Asset | undefined {
  return (
    release.assets.find((a) => a.name === 'Mac-Noodle.dmg') ??
    release.assets.find((a) => a.name.endsWith('.dmg')) ??
    release.assets.find((a) => a.name === 'Mac-Noodle.zip') ??
    release.assets.find((a) => a.name.endsWith('.zip'))
  )
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(value))
}

export function formatSize(bytes: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'unit',
    unit: 'megabyte',
    maximumFractionDigits: 1,
  }).format(bytes / 1_000_000)
}

export function useReleases() {
  const releases = ref<Release[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchReleases() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPOSITORY}/releases?per_page=10`,
        { headers: { Accept: 'application/vnd.github+json' } }
      )
      if (!res.ok) {
        if (res.status === 403) throw new Error('rate-limited')
        throw new Error(`GitHub returned ${res.status}`)
      }
      const data: Release[] = await res.json()
      releases.value = data.filter((r) => !r.draft)
    } catch (e: unknown) {
      error.value =
        e instanceof Error && e.message === 'rate-limited'
          ? 'GitHub rate limit reached. Try again in a minute.'
          : 'Release data is temporarily unavailable.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchReleases)

  return { releases, loading, error, retry: fetchReleases }
}
