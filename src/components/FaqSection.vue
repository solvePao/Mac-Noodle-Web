<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  {
    q: 'Where does the download come from?',
    a: 'The download buttons point directly to the latest Mac-Noodle.dmg asset in the project’s GitHub Releases.',
  },
  {
    q: 'What does the terminal helper do?',
    a: 'It downloads the latest DMG and checksum, verifies the disk image, then installs Mac Noodle in your Applications folder without sudo.',
  },
  {
    q: 'Does this website use a releases API?',
    a: 'No. Release history is deferred for now, so the website uses static GitHub links without making a release API request.',
  },
  {
    q: 'Where can I review the source?',
    a: 'Use the GitHub links in the header or footer to open the public project repository.',
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
          :aria-controls="`faq-answer-${i}`"
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
        <div
          class="faq-answer"
          :id="`faq-answer-${i}`"
          v-show="openIndex === i"
        >
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
