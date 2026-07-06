<template>
  <section class="hero" id="topo">
    <div class="hero-bg" ref="bg">
      <div
        v-for="img in heroImages"
        :key="img"
        class="hero-bg-img img-vintage"
        :style="{ backgroundImage: 'url(' + img + ')' }"
      ></div>
    </div>
    <div class="hero-fog"></div>
    <div class="hero-overlay"></div>
    <div class="hero-inner">
      <div class="hero-content">
        <span class="mono hero-tagline reveal visible">CULTSP Cult Lovers — Ponto de Cultura</span>
        <h1 class="reveal visible">
          Tecendo novos modos de <i>habitar a terra.</i>
        </h1>
        <p class="reveal visible reveal-delay-1">De janeiro de 2014 a julho de 2024, o Ponto de Cultura operou no Círculo Vivencial Terra Viva, em Águas da Prata (SP) — integralmente bioconstruído, sem energia elétrica, com técnicas ancestrais de permacultura. Agora, como Esfera Terra Viva, sistematiza e multiplica saberes em bioconstrução, agroecologia, arte e ancestralidade.</p>

        <div class="hero-highlights">
          <div class="highlight-item reveal visible" v-for="(stat, i) in stats" :key="i" :style="{ transitionDelay: (0.2 + i * 0.12) + 's' }">
            <span class="highlight-num">{{ stat.num }}</span>
            <span class="highlight-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="hero-cta reveal visible reveal-delay-3">
          <a href="#fazemos" class="btn-organic">
            <span>Explorar</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <FaqAccordion :items="faqItems" title="Sobre o Projeto" />
      </div>

      <div class="hero-visual reveal visible">
        <div class="hero-bubble-outer">
          <div class="hero-bubble-soft"></div>
          <div
            v-for="(img, i) in heroImages"
            :key="img"
            class="hero-bubble-slide"
            :class="{ active: activeSlide === i }"
            :style="{ backgroundImage: 'url(' + img + ')' }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'
import { ref, onMounted, onUnmounted } from 'vue'
import { assetPath } from '../utils/paths.js'

const heroImages = [
  assetPath('images/hero-1.webp'),
  assetPath('images/hero-2.webp'),
  assetPath('images/hero-3.webp')
]

const faqItems = faq.hero
const activeSlide = ref(0)
let slideInterval = null

const stats = [
  { num: '10+', label: 'anos de trajetória' },
  { num: '50+', label: 'bioconstruções realizadas' },
  { num: '329', label: 'publicações no Instagram' }
]

const bg = ref(null)
let rafId = null

const advanceSlide = () => {
  if (document.hidden) return
  activeSlide.value = (activeSlide.value + 1) % heroImages.length
}

const handleScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    if (bg.value) {
      const y = window.pageYOffset
      bg.value.style.transform = `translateY(${y * 0.12}px)`
    }
    rafId = null
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  slideInterval = setInterval(advanceSlide, 4000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem 8% 5rem;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to top, var(--sand-paper), transparent);
  z-index: 2;
  pointer-events: none;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  will-change: transform;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply;
}

.hero-bg-img:nth-child(1) { background-position: center 30%; opacity: 0.18; }
.hero-bg-img:nth-child(2) { background-position: center 60%; opacity: 0.1; }
.hero-bg-img:nth-child(3) { background-position: center 20%; opacity: 0.12; }

.hero-fog {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(244, 235, 217, 0.3) 100%),
    radial-gradient(ellipse at 70% 80%, transparent 40%, rgba(244, 235, 217, 0.2) 100%);
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(244,235,217,0.92) 0%, rgba(244,235,217,0.55) 45%, rgba(244,235,217,0.8) 100%);
  z-index: 0;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
}

.hero-content {
  flex: 1;
  min-width: 0;
}

.hero-visual {
  flex: 0 0 auto;
  width: clamp(320px, 38vw, 560px);
  height: clamp(380px, 52vw, 640px);
  margin-top: -3rem;
  position: relative;
}

.hero-bubble-outer {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 54% 46% 62% 38% / 50% 58% 42% 50%;
  overflow: hidden;
  mask-image: radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%);
  animation: bubble-float 8s ease-in-out infinite;
  transition: transform 0.4s ease;
}

.hero-bubble-outer:hover {
  transform: scale(1.03);
}

.hero-bubble-soft {
  position: absolute;
  inset: -8px;
  border-radius: inherit;
  background: var(--sand-paper);
  z-index: 0;
  filter: blur(6px);
  opacity: 0.4;
}

.hero-bubble-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
  z-index: 1;
}

.hero-bubble-slide.active {
  opacity: 1;
}

@keyframes bubble-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(0.8deg); }
  66% { transform: translateY(-5px) rotate(-0.5deg); }
}

.hero-tagline {
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(74, 55, 40, 0.06);
  backdrop-filter: blur(4px);
  border-radius: 100px;
  font-size: 0.65rem;
}

.hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  max-width: 900px;
  margin-bottom: 2rem;
}

.hero h1 i {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: var(--terracotta);
}

.hero p {
  max-width: 520px;
  font-size: 1rem;
  color: var(--moss-haze);
  margin-left: auto;
  text-align: right;
  border-right: 2px solid var(--terracotta);
  padding-right: 2rem;
  line-height: 1.7;
}

.hero-highlights {
  display: flex;
  gap: 3rem;
  margin-top: 3.5rem;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1rem 0;
  border-right: 1px solid rgba(74, 55, 40, 0.08);
}

.highlight-item:last-child {
  border-right: none;
}

.highlight-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--terracotta);
  line-height: 1;
  display: inline-block;
}

.highlight-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--moss-haze);
  margin-top: 0.4rem;
}

.hero-cta {
  margin-top: 2.5rem;
}

@media (max-width: 1100px) {
  .hero-inner { gap: 2rem; }
  .hero-visual {
    width: clamp(260px, 32vw, 400px);
    height: clamp(320px, 44vw, 500px);
    margin-top: -1rem;
  }
}

@media (max-width: 900px) {
  .hero { min-height: auto; padding: 6rem 6% 4rem; }
  .hero-inner { flex-direction: column; gap: 1.5rem; align-items: stretch; }
  .hero h1 { font-size: 2.5rem; }
  .hero p { max-width: 100%; text-align: left; border-right: none; padding-right: 0; margin-left: 0; }
  .hero-highlights { gap: 1rem; flex-wrap: wrap; }
  .highlight-num { font-size: 2rem; }
  .highlight-item { padding: 0.75rem 1rem 0.75rem 0; }
  .hero-visual {
    width: 260px;
    height: 300px;
    margin: 0 auto -1rem;
    order: -1;
  }
}
</style>
