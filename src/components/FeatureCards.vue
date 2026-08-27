<script setup lang="ts">
const features = [
  {
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    title: 'Direct Release Download',
    desc: 'The main download button points to the latest Mac-Noodle.dmg asset published in GitHub Releases.',
  },
  {
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    title: 'Public Repository',
    desc: 'The website links to the project repository so the available source can be reviewed directly on GitHub.',
  },
]
</script>

<template>
  <section class="features" id="features" aria-label="Download options">
    <div class="features-header">
      <p class="eyebrow">What this website provides</p>
      <h2>A straightforward path <span class="text-accent">to the release.</span></h2>
    </div>
    <div class="features-grid">
      <article class="feature-card" v-for="f in features" :key="f.title">
        <span class="feature-icon" aria-hidden="true" v-html="f.icon"></span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </article>
    </div>
  </section>
</template>
