<script setup lang="ts">
import { onMounted, ref } from 'vue'
import appIconAsset from '../../assets/4A035189-C821-4892-B2C4-FE461C30127B.png'

const menuOpen = ref(false)
const appIcon = appIconAsset.src
const theme = ref<'light' | 'dark'>('light')

function applyTheme(nextTheme: 'light' | 'dark') {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme

  try {
    localStorage.setItem('mac-noodle-theme', nextTheme)
  } catch {
    // The visual preference still works when local storage is unavailable.
  }
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  try {
    applyTheme(localStorage.getItem('mac-noodle-theme') === 'dark' ? 'dark' : 'light')
  } catch {
    applyTheme('light')
  }
})
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': menuOpen }">
    <a class="brand" href="/">
      <img :src="appIcon" alt="" width="28" height="28" class="brand-icon" />
      Mac Noodle
    </a>
    <button
      class="menu-toggle"
      type="button"
      aria-label="Toggle menu"
      aria-controls="primary-navigation"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <svg v-if="!menuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <nav id="primary-navigation" aria-label="Primary navigation" :class="{ 'nav-visible': menuOpen }">
      <a href="/#features" @click="menuOpen = false">Options</a>
      <a href="/#how-it-works" @click="menuOpen = false">Install</a>
      <a href="/support" @click="menuOpen = false">Support</a>
      <a href="https://github.com/solvePao/Mac-Noodle-Web/releases" target="_blank" rel="noopener">Releases</a>
      <a href="https://github.com/solvePao/Mac-Noodle-Web" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <button
      class="theme-toggle"
      type="button"
      :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
      :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
      @click="toggleTheme"
    >
      <svg v-if="theme === 'light'" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg v-else width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
    <a class="header-cta" href="https://github.com/solvePao/Mac-Noodle-Web/releases/latest/download/Mac-Noodle.dmg">Download</a>
  </header>
</template>
