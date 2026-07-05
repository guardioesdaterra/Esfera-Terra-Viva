<template>
  <section class="container economia-section" id="territorios">
    <span class="mono">Cultura e Comunidade</span>
    <h2>Economia Solidária & Criativa</h2>
    <p class="economia-intro">Nossa produção valoriza o trabalho manual, a troca justa e a relação direta entre quem cultiva, quem cria e quem consome. Conheça nossas principais frentes.</p>

    <div class="economia-grid">
      <div class="economia-card">
        <div class="economia-icon">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>Bioconstrução Comercial</h3>
        <p>Entre 2014 e 2015, em parceria com a Fazenda São Miguel Arcanjo, executamos a bioconstrução de um interposto urbano para venda de produtos orgânicos e artesanato, contribuindo para o enriquecimento cultural de Águas da Prata (SP).</p>
      </div>
      <div class="economia-card">
        <div class="economia-icon">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>CSA — Comunidade que Sustenta a Agricultura</h3>
        <p>Em 2018, firmamos parceria com um coletivo de Poços de Caldas (MG) fornecendo 15 cestas de produtos orgânicos por semana. Além dos alimentos, realizamos atividades de visitação, plantio e colheita junto ao grupo participante.</p>
      </div>
      <div class="economia-card">
        <div class="economia-icon">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>Feiras e Artesanato</h3>
        <p>Participação em feiras de artesanato e economia criativa na região, com produção incluindo cestaria em cipó, instrumentos musicais tradicionais, esculturas, mudas de plantas, alimentos naturais e utensílios de cerâmica.</p>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas sobre Economia Solidária" />
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.economia
</script>

<style scoped>
.economia-section {
  text-align: center;
}

.economia-section h2 {
  font-size: 3rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.economia-intro {
  max-width: 700px;
  margin: 0 auto 4rem;
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
  background: var(--white-bleached);
  padding: 2.5rem 2rem;
  border-radius: 24px;
  text-align: left;
  border: 1px solid rgba(74, 55, 40, 0.05);
  transition: var(--transition-soft);
}

.economia-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(74, 55, 40, 0.08);
}

.economia-icon {
  margin-bottom: 1.5rem;
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

@media (max-width: 900px) {
  .economia-grid { grid-template-columns: 1fr; }
  .economia-section h2 { font-size: 2.25rem; }
}
</style>
