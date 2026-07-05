<template>
  <div class="app">
    <div class="grain-overlay"></div>
    <div class="diffusion-blob" ref="blob"></div>

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

const handleScroll = () => {
  if (blob.value) {
    const scrolled = window.pageYOffset
    blob.value.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.1}px)`
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
@import './assets/main.css';
</style>
