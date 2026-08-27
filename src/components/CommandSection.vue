<script setup lang="ts">
import { ref } from 'vue'

const INSTALL_COMMAND = 'curl -fsSL https://macnoodle.solvepao.com/install.sh | sh'
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
    title: 'Choose a Method',
    desc: 'Use the direct GitHub release link or run the optional terminal helper shown below.',
  },
  {
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    num: '2',
    title: 'Download the DMG',
    desc: 'Both options retrieve Mac-Noodle.dmg from the latest release in the project repository.',
  },
  {
    icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--noodle-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    num: '3',
    title: 'Install',
    desc: 'The terminal helper installs the DMG in your Applications folder.',
  },
]
</script>

<template>
  <section class="how-it-works" id="how-it-works" aria-labelledby="how-title">
    <div class="how-header">
      <p class="eyebrow">How it works</p>
      <h2 id="how-title">Two download options, <span class="text-accent">one release source.</span></h2>
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
        <li>Downloads the latest DMG from GitHub Releases</li>
        <li>Never asks for <code>sudo</code> — installs in <code>~/Applications</code></li>
      </ul>
    </div>
  </section>
</template>
