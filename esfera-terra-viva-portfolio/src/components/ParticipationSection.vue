<template>
  <section id="participar">
    <div class="container participation-intro">
      <span class="mono">Envolva-se</span>
      <h2>Como Participar?</h2>
      <p class="participation-sub">O projeto é construído coletivamente e está sempre aberto a novas pessoas. Existem diversas formas de se envolver, do voluntariado às vagas sociais.</p>
    </div>

    <div class="participation-ways">
      <div class="participation-card">
        <div class="pw-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3>Voluntariado</h3>
        <p>Cerca de 50 voluntários já passaram pelo projeto entre 2015 e 2024, com estadias de um fim de semana a três meses. As atividades incluem mutirões agroflorestais, bioconstrução, organização do espaço e rodas de conversa. Alimentação e hospedagem compartilhada são oferecidas.</p>
        <a href="#" class="btn-organic pw-btn">Quero ser Voluntário</a>
      </div>
      <div class="participation-card">
        <div class="pw-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <h3>Vagas Sociais</h3>
        <p>Cursos e vivências pagos disponibilizam vagas sociais para pessoas sem condições de arcar com o valor integral. A contrapartida é o apoio à organização e execução das atividades: preparo de alimentos, limpeza ou manutenção do espaço.</p>
        <a href="#" class="btn-organic pw-btn">Solicitar Vaga Social</a>
      </div>
      <div class="participation-card">
        <div class="pw-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--terracotta)" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h3>Mutirões Abertos</h3>
        <p>Atividades gratuitas realizadas com frequência mínima mensal: mutirões agroflorestais, ações de bioconstrução e rodas de conversa com lanche compartilhado. Também realizamos visitas individuais e coletivas mediante agendamento.</p>
        <a href="#" class="btn-organic pw-btn">Ver Próximo Mutirão</a>
      </div>
    </div>

    <div class="participation-banner">
      <div>
        <h3>Quem pode participar?</h3>
        <p>O projeto acolhe pessoas de todas as origens, crenças, idades e condições socioeconômicas. Jovens, famílias, crianças, idosos, mães solo, pessoas neurodivergentes — todas são bem-vindas. A diversidade é o que fortalece nossa comunidade.</p>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas sobre Participação" />
  </section>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.participate
</script>

<style scoped>
.participation-intro {
  text-align: center;
  padding-bottom: 2rem;
}

.participation-intro h2 {
  font-size: 3rem;
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
  background: var(--white-bleached);
  padding: 2.5rem 2rem;
  border-radius: 24px;
  border: 1px solid rgba(74, 55, 40, 0.05);
  transition: var(--transition-soft);
  display: flex;
  flex-direction: column;
}

.participation-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(74, 55, 40, 0.08);
}

.pw-icon {
  margin-bottom: 1.5rem;
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
  background: var(--terracotta);
  color: white;
  margin: 4rem 8%;
  padding: 4rem;
  border-radius: 30px;
  text-align: center;
}

.participation-banner h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.participation-banner p {
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .participation-ways { grid-template-columns: 1fr; }
  .participation-intro h2 { font-size: 2.25rem; }
  .participation-banner { padding: 2rem; }
}
</style>
