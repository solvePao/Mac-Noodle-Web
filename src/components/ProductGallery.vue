<script setup lang="ts">
import storageOverviewAsset from '../../assets/56573127-F4A1-4FB3-9D70-367F96F19F95.png'
import reclaimableSpaceAsset from '../../assets/6E76D9C3-7CEF-4F5B-B228-B6BFD78DF633.png'
import controlAsset from '../../assets/B8DC2B05-7C08-4627-87CB-6D28A30991CA.png'

const storageOverviewImage = storageOverviewAsset.src
const reclaimableSpaceImage = reclaimableSpaceAsset.src
const controlImage = controlAsset.src

const visuals = [
  {
    src: storageOverviewImage,
    alt: 'Mac Noodle storage overview with space details and a Noodle Scan card',
    title: 'See storage clearly',
    description: 'Get a calm visual overview of used, available, and purgeable space on your Mac.',
  },
  {
    src: reclaimableSpaceImage,
    alt: 'Mac Noodle reclaimable storage overview with macOS management options',
    title: 'Understand reclaimable space',
    description: 'Know what macOS can free automatically and what you can review yourself.',
  },
  {
    src: controlImage,
    alt: 'Mac Noodle review-before-cleaning screen with manual controls',
    title: 'Stay in control',
    description: 'Preview, select, and clean with confidence—nothing is removed automatically.',
  },
]
</script>

<template>
  <section class="product-gallery" aria-labelledby="gallery-title">
    <div class="gallery-heading">
      <p class="eyebrow">Built for clarity</p>
      <h2 id="gallery-title">A cleaner Mac, <span class="text-accent">on your terms.</span></h2>
    </div>
    <div class="gallery-list">
      <article
        v-for="(visual, index) in visuals"
        :key="visual.title"
        class="gallery-card"
        :class="{ 'gallery-card-reversed': index % 2 === 1 }"
      >
        <div class="gallery-media">
          <img :src="visual.src" :alt="visual.alt" width="1586" height="992" loading="lazy" />
        </div>
        <div class="gallery-copy">
          <span class="gallery-index">0{{ index + 1 }}</span>
          <h3>{{ visual.title }}</h3>
          <p>{{ visual.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.product-gallery { padding: 92px 0 96px; }
.gallery-heading { max-width: 720px; margin-bottom: 42px; }
.gallery-list { display: grid; gap: 18px; }
.gallery-card {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(250px, 0.65fr);
  align-items: center;
  gap: clamp(22px, 4vw, 56px);
  padding: clamp(16px, 2vw, 24px);
  background: linear-gradient(135deg, var(--noodle-surface), color-mix(in srgb, var(--noodle-bg-subtle) 28%, var(--noodle-surface)));
  border: 1px solid var(--noodle-border);
  border-radius: 24px;
  box-shadow: var(--noodle-shadow);
}
.gallery-card:nth-child(even) { background: linear-gradient(225deg, var(--noodle-surface), color-mix(in srgb, var(--noodle-success-wash) 42%, var(--noodle-surface))); }
.gallery-card-reversed .gallery-media { order: 2; }
.gallery-media {
  overflow: hidden;
  background: var(--noodle-bg);
  border: 1px solid var(--noodle-border);
  border-radius: 16px;
  box-shadow: 0 14px 32px color-mix(in srgb, var(--noodle-ink) 10%, transparent);
}
.gallery-media img { display: block; width: 100%; height: auto; }
.gallery-copy { max-width: 390px; padding: 10px 4px; }
.gallery-index { display: block; margin-bottom: 14px; color: var(--noodle-accent); font-size: 11px; font-weight: 850; letter-spacing: 0.14em; }
.gallery-copy h3 { margin: 0; font-size: 21px; letter-spacing: -0.03em; }
.gallery-copy p { margin: 8px 0 0; color: var(--noodle-text-muted); font-size: 14px; line-height: 1.7; }

@media (max-width: 760px) {
  .product-gallery { padding: 72px 0; }
  .gallery-list { gap: 18px; }
  .gallery-card { grid-template-columns: 1fr; gap: 18px; padding: 14px; border-radius: 20px; }
  .gallery-card-reversed .gallery-media { order: initial; }
  .gallery-copy { max-width: none; padding: 4px 6px 8px; }
  .gallery-index { margin-bottom: 8px; }
}
</style>
