<script setup lang="ts">
import { ref } from 'vue'

const INSTALL_COMMAND = 'curl -fsSL https://solvepao.github.io/Mac-Noodle-App/install.sh | sh'
const copyLabel = ref('Copy')

function copy() {
  navigator.clipboard.writeText(INSTALL_COMMAND).then(() => {
    copyLabel.value = 'Copied ✓'
    window.setTimeout(() => {
      copyLabel.value = 'Copy'
    }, 1800)
  })
}

const steps = [
  {
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    num: '1',
    title: 'Download or Install',
    desc: 'Grab the latest build from this page, or install with a single terminal command. No signup, no account.',
  },
  {
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    num: '2',
    title: 'Scan Your Mac',
    desc: 'Mac Noodle analyzes your entire drive for caches, junk files, duplicates, and leftover app data.',
  },
  {
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    num: '3',
    title: 'Clean & Optimize',
    desc: "Review what's found, then clean with one click. Nothing is deleted without your explicit approval.",
  },
]
</script>

<template>
  <section class="how-it-works" id="how-it-works" aria-labelledby="how-title">
    <div class="how-header">
      <p class="eyebrow">How it works</p>
      <h2 id="how-title">Three steps to a <span class="text-accent">cleaner Mac.</span></h2>
    </div>

    <div class="how-steps">
      <div class="how-step" v-for="step in steps" :key="step.num">
        <div class="step-num">{{ step.num }}</div>
        <span class="step-icon" v-html="step.icon" aria-hidden="true"></span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.desc }}</p>
      </div>
    </div>

    <div class="how-command">
      <p class="how-command-label">Or install via terminal:</p>
      <div class="code-row">
        <code>{{ INSTALL_COMMAND }}</code>
        <button type="button" @click="copy">{{ copyLabel }}</button>
      </div>
      <ul class="command-details">
        <li>Downloads the latest signed build from GitHub Releases</li>
        <li>Verifies the published SHA-256 checksum</li>
        <li>Never asks for <code>sudo</code> — runs entirely in your home directory</li>
      </ul>
    </div>
  </section>
</template>
