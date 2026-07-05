<template>
  <section class="timeline-section" id="sobre">
    <h2>Nossa Trajetória</h2>
    <p class="timeline-intro">De 2014 a 2024, o projeto construiu uma história de aprendizado coletivo, parcerias e transformação. Conheça os marcos dessa caminhada.</p>

    <div class="timeline-flex">
      <div class="timeline-item">
        <span class="timeline-year">2014 — 2016</span>
        <h3>Fundação e Primeiras Ações</h3>
        <p>Janeiro de 2014: início do Círculo Vivencial Terra Viva na Fazenda São Miguel Arcanjo, zona rural de Águas da Prata (SP). Bioconstrução integral do espaço e do interposto urbano para venda de orgânicos e artesanato. Em 2016, coordenação do projeto de bioconstrução de uma casa de brincar em escola pública de Poços de Caldas (MG).</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2015 — 2019</span>
        <h3>Visibilidade e Intercâmbios</h3>
        <p>Participação no programa Terra da Gente (2015). Parceria CSA com coletivo de Poços de Caldas (2018), fornecendo 15 cestas orgânicas semanais. Matéria na Revista Atua (2019). Visita do povo indígena Kanela (2019) com rodas de conversa e feira de artesanato. Participação na Semana pelo Clima (2019) com o coletivo Guardiões da Terra.</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2020 — 2024</span>
        <h3>Formação e Expansão</h3>
        <p>Ações formativas com abordagens humanistas e integrativas. Programa Jardim Brincante (2020) com atividades infantis semanais, desdobrando-se em acampamentos com famílias. Imersão online com Susana Verri (ALC Nature). Coordenação da bioconstrução de uma casa em Ipuiúna (MG, 2022) com o coletivo Montanha que Chora.</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2024 — PRESENTE</span>
        <h3>Esfera Terra Viva</h3>
        <p>Julho de 2024: encerramento do arrendamento e transição para o Esfera Terra Viva. Atuação no Oeste da Bahia (Estação Flor do Alto) apoiando uma comunidade intencional. Nova base em São João da Boa Vista (SP), já recebendo mutirões e atividades integrativas. Sistematização e multiplicação dos saberes acumulados.</p>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas sobre Nossa História" />
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.timeline
</script>

<style scoped>
.timeline-section {
  background: var(--clay-deep);
  color: var(--white-bleached);
  padding: 8rem 8%;
  margin-top: 4rem;
  border-radius: 120px 120px 0 0;
}

.timeline-section h2 {
  color: var(--sand-paper);
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.timeline-intro {
  font-size: 1rem;
  color: rgba(244, 235, 217, 0.7);
  max-width: 600px;
  margin-bottom: 4rem;
  line-height: 1.7;
}

.timeline-flex {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  position: relative;
}

.timeline-item {
  position: relative;
  padding: 2rem 0 0 2rem;
  border-left: 1px solid rgba(244, 235, 217, 0.15);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 2rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ochre-sun);
}

.timeline-year {
  font-family: 'JetBrains Mono', monospace;
  color: var(--ochre-sun);
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
}

.timeline-item h3 {
  color: var(--sand-paper);
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}

.timeline-item p {
  font-size: 0.85rem;
  line-height: 1.7;
  opacity: 0.8;
}

@media (max-width: 900px) {
  .timeline-flex { grid-template-columns: 1fr; gap: 2rem; }
  .timeline-section h2 { font-size: 2.25rem; }
}
</style>
