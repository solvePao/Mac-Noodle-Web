<script setup lang="ts">
import cleanSmarterAsset from '../../assets/29FAE49F-DEF2-4403-9C96-CA1C60329E99.png'

const cleanSmarterImage = cleanSmarterAsset.src
</script>

<template>
  <section class="hero" id="download">
    <div class="hero-copy">
      <p class="eyebrow"><i></i> Mac Noodle for macOS</p>
      <h1>Clean smarter.<br /><span class="text-accent">Keep what matters.</span></h1>
      <p class="lede">
        Find caches, logs, and large files, then review everything before it moves to Trash.
      </p>
      <div class="actions">
        <a
          class="button button-primary"
          href="https://github.com/solvePao/Mac-Noodle-Web/releases/latest/download/Mac-Noodle.dmg"
        >
          Download Latest
          <span aria-hidden="true">→</span>
        </a>
        <a class="button button-outline" href="#how-it-works">Install via Terminal</a>
      </div>
      <ul class="trust-badges">
        <li><span></span> Direct GitHub release</li>
        <li><span></span> Optional shell helper</li>
        <li><span></span> Source on GitHub</li>
      </ul>
    </div>

    <div class="product-hero-art">
      <img
        :src="cleanSmarterImage"
        alt="Mac Noodle app showing a review-before-cleaning screen"
        width="1586"
        height="992"
      />
    </div>
  </section>
</template>

<style scoped>
.product-hero-art {
  align-self: center;
  overflow: hidden;
  border: 1px solid var(--noodle-border);
  border-radius: 28px;
  box-shadow: var(--noodle-shadow);
}

.product-hero-art img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 960px) {
  .product-hero-art { width: min(100%, 760px); margin-inline: auto; }
}
</style>
