<template>
  <section class="hero" id="download">
    <div class="hero-copy">
      <p class="eyebrow"><i></i> Mac Noodle for macOS</p>
      <h1>Mac Noodle,<br /><span class="text-accent">ready to download.</span></h1>
      <p class="lede">
        Get the latest DMG from GitHub Releases, use the checksum-verifying terminal helper,
        or review the source before downloading.
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
        <li><span></span> SHA-256 verification</li>
        <li><span></span> Source on GitHub</li>
      </ul>
    </div>

    <div class="hero-stage" aria-hidden="true">
      <div class="stage-grid"></div>
      <div class="stage-orbit orbit-one"></div>
      <div class="stage-orbit orbit-two"></div>

      <div class="cleaner-window">
        <div class="window-bar">
          <span class="window-dots"><i></i><i></i><i></i></span>
          <strong>Mac Noodle</strong>
          <span class="window-ready">AVAILABLE</span>
        </div>
        <div class="window-content">
          <span class="window-kicker">LATEST RELEASE</span>
          <h3>Choose how to get<br />Mac Noodle.</h3>
          <div class="scan-total">
            <span>Download package</span>
            <strong>DMG</strong>
          </div>
          <div class="clean-row">
            <span>Release source</span>
            <div class="clean-bar"><i style="width: 86%"></i></div>
            <strong>GitHub</strong>
          </div>
          <div class="clean-row">
            <span>Integrity</span>
            <div class="clean-bar"><i style="width: 64%"></i></div>
            <strong>SHA-256</strong>
          </div>
          <div class="clean-row">
            <span>Alternative</span>
            <div class="clean-bar clean-bar-warn"><i style="width: 48%"></i></div>
            <strong>Shell</strong>
          </div>
          <div class="scan-action">Choose install method <span>→</span></div>
        </div>
      </div>

      <div class="floating-card floating-safe">
        <span>PUBLIC SOURCE</span>
        <strong>Review on GitHub</strong>
        <small>Browse before downloading</small>
      </div>
      <div class="floating-card floating-scan">
        <span>STATIC WEBSITE</span>
        <strong>No release API</strong>
        <small>Direct links for now</small>
      </div>
    </div>
  </section>
</template>
