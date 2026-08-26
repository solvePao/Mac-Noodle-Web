<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': menuOpen }">
    <a class="brand" href="./">
      <img src="/favicon.svg" alt="" width="28" height="28" class="brand-icon" />
      Mac Noodle
    </a>
    <button
      class="menu-toggle"
      type="button"
      aria-label="Toggle menu"
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
    <nav aria-label="Primary navigation" :class="{ 'nav-visible': menuOpen }">
      <a href="#features" @click="menuOpen = false">Features</a>
      <a href="#how-it-works" @click="menuOpen = false">Install</a>
      <a href="#releases" @click="menuOpen = false">Releases</a>
      <a href="https://github.com/solvePao/Mac-Noodle-App" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <a class="header-cta" href="https://github.com/solvePao/Mac-Noodle-App/releases/latest">Download Free</a>
  </header>
</template>
