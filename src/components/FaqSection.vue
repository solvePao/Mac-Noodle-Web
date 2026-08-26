<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  {
    q: 'Is Mac Noodle free?',
    a: 'Yes — 100% free and open source. No trials, no subscriptions, no hidden fees. Ever.',
  },
  {
    q: 'Is it safe to use?',
    a: 'Absolutely. Every build is notarized by Apple, code-signed, and verified with a SHA-256 checksum. The full source code is public on GitHub for anyone to audit.',
  },
  {
    q: 'How does it work?',
    a: 'Run a scan, review the results, then clean with one click. Mac Noodle never deletes anything without your explicit approval.',
  },
  {
    q: 'Where do I get it?',
    a: 'Download the latest build directly from this page, or install via the terminal command in the Install section above.',
  },
  {
    q: 'What macOS versions are supported?',
    a: 'Mac Noodle supports macOS 12 (Monterey) and later, including macOS Sequoia.',
  },
]

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section class="faq" aria-labelledby="faq-title">
    <div class="faq-header">
      <p class="eyebrow">FAQ</p>
      <h2 id="faq-title">Wait, <span class="text-accent">what about…</span></h2>
    </div>
    <div class="faq-list">
      <div
        class="faq-item"
        v-for="(f, i) in faqs"
        :key="i"
        :class="{ 'faq-open': openIndex === i }"
      >
        <button
          class="faq-btn"
          type="button"
          @click="toggle(i)"
          :aria-expanded="openIndex === i"
        >
          <span class="faq-question">{{ f.q }}</span>
          <svg
            class="faq-chevron"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div class="faq-answer" v-show="openIndex === i">
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
