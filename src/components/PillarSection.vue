<template>
  <TextureSection type="canvas" :opacity="0.2" blend-mode="multiply" color="#4A3728">
    <section class="pillars-wrap" id="fazemos">
    <div class="container">
      <div class="section-label reveal">
        <span class="mono">Eixos de Atuação</span>
        <h2>O Que Fazemos</h2>
      </div>

      <div class="organic-grid">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          class="pillar-card"
          :class="'reveal reveal-delay-' + (index + 1)"
          :style="{ '--radius': pillar.radius }"
          ref="cards"
        >
          <div class="pillar-glow" style="overflow:hidden"></div>
          <div class="pillar-icon-wrap">
            <svg class="pillar-icon" viewBox="0 0 24 24"><path :d="pillar.icon"/></svg>
          </div>
          <h3>{{ pillar.title }}</h3>
          <p class="mono pillar-sub">{{ pillar.subtitle }}</p>
          <p class="pillar-desc">{{ pillar.description }}</p>
        </div>
      </div>

      <FaqAccordion :items="faqItems" title="Dúvidas sobre Nossas Atividades" />
    </div>
  </section>
  </TextureSection>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TextureSection from './textures/TextureSection.vue'
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const cards = ref([])
const faqItems = faq.pillars

const pillars = [
  {
    title: 'Bioconstrução',
    subtitle: 'Técnicas Ancestrais',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    description: 'Técnicas construtivas com materiais naturais e locais — terra, bambu, cipó, madeira e fibras. O projeto realiza cursos, mutirões e formações em pau-a-pique, adobe, superadobe, telhado verde, captação natural de água, biodigestores e acabamentos com argila, sempre com recursos acessíveis e de baixo custo.',
    icon: 'M12,3L2,12H5V20H19V12H22L12,3M12,8.7L16.5,12.7V18H7.5V12.7L12,8.7M12,11.5L9,14.5L10.4,15.9L12,14.3L13.6,15.9L15,14.5L12,11.5Z'
  },
  {
    title: 'Agrofloresta',
    subtitle: 'Agroecologia e Sementes Crioulas',
    radius: '60% 40% 30% 70% / 50% 60% 40% 50%',
    description: 'Sistemas agroflorestais que combinam árvores, arbustos, plantas alimentícias e medicinais inspirado na estrutura da floresta. O projeto desenvolve manejo agroflorestal, produção de mudas, compostagem, cultivo de PANCs, beneficiamento de ervas e preservação de sementes crioulas — variedades tradicionais adaptadas ao bioma local.',
    icon: 'M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M7,8C5.34,8 4,9.34 4,11C4,12.66 5.34,14 7,14C8.66,14 10,12.66 10,11C10,9.34 8.66,8 7,8M12,14C10.34,14 9,15.34 9,17C9,18.66 10.34,20 12,20C13.66,20 15,18.66 15,17C15,15.34 13.66,14 12,14Z'
  },
  {
    title: 'Ancestralidade',
    subtitle: 'Ritos, Saberes e Diversidade',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    description: 'Resgate e prática de saberes tradicionais: cantos e ritos de matrizes indígenas, cerimônias de temazcal nos solstícios e equinócios (inspiradas na tradição lakota), encontros de Santo Daime, rodas de capoeira, teatro, caixeiras e manifestações da cultura afro-brasileira. Além disso, o projeto teve a honra de receber o povo indígena Kanela em 2019, fortalecendo o intercâmbio intercultural e o respeito à diversidade.',
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6L11.45,7.26L10.12,7.45L11.09,8.4L10.86,9.73L12,9.1L13.14,9.73L12.91,8.4L13.88,7.45L12.55,7.26L12,6Z'
  }
]

let pillObserver = null

onMounted(() => {
  pillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.08 })

  cards.value?.forEach(card => pillObserver.observe(card))
})

onUnmounted(() => {
  if (pillObserver) pillObserver.disconnect()
})
</script>

<style scoped>
.pillars-wrap {
  margin-top: 3rem;
}

.organic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.pillar-card {
  background: rgba(255, 251, 242, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 4rem 2.5rem 3.5rem;
  border-radius: var(--radius);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid rgba(74, 55, 40, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: default;
  position: relative;
  transform-style: preserve-3d;
  perspective: 800px;
  overflow: hidden;
}

.pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--ochre-sun), var(--terracotta), var(--ochre-sun));
  background-size: 200% 100%;
  animation: shimmer 4s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.pillar-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 0%, rgba(226, 114, 91, 0.04), transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(188, 108, 37, 0.03), transparent 50%);
  pointer-events: none;
}

.pillar-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(226, 114, 91, 0.08), transparent 60%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.pillar-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(74, 55, 40, 0.12), 0 8px 24px rgba(226, 114, 91, 0.08);
  border-color: rgba(226, 114, 91, 0.18);
  background: rgba(255, 251, 242, 0.97);
}

.pillar-card:hover .pillar-glow {
  opacity: 1;
}

.pillar-icon-wrap {
  width: clamp(72px, 8vw, 88px);
  height: clamp(72px, 8vw, 88px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(226, 114, 91, 0.1), rgba(188, 108, 37, 0.1));
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.pillar-icon-wrap::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(226, 114, 91, 0.15), rgba(188, 108, 37, 0.05));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.pillar-card:hover .pillar-icon-wrap {
  transform: scale(1.12);
  background: linear-gradient(135deg, rgba(226, 114, 91, 0.18), rgba(188, 108, 37, 0.15));
}

.pillar-card:hover .pillar-icon-wrap::after {
  opacity: 1;
}

.pillar-card h3 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.pillar-sub {
  font-size: 0.7rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  background: rgba(74, 55, 40, 0.05);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.pillar-desc {
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  line-height: 1.8;
  color: var(--moss-haze);
  position: relative;
  z-index: 1;
  max-width: clamp(280px, 30vw, 400px);
}

.pillar-icon {
  width: clamp(30px, 3vw, 36px);
  height: clamp(30px, 3vw, 36px);
  fill: var(--terracotta);
  opacity: 0.85;
}

@media (max-width: 900px) {
  .organic-grid { grid-template-columns: 1fr; gap: 2rem; }
  .pillar-card { padding: 3rem 2rem; }
  .pillar-card h3 { font-size: 1.75rem; }
}

@media (max-width: 600px) {
  .pillar-card { padding: 2.5rem 1.5rem; }
  .pillar-card h3 { font-size: 1.5rem; }
}
</style>
