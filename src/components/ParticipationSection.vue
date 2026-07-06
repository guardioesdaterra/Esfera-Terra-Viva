<template>
  <section id="participar">
    <div class="container participation-intro">
      <div class="reveal">
        <span class="mono">Envolva-se</span>
        <h2>Como Participar?</h2>
        <p class="participation-sub">O projeto é construído coletivamente e acolhe pessoas de todas as origens, crenças, idades e condições socioeconômicas. Existem diversas formas de se envolver, do voluntariado às vagas sociais.</p>
      </div>
    </div>

    <div class="participation-ways">
      <div class="participation-card reveal reveal-delay-1" v-for="(item, i) in participationItems" :key="i">
        <div class="pw-icon" v-html="item.icon"></div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <a href="#" class="btn-organic pw-btn">
          <span>{{ item.cta }}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>

    <div class="participation-banner reveal">
      <div class="banner-glow"></div>
      <div class="banner-noise"></div>
      <h3>Quem pode participar?</h3>
      <p>O projeto acolhe pessoas de todas as origens, crenças, idades e condições socioeconômicas — jovens, famílias, crianças, idosos, mães solo, pessoas neurodivergentes, pessoas de diferentes tradições e nacionalidades, sem qualquer forma de discriminação. A diversidade é o que fortalece nossa comunidade.</p>
    </div>

    <div class="container">
      <FaqAccordion :items="faqItems" title="Dúvidas sobre Participação" />
    </div>
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.participate

const participationItems = [
  {
    title: 'Voluntariado',
    description: 'Cerca de 50 voluntários já passaram pelo projeto entre 2015 e 2024, com estadias de um fim de semana a três meses. As atividades incluem mutirões agroflorestais, bioconstrução, organização do espaço e rodas de conversa. Alimentação e hospedagem compartilhada são oferecidas.',
    cta: 'Quero ser Voluntário',
    icon: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    title: 'Vagas Sociais',
    description: 'Cursos e vivências pagos disponibilizam vagas sociais para pessoas sem condições de arcar com o valor integral. A contrapartida é o apoio à organização e execução das atividades: preparo de alimentos, limpeza ou manutenção do espaço.',
    cta: 'Solicitar Vaga Social',
    icon: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
  },
  {
    title: 'Mutirões e Atividades Abertas',
    description: 'Atividades gratuitas realizadas com frequência mínima mensal: mutirões agroflorestais, ações de bioconstrução, rodas de música e conversa com lanche compartilhado. O espaço também permanece disponível para visitas individuais e coletivas mediante agendamento, recebendo escolas e projetos da região.',
    cta: 'Ver Próximo Mutirão',
    icon: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  }
]
</script>

<style scoped>
.participation-intro {
  text-align: center;
  padding-bottom: 2rem;
}

.participation-intro h2 {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.participation-sub {
  max-width: 600px;
  margin: 0 auto;
  color: var(--moss-haze);
}

.participation-ways {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 8%;
}

.participation-card {
  background: rgba(255, 251, 242, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(74, 55, 40, 0.05);
  transition: var(--transition-soft);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.participation-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--ochre-sun), var(--terracotta));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.participation-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  background: rgba(255, 251, 242, 0.95);
}

.participation-card:hover::after {
  transform: scaleX(1);
}

.pw-icon {
  margin-bottom: 1.5rem;
  transition: var(--transition-soft);
}

.participation-card:hover .pw-icon {
  transform: scale(1.1) rotate(-5deg);
}

.participation-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.participation-card p {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--moss-haze);
  flex: 1;
  margin-bottom: 1.5rem;
}

.pw-btn {
  align-self: flex-start;
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;
}

.participation-banner {
  position: relative;
  background: var(--terracotta);
  color: white;
  margin: 4rem 8%;
  padding: 4rem;
  border-radius: var(--radius-lg);
  text-align: center;
  overflow: hidden;
}

.banner-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12), transparent 60%);
  animation: pulse-soft 4s ease-in-out infinite;
  pointer-events: none;
}

.banner-noise {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 64px 64px;
  opacity: 0.15;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.participation-banner h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  position: relative;
}

.participation-banner p {
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
  opacity: 0.9;
  position: relative;
}

@media (max-width: 900px) {
  .participation-ways { grid-template-columns: 1fr; padding: 0 6%; }
  .participation-banner { padding: 2.5rem 1.5rem; margin: 3rem 6%; }
}
</style>
