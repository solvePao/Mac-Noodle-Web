<script setup lang="ts">
import { computed } from 'vue'
import { useReleases, packageAsset, formatDate, formatSize } from '../composables/useReleases'

const { releases, loading, error, retry } = useReleases()

// Pre-compute the primary download asset once per release to avoid repeated calls in template
const releasesWithAsset = computed(() =>
  releases.value.map((r) => ({ release: r, asset: packageAsset(r) }))
)

const totalDownloads = computed(() =>
  releases.value.reduce((sum, r) => {
    const asset = packageAsset(r)
    return sum + (asset?.download_count ?? 0)
  }, 0)
)
</script>

<template>
  <section class="releases" aria-labelledby="releases-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Release history</p>
        <h2 id="releases-title">Recent packages</h2>
        <p v-if="!loading && !error && totalDownloads > 0" class="total-downloads">
          {{ totalDownloads.toLocaleString() }} total downloads across listed releases
        </p>
      </div>
      <a href="https://github.com/solvePao/Mac-Noodle-App/releases">View all on GitHub</a>
    </div>

    <div class="release-list" aria-live="polite">
      <!-- Loading skeleton -->
      <template v-if="loading">
        <div class="release release--skeleton" v-for="n in 3" :key="n" aria-hidden="true">
          <div>
            <div class="skeleton" style="width: 140px; margin-bottom: 10px;"></div>
            <div class="skeleton" style="width: 80px;"></div>
          </div>
          <div class="release-meta">
            <div class="skeleton" style="width: 160px;"></div>
            <div class="skeleton" style="width: 110px;"></div>
          </div>
          <div class="release-links">
            <div class="skeleton" style="width: 110px; height: 36px; border-radius: 8px;"></div>
            <div class="skeleton" style="width: 100px; height: 36px; border-radius: 8px;"></div>
          </div>
        </div>
      </template>

      <!-- Error state -->
      <div v-else-if="error" class="empty error-state">
        <p>{{ error }}</p>
        <button type="button" class="retry-btn" @click="retry">Try again</button>
        <p>Or <a href="https://github.com/solvePao/Mac-Noodle-App/releases">view releases on GitHub</a>.</p>
      </div>

      <!-- Empty state -->
      <p v-else-if="releases.length === 0" class="empty">
        No packages have been published yet.
      </p>

      <!-- Release rows -->
      <article
        v-else
        v-for="{ release, asset } in releasesWithAsset"
        :key="release.id"
        class="release"
      >
        <!-- Name + tag -->
        <div>
          <h3>{{ release.name || release.tag_name }}</h3>
          <p>{{ release.tag_name }}</p>
        </div>

        <!-- Meta: date + size / downloads -->
        <div class="release-meta">
          <p>Published {{ formatDate(release.published_at) }}</p>
          <p v-if="asset">
            {{ formatSize(asset.size) }} · {{ asset.download_count.toLocaleString() }} downloads
          </p>
        </div>

        <!-- Download + release notes links -->
        <div class="release-links">
          <a v-if="asset" :href="asset.browser_download_url">
            {{ asset.name.endsWith('.dmg') ? 'Download DMG' : 'Download ZIP' }}
          </a>
          <a :href="release.html_url">Release notes</a>
        </div>
      </article>
    </div>

    <noscript>
      <p class="empty">JavaScript is required for the release list. Use the "View all on GitHub" link above.</p>
    </noscript>
  </section>
</template>
