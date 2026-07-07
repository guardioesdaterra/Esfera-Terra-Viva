<template>
  <div class="app">
    <TextureOverlay type="noise" :opacity="0.15" :zIndex="9999" />
    <TextureOverlay type="paper" :opacity="0.6" blend-mode="multiply" :zIndex="9998" />
    <TextureOverlay type="vintage" :opacity="1" :zIndex="9997" />
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

    <div class="fab-group">
      <a href="https://www.instagram.com/esferaterraviva" target="_blank" class="fab fab-instagram" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
      </a>
      <a href="https://wa.me/5519997628333" target="_blank" class="fab fab-whatsapp" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </a>
    </div>
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

.fab-group {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.fab {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  will-change: transform;
}

.fab:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 24px rgba(0,0,0,0.2);
}

.fab-instagram {
  background: linear-gradient(135deg, #833ab4, #fd1d1d, #f77737);
  color: white;
}

.fab-whatsapp {
  background: #25D366;
  color: white;
}

@media (max-width: 600px) {
  .fab-group { bottom: 16px; right: 16px; gap: 10px; }
  .fab { width: 46px; height: 46px; }
}
</style>
