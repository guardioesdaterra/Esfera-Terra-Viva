<template>
  <div class="app">
    <TextureOverlay type="noise" :opacity="0.05" :zIndex="9999" />
    <TextureOverlay type="paper" :opacity="0.3" blend-mode="multiply" :zIndex="9998" />
    <TextureOverlay type="vintage" :opacity="1" :zIndex="9997" />
    <TextureOverlay type="dust" :opacity="0.025" :zIndex="9996" />
    <TextureOverlay type="crosshatch" :opacity="0.05" blend-mode="multiply" :zIndex="9995" color="#4A3728" :stroke="0.5" />
    <div class="diffusion-blob" ref="blob"></div>
    <div class="scroll-progress" ref="progress"></div>

    <NavBar :compact="isCompact" />
    <HeroSection />
    <PillarSection />
    <TimelineSection />
    <EconomiaSection />
    <InstagramFeed />
    <ParticipationSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TextureOverlay from './components/textures/TextureOverlay.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import PillarSection from './components/PillarSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import EconomiaSection from './components/EconomiaSection.vue'
import InstagramFeed from './components/InstagramFeed.vue'
import ParticipationSection from './components/ParticipationSection.vue'
import FooterSection from './components/FooterSection.vue'

const isCompact = ref(false)
const blob = ref(null)
const progress = ref(null)
let rafId = null
let revealObserver = null

const handleScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    const y = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    isCompact.value = y > 80

    if (progress.value) {
      const pct = docHeight > 0 ? (y / docHeight) * 100 : 0
      progress.value.style.transform = `scaleX(${pct / 100})`
    }

    if (blob.value) {
      blob.value.style.transform = `translate(${y * 0.025}px, ${y * 0.06}px)`
    }

    rafId = null
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08 })

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
  if (revealObserver) revealObserver.disconnect()
})
</script>

<style>
@import './assets/main.css';

.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--ochre-sun), var(--terracotta));
  transform-origin: left;
  transform: scaleX(0);
  z-index: 10000;
  pointer-events: none;
  will-change: transform;
}
</style>
