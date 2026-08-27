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
      <article v-for="visual in visuals" :key="visual.title" class="gallery-card">
        <img :src="visual.src" :alt="visual.alt" width="1586" height="992" loading="lazy" />
        <div class="gallery-copy">
          <h3>{{ visual.title }}</h3>
          <p>{{ visual.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.product-gallery { padding: 32px 0 96px; }
.gallery-heading { max-width: 720px; margin-bottom: 42px; }
.gallery-list { display: grid; gap: 26px; }
.gallery-card {
  overflow: hidden;
  background: var(--noodle-surface);
  border: 1px solid var(--noodle-border);
  border-radius: 28px;
  box-shadow: var(--noodle-shadow);
}
.gallery-card img { display: block; width: 100%; height: auto; }
.gallery-copy { max-width: 720px; padding: 24px 28px 28px; }
.gallery-copy h3 { margin: 0; font-size: 21px; letter-spacing: -0.03em; }
.gallery-copy p { margin: 6px 0 0; color: var(--noodle-text-muted); font-size: 14px; }

@media (max-width: 760px) {
  .product-gallery { padding: 16px 0 72px; }
  .gallery-list { gap: 18px; }
  .gallery-card { border-radius: 20px; }
  .gallery-copy { padding: 18px 20px 22px; }
}
</style>
