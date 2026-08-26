<script setup lang="ts">
import { computed } from 'vue'
import { useReleases, packageAsset, formatDate } from '../composables/useReleases'

const { releases, loading, error } = useReleases()

const latest = computed(() => releases.value[0] ?? null)
const latestAsset = computed(() => (latest.value ? packageAsset(latest.value) : null))

const latestHref = computed(() => {
  if (latestAsset.value) return latestAsset.value.browser_download_url
  return 'https://github.com/solvePao/Mac-Noodle-App/releases/latest/download/Mac-Noodle.zip'
})

const latestStatus = computed(() => {
  if (loading.value) return 'Loading the latest release…'
  if (error.value) return 'Release details temporarily unavailable — the download link still works.'
  if (!latest.value) return 'The first prod build has not been published yet.'
  return `${latest.value.name || latest.value.tag_name} · published ${formatDate(latest.value.published_at)}`
})
</script>

<template>
  <section class="hero" id="download">
    <div class="hero-icon-wrap">
      <img src="/favicon.svg" alt="Mac Noodle icon" class="hero-icon" width="96" height="96" />
    </div>
    <p class="eyebrow">Mac Noodle for macOS</p>
    <h1>A Mac cleaner?<br />A Mac <span class="text-accent">saver.</span></h1>
    <p class="lede">
      Free up space, remove junk, and keep your Mac running at peak performance.
      Every build is signed, notarized, and verified by SHA‑256 checksum. No signup required.
    </p>
    <div class="actions">
      <a class="button button-primary" :href="latestHref">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Latest
      </a>
      <a class="button button-outline" href="#how-it-works">Install via Terminal</a>
    </div>
    <p class="release-status" role="status">{{ latestStatus }}</p>
    <ul class="trust-badges">
      <li>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        Notarized &amp; Signed by Apple
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        Built by Xcode Cloud
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        Checksum verified
      </li>
      <li>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        100% free &amp; open source
      </li>
    </ul>
  </section>
</template>
