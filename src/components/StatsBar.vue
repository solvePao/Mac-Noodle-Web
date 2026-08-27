<script setup lang="ts">
const stats = [
  {
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    value: 'Latest DMG',
    label: 'GitHub Releases',
  },
  {
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    value: 'Source Code',
    label: 'Public on GitHub',
  },
  {
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    value: 'Shell Helper',
    label: 'Optional Install',
  },
]
</script>

<template>
  <section class="stats-bar" aria-label="Key metrics">
    <div class="stat" v-for="s in stats" :key="s.label">
      <span class="stat-icon" v-html="s.icon" aria-hidden="true"></span>
      <span class="stat-value">{{ s.value }}</span>
      <span class="stat-label">{{ s.label }}</span>
    </div>
  </section>
</template>
