<template>
  <TextureSection type="grid-dot" :opacity="0.08" blend-mode="multiply" color="#BC6C25" :grid="20" :radius="1.5">
    <section class="container economia-section" id="territorios">
    <div class="reveal">
      <span class="mono">Economia Solidária & Criativa</span>
      <h2>Economia Solidária & Criativa</h2>
      <p class="economia-intro">Nossa produção valoriza o trabalho manual, a troca justa e a relação direta entre quem cultiva, quem cria e quem consome. A bioconstrução comunitária e cultural é intercalada com venda de produtos orgânicos e artesanatos tradicionais, fortalecendo a economia solidária e criativa.</p>
    </div>

    <div class="economia-grid">
      <div class="economia-card reveal reveal-delay-1" v-for="(item, i) in economiaItems" :key="i">
        <div class="economia-icon">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <div class="economia-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas sobre Economia Solidária" />
  </section>
  </TextureSection>
</template>

<script setup>
import TextureSection from './textures/TextureSection.vue'
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.economia

const economiaItems = [
  {
    title: 'Bioconstrução Comunitária e Cultural',
    description: 'Entre 2014 e 2015, em parceria com a Fazenda São Miguel Arcanjo, executamos a bioconstrução de um interposto urbano para venda de produtos orgânicos e artesanato, contribuindo para o enriquecimento cultural de Águas da Prata (SP). A bioconstrução comunitária e cultural é intercalada com venda de produtos orgânicos e artesanatos tradicionais.'
  },
  {
    title: 'CSA — Comunidade que Sustenta a Agricultura',
    description: 'Em 2018, firmamos parceria com um coletivo da região por meio do programa CSA, fornecendo semanalmente 15 cestas de produtos orgânicos, além de atividades de visitação, plantio e colheita junto ao grupo participante. Participação em feiras de artesanato com cestaria em cipó, instrumentos musicais tradicionais, escultura, mudas de plantas e hortaliças.'
  },
  {
    title: 'Feiras e Economia Criativa',
    description: 'Participação em dezenas de feiras de artesanato e economia criativa em municípios da região, com produção incluindo cestaria em cipó, instrumentos musicais tradicionais, esculturas, mudas de plantas, hortaliças, alimentos naturais e utensílios de cerâmica. Ações que fortalecem a economia solidária e a divulgação das atividades culturais.'
  }
]
</script>

<style scoped>
.economia-section {
  text-align: center;
  position: relative;
}

.economia-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(74, 55, 40, 0.06), transparent);
}

.economia-section h2 {
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
}

.economia-intro {
  max-width: 700px;
  margin: 0 auto 3.5rem;
  color: var(--moss-haze);
  line-height: 1.7;
}

.economia-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.economia-card {
  background: rgba(255, 251, 242, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-md);
  text-align: left;
  border: 1px solid rgba(74, 55, 40, 0.05);
  transition: var(--transition-soft);
  position: relative;
  overflow: hidden;
}

.economia-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--ochre-sun), var(--terracotta));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.economia-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  background: rgba(255, 251, 242, 0.95);
}

.economia-card:hover::before {
  transform: scaleX(1);
}

.economia-icon {
  margin-bottom: 1.5rem;
  transition: var(--transition-soft);
}

.economia-card:hover .economia-icon {
  transform: scale(1.1);
}

.economia-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.economia-card p {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--moss-haze);
}

.economia-arrow {
  margin-top: 1.5rem;
  color: var(--moss-haze);
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition-fast);
}

.economia-card:hover .economia-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--terracotta);
}

@media (max-width: 900px) {
  .economia-grid { grid-template-columns: 1fr; }
}
</style>
