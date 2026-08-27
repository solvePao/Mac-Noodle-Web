import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CommandSection from '../src/components/CommandSection.vue'
import FaqSection from '../src/components/FaqSection.vue'
import Hero from '../src/components/Hero.vue'
import SiteHeader from '../src/components/SiteHeader.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('primary navigation', () => {
  it('exposes and toggles the mobile menu state accessibly', async () => {
    const wrapper = mount(SiteHeader)
    const toggle = wrapper.get('button[aria-controls="primary-navigation"]')
    const navigation = wrapper.get('#primary-navigation')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(navigation.classes()).not.toContain('nav-visible')

    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(navigation.classes()).toContain('nav-visible')
  })

  it('links releases directly while the API-backed feed is absent', () => {
    const wrapper = mount(SiteHeader)
    const releases = wrapper.get('a[href="https://github.com/solvePao/Mac-Noodle-Web/releases"]')

    expect(releases.text()).toBe('Releases')
  })
})

describe('download actions', () => {
  it('uses the static latest ZIP link in the hero', () => {
    const wrapper = mount(Hero)
    const download = wrapper.get(
      'a[href="https://github.com/solvePao/Mac-Noodle-Web/releases/latest/download/Mac-Noodle.zip"]',
    )

    expect(download.text()).toContain('Download Latest')
  })

  it('copies the Cloudflare-hosted installer command and resets its label', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const wrapper = mount(CommandSection)
    const button = wrapper.get('button')

    await button.trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledWith(
      'curl -fsSL https://macnoodle.solvepao.com/install.sh | sh',
    )
    expect(button.text()).toBe('Copied ✓')

    vi.advanceTimersByTime(1800)
    await wrapper.vm.$nextTick()
    expect(button.text()).toBe('Copy')
  })
})

describe('FAQ', () => {
  it('opens one answer and exposes the relationship to assistive technology', async () => {
    const wrapper = mount(FaqSection)
    const buttons = wrapper.findAll('.faq-btn')
    const first = buttons[0]

    expect(first.attributes('aria-expanded')).toBe('false')
    expect(first.attributes('aria-controls')).toBe('faq-answer-0')

    await first.trigger('click')

    expect(first.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('#faq-answer-0').isVisible()).toBe(true)
  })
})
