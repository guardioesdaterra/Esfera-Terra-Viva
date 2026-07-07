<template>
  <TextureSection type="grid-fine" :opacity="0.25" blend-mode="soft-light" color="#F4EBD9">
    <section class="timeline-section" id="sobre" ref="sectionRef">
    <div class="timeline-inner">
      <div class="timeline-header reveal">
        <h2>Nossa Trajetória</h2>
        <p class="timeline-intro">De janeiro de 2014 a julho de 2024, o Ponto de Cultura consolidou-se como espaço de referência na difusão de técnicas ancestrais e tradicionais. Conheça os marcos dessa caminhada de aprendizado coletivo, parcerias e transformação.</p>
      </div>

      <div class="timeline-track" ref="trackRef">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <span class="timeline-year">{{ item.year }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>

      <FaqAccordion :items="faqItems" title="Dúvidas sobre Nossa História" />
    </div>

    <div class="timeline-trail-wrapper" ref="trailWrapperRef">
      <ImageTrail
        :items="trailImages"
        :variant="1"
      />
    </div>
  </section>
  </TextureSection>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TextureSection from './textures/TextureSection.vue'
import FaqAccordion from './FaqAccordion.vue'
import ImageTrail from './ImageTrail.vue'
import { assetPath } from '../utils/paths.js'
import { faq } from '../data/faqData.js'

const faqItems = faq.timeline
const trackRef = ref(null)
const sectionRef = ref(null)
const trailWrapperRef = ref(null)

const trailImages = [
  assetPath('images/posts/[C6II2Obo8p9]_2024-04-23_23-19-48.webp'),
  assetPath('images/posts/[C6TY7H-rTG0]_2024-04-28_08-22-04.webp'),
  assetPath('images/posts/[C7eGqHcAW0u]_2024-05-27_08-41-37.webp'),
  assetPath('images/posts/[C8hHH3GAAtY]_2024-06-22_09-11-23.webp'),
  assetPath('images/posts/[C8hklhOsTdN]_2024-06-22_13-25-44.webp'),
  assetPath('images/posts/[C8KnwzjJxEK]_2024-06-13_15-29-31.webp'),
  assetPath('images/posts/[C8kAFR-gTFn]_2024-06-23_12-02-48.webp'),
  assetPath('images/posts/[C8araXJJLvr]_2024-06-19_21-12-51.webp')
]
let timeObserver = null
let mouseForwarder = null

const timelineItems = [
  {
    year: '2014 — 2016',
    title: 'Fundação e Primeiras Ações',
    description: 'Janeiro de 2014: início do Círculo Vivencial Terra Viva na Fazenda São Miguel Arcanjo, zona rural de Águas da Prata (SP). O espaço foi integralmente bioconstruído com técnicas de taipa, bambu, adobe, captação natural de água e biodigestores, sem utilização de energia elétrica. Estruturas coletivas como cozinhas, ateliês, banheiros e hortas. Em 2016, coordenação de projeto de bioconstrução de casa de brincar em escola pública de Poços de Caldas (MG).'
  },
  {
    year: '2015 — 2019',
    title: 'Visibilidade e Intercâmbios',
    description: 'Participação no programa Terra da Gente (2015) e G1 Globo. Matéria na Revista Atua (2019). Visita do povo indígena Kanela (2019) com rodas de conversa e feira de artesanato, fortalecendo o intercâmbio intercultural. Participação na Semana pelo Clima (2019) com o Ponto de Cultura Guardiões da Terra. Parceria CSA com coletivo de Poços de Caldas (2018), fornecendo 15 cestas orgânicas semanais.'
  },
  {
    year: '2020 — 2024',
    title: 'Formação e Expansão',
    description: 'Ações formativas com abordagens humanistas e integrativas. Programa Jardim Brincante (2020) com atividades infantis semanais, desdobrando-se em acampamentos com famílias. Imersão online com Susana Verri (ALC Nature). Coordenação da bioconstrução de casa em Ipuiúna (MG, 2022) com o coletivo Montanha que Chora. Ações socioeducativas em escolas públicas da região.'
  },
  {
    year: '2024 — PRESENTE',
    title: 'Esfera Terra Viva',
    description: 'Julho de 2024: encerramento do vínculo e transição para o Ponto de Cultura Esfera Terra Viva. Atuação no Oeste da Bahia (Estação Flor do Alto) apoiando comunidade intencional e compartilhando metodologias e tecnologias sociais. Nova base em São João da Boa Vista (SP), recebendo mutirões e atividades integrativas. Sistematização e multiplicação dos saberes acumulados.'
  }
]

onMounted(() => {
  const header = trackRef.value?.closest('.timeline-inner')?.querySelector('.reveal')
  const items = trackRef.value?.querySelectorAll('.timeline-item')
  if (!items?.length) return

  timeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.15 })

  if (header) timeObserver.observe(header)
  items.forEach(item => timeObserver.observe(item))

  const section = sectionRef.value
  const wrapper = trailWrapperRef.value
  if (!section || !wrapper) return

  mouseForwarder = (e) => {
    const root = wrapper.querySelector('.itrail-root')
    if (root) {
      root.dispatchEvent(new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY
      }))
    }
  }

  section.addEventListener('mousemove', mouseForwarder)
})

onUnmounted(() => {
  if (timeObserver) timeObserver.disconnect()
  const section = sectionRef.value
  if (section && mouseForwarder) {
    section.removeEventListener('mousemove', mouseForwarder)
  }
})
</script>

<style scoped>
.timeline-section {
  background: var(--clay-deep);
  color: var(--white-bleached);
  padding: 6rem 8%;
  margin-top: 4rem;
  border-radius: 120px 120px 0 0;
  position: relative;
}

.timeline-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(226, 114, 91, 0.04), transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(188, 108, 37, 0.03), transparent 50%);
  pointer-events: none;
}

.timeline-section::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, transparent, var(--clay-deep));
  z-index: 1;
  pointer-events: none;
}

.timeline-inner {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.timeline-trail-wrapper {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.timeline-section h2 {
  color: var(--sand-paper);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
}

.timeline-intro {
  font-size: 1rem;
  color: rgba(244, 235, 217, 0.7);
  max-width: 600px;
  margin-bottom: 4rem;
  line-height: 1.7;
}

.timeline-track {
  position: relative;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--ochre-sun), var(--terracotta));
}

.timeline-item {
  position: relative;
  padding: 0 0 3rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item:nth-child(2) { transition-delay: 0.12s; }
.timeline-item:nth-child(3) { transition-delay: 0.24s; }
.timeline-item:nth-child(4) { transition-delay: 0.36s; }
.timeline-item:nth-child(5) { transition-delay: 0.48s; }

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.65rem;
  top: 0.6rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--ochre-sun);
  border: 3px solid var(--clay-deep);
  box-shadow: 0 0 0 2px var(--ochre-sun);
  transition: var(--transition-soft);
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 4px var(--ochre-sun), 0 0 20px rgba(226, 114, 91, 0.4);
}

.timeline-year {
  font-family: 'JetBrains Mono', monospace;
  color: var(--ochre-sun);
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(226, 114, 91, 0.3);
  border-radius: 4px;
  backdrop-filter: blur(2px);
}

.timeline-item h3 {
  color: var(--sand-paper);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.timeline-item p {
  font-size: 0.85rem;
  line-height: 1.7;
  opacity: 0.8;
}

@media (max-width: 900px) {
  .timeline-section { padding: 4rem 6%; border-radius: 60px 60px 0 0; }
}
</style>
