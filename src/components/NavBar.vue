<template>
  <nav :class="{ compact: compact, open: isOpen }">
    <TextureOverlay type="paper" :opacity="0.5" blend-mode="multiply" position="absolute" :z-index="-1" />
    <a href="#" class="logo">
      <img class="logo-mark" :src="assetPath('Three-Dots.webp')" alt="Esfera Terra Viva" width="36" height="36" />
      <span class="logo-text">Esfera Terra Viva</span>
    </a>

    <div class="nav-links" :class="{ open: isOpen }">
      <a href="#sobre" @click="closeMenu">SOBRE</a>
      <a href="#fazemos" @click="closeMenu">O QUE FAZEMOS</a>
      <a href="#territorios" @click="closeMenu">TERRITÓRIOS</a>
      <a href="#participar" @click="closeMenu">PARTICIPAR</a>
      <a href="#contato" @click="closeMenu">CONTATO</a>
    </div>

    <div class="nav-right">
      <span class="mono tagline">CULTSP · 2024</span>
      <button class="hamburger" :class="{ active: isOpen }" @click="toggleMenu" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="nav-backdrop" :class="{ open: isOpen }" @click="closeMenu"></div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import TextureOverlay from './textures/TextureOverlay.vue'
import { assetPath } from '../utils/paths.js'

const props = defineProps({
  compact: { type: Boolean, default: false }
})

const isOpen = ref(false)

const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu = () => { isOpen.value = false }
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-soft);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: linear-gradient(to bottom, rgba(244, 235, 217, 0.7) 40%, transparent);
}

nav.compact {
  padding: 0.8rem 8%;
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  background: rgba(244, 235, 217, 0.88);
  box-shadow: 0 1px 0 rgba(74, 55, 40, 0.06);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--clay-deep);
}

.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  transition: var(--transition-soft);
  display: block;
}

.compact .logo-mark {
  width: 30px;
  height: 30px;
  border-radius: 6px;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  transition: var(--transition-soft);
}

.compact .logo-text {
  font-size: 1.15rem;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 600;
  transition: var(--transition-fast);
  opacity: 0.7;
  position: relative;
  padding: 0.25rem 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--ochre-sun);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  opacity: 1;
  color: var(--clay-deep);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.tagline {
  font-size: 0.6rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--clay-deep);
  border-radius: 2px;
  transition: var(--transition-fast);
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav-backdrop {
  display: none;
}

@media (max-width: 900px) {
  .tagline { display: none; }

  .hamburger { display: flex; }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(320px, 80vw);
    flex-direction: column;
    justify-content: center;
    gap: 0;
    background: rgba(255, 251, 242, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 999;
    box-shadow: -10px 0 40px rgba(0,0,0,0.1);
  }

  .nav-links.open {
    transform: translateX(0);
  }

  .nav-links a {
    font-size: 1.2rem;
    padding: 1rem 0;
    opacity: 1;
    border-bottom: 1px solid rgba(74, 55, 40, 0.06);
  }

  .nav-links a::after { display: none; }

  .nav-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(74, 55, 40, 0.35);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .nav-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
