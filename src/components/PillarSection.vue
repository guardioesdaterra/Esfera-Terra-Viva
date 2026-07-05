<template>
  <section class="pillars-wrap" id="fazemos">
    <div class="container">
      <div class="section-label">
        <span class="mono">Eixos de Atuação</span>
        <h2>O Que Fazemos</h2>
      </div>

      <div class="organic-grid">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          class="pillar-card"
          :style="{ borderRadius: pillar.radius }"
          ref="cards"
        >
          <svg class="pillar-icon" viewBox="0 0 24 24"><path :d="pillar.icon"/></svg>
          <h3>{{ pillar.title }}</h3>
          <p class="mono pillar-sub">{{ pillar.subtitle }}</p>
          <p class="pillar-desc">{{ pillar.description }}</p>
        </div>
      </div>

      <FaqAccordion :items="faqItems" title="Dúvidas sobre Nossas Atividades" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const cards = ref([])
const faqItems = faq.pillars

const pillars = [
  {
    title: 'Bioconstrução',
    subtitle: 'Manejo Ecológico',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    description: 'Técnicas construtivas com materiais naturais e locais — terra, bambu, cipó, madeira e fibras. O projeto realizou cursos, mutirões e formações em pau-a-pique, adobe, superadobe, telhado verde e acabamentos com argila, sempre com recursos acessíveis e de baixo custo.',
    icon: 'M12,3L2,12H5V20H19V12H22L12,3M12,8.7L16.5,12.7V18H7.5V12.7L12,8.7M12,11.5L9,14.5L10.4,15.9L12,14.3L13.6,15.9L15,14.5L12,11.5Z'
  },
  {
    title: 'Agrofloresta',
    subtitle: 'Sementes Crioulas',
    radius: '60% 40% 30% 70% / 50% 60% 40% 50%',
    description: 'Sistemas agroflorestais que combinam árvores, arbustos, plantas alimentícias e medicinais imitando a estrutura da floresta. O projeto desenvolveu produção de mudas, compostagem, cultivo de PANCs e preservação de sementes crioulas — variedades tradicionais adaptadas ao bioma local.',
    icon: 'M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M7,8C5.34,8 4,9.34 4,11C4,12.66 5.34,14 7,14C8.66,14 10,12.66 10,11C10,9.34 8.66,8 7,8M12,14C10.34,14 9,15.34 9,17C9,18.66 10.34,20 12,20C13.66,20 15,18.66 15,17C15,15.34 13.66,14 12,14Z'
  },
  {
    title: 'Ancestralidade',
    subtitle: 'Ritos e Saberes',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    description: 'Resgate e prática de saberes tradicionais: cantos e ritos de matrizes indígenas, cerimônias de temazcal nos solstícios e equinócios (inspiradas na tradição lakota), encontros de Santo Daime, rodas de capoeira e manifestações da cultura afro-brasileira. O projeto recebeu o povo Kanela em 2019, fortalecendo o intercâmbio intercultural.',
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6L11.45,7.26L10.12,7.45L11.09,8.4L10.86,9.73L12,9.1L13.14,9.73L12.91,8.4L13.88,7.45L12.55,7.26L12,6Z'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0) rotate(0)'
      }
    })
  }, { threshold: 0.1 })

  cards.value.forEach(card => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(40px) rotate(-2deg)'
    card.style.transition = 'var(--transition-soft)'
    observer.observe(card)
  })
})
</script>

<style scoped>
.pillars-wrap {
  margin-top: 2rem;
}

.section-label {
  margin-bottom: 4rem;
}

.section-label h2 {
  font-size: 3rem;
  margin-top: 0.5rem;
}

.organic-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.pillar-card {
  grid-column: span 4;
  background: var(--white-bleached);
  padding: 3rem 2rem;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  transition: var(--transition-soft);
  border: 1px solid rgba(74, 55, 40, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: default;
}

.pillar-card:hover {
  transform: translateY(-10px) rotate(2deg);
  background: var(--sand-paper);
  box-shadow: 0 30px 60px rgba(74, 55, 40, 0.08);
}

.pillar-card h3 {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.75rem;
}

.pillar-sub {
  font-size: 0.65rem;
  margin-bottom: 1.25rem;
  display: block;
}

.pillar-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--moss-haze);
}

.pillar-icon {
  width: 60px;
  height: 60px;
  fill: var(--terracotta);
  opacity: 0.8;
}

@media (max-width: 900px) {
  .pillar-card { grid-column: span 6; }
  .section-label h2 { font-size: 2.25rem; }
}

@media (max-width: 600px) {
  .pillar-card { grid-column: span 12; }
}
</style>
