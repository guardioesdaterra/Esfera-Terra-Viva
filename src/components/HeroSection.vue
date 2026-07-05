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
    <div class="hero-content">
      <span class="mono hero-tagline reveal visible">Ponto de Cultura Comunitário</span>
      <h1 class="reveal visible">
        Tecendo novos modos de <i>habitar a terra.</i>
      </h1>
      <p class="reveal visible reveal-delay-1">Uma década (2014–2024) no Círculo Vivencial Terra Viva em Águas da Prata (SP) e a transição para o Esfera Terra Viva — sistematizando e multiplicando saberes em bioconstrução, agroecologia, arte e ancestralidade.</p>

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
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'
import { ref, onMounted, onUnmounted } from 'vue'

function assetPath(path) {
  const base = import.meta.env.BASE_URL
  const clean = path.startsWith('/') ? path.slice(1) : path
  return base + clean
}

const heroImages = [
  assetPath('images/hero-1.webp'),
  assetPath('images/hero-2.webp'),
  assetPath('images/hero-3.webp')
]

const faqItems = faq.hero

const stats = [
  { num: '10+', label: 'anos de trajetória' },
  { num: '50+', label: 'voluntários acolhidos' },
  { num: '329', label: 'publicações no Instagram' }
]

const bg = ref(null)
let rafId = null

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

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
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

.hero-content {
  position: relative;
  z-index: 1;
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

@media (max-width: 900px) {
  .hero { min-height: 80vh; padding: 6rem 6% 4rem; }
  .hero h1 { font-size: 2.5rem; }
  .hero p { max-width: 100%; }
  .hero-highlights { gap: 1rem; flex-wrap: wrap; }
  .highlight-num { font-size: 2rem; }
  .highlight-item { padding: 0.75rem 1rem 0.75rem 0; }
}
</style>
