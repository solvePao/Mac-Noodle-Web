<script setup lang="ts">
const testimonials = [
  {
    initials: 'AW',
    color: '#6366f1',
    name: 'Andrew W.',
    quote: "Just tried the app, and it's working really well. The design looks very elegant and runs smoothly!",
    title: 'Smooth performance!',
  },
  {
    initials: 'MP',
    color: '#8b5cf6',
    name: 'Madeleine P.',
    quote: "Really impressed with the interface and how quickly it found junk files I didn't even know existed.",
    title: 'The interface is fantastic.',
  },
  {
    initials: 'DK',
    color: '#06b6d4',
    name: 'Daniel K.',
    quote: "Love the comprehensive cleaning tools, especially for finding leftover app files. The fact that it's open source is a huge plus.",
    title: 'Deep cleaning tools!',
  },
]
</script>

<template>
  <section class="testimonials" aria-label="User reviews">
    <div class="testimonials-header">
      <p class="eyebrow">What users say</p>
      <h2>Mac users <span class="text-accent">love it.</span></h2>
    </div>
    <div class="testimonials-grid">
      <article class="testimonial-card" v-for="t in testimonials" :key="t.name">
        <p class="testimonial-title">{{ t.title }}</p>
        <p class="testimonial-quote">"{{ t.quote }}"</p>
        <div class="testimonial-author">
          <span class="avatar" :style="{ background: t.color }">{{ t.initials }}</span>
          <span class="author-name">{{ t.name }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
