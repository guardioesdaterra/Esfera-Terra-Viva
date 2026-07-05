<template>
  <div class="app">
    <div class="grain-overlay"></div>
    <div class="paper-texture"></div>
    <div class="vintage-overlay"></div>
    <div class="diffusion-blob" ref="blob"></div>
    <div class="scroll-progress" ref="progress"></div>

    <NavBar />
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
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import PillarSection from './components/PillarSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import EconomiaSection from './components/EconomiaSection.vue'
import InstagramFeed from './components/InstagramFeed.vue'
import ParticipationSection from './components/ParticipationSection.vue'
import FooterSection from './components/FooterSection.vue'

const blob = ref(null)
const progress = ref(null)
let rafId = null

const handleScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    const scrolled = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progressPct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0

    if (progress.value) {
      progress.value.style.transform = `scaleX(${progressPct / 100})`
    }

    if (blob.value) {
      const moveX = scrolled * 0.025
      const moveY = scrolled * 0.06
      blob.value.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    rafId = null
  })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
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
