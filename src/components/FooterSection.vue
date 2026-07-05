<template>
  <footer id="contato">
    <div class="footer-main">
      <div class="footer-brand">
        <h2>Esfera Terra Viva</h2>
        <p class="mono">São João da Boa Vista, SP</p>
        <p class="footer-tagline">Ponto de Cultura Comunitário — Cultura Viva</p>
        <div class="footer-contact">
          <p><strong>E-mail:</strong> contato@esferaterraviva.org</p>
          <p><strong>Instagram:</strong> @esferaterraviva</p>
        </div>
      </div>
      <div class="footer-links">
        <h4>Navegue</h4>
        <a href="#topo">Início</a>
        <a href="#fazemos">O Que Fazemos</a>
        <a href="#sobre">Nossa Trajetória</a>
        <a href="#territorios">Economia Solidária</a>
        <a href="#participar">Participar</a>
      </div>
      <div class="footer-links">
        <h4>Redes e Contato</h4>
        <a href="https://www.instagram.com/esferaterraviva" target="_blank">Instagram</a>
        <a href="#">WhatsApp</a>
        <a href="#">E-mail</a>
      </div>
      <div class="footer-links">
        <h4>Parceiros</h4>
        <a href="#">Guardiões da Terra</a>
        <a href="#">Montanha que Chora</a>
        <a href="#">Estação Flor do Alto</a>
        <a href="#">Rede Cultura Viva</a>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas Gerais" />

    <div class="footer-bottom">
      <p>© 2024 Esfera Terra Viva — Alinhado à Política Nacional de Cultura Viva (PNCV)</p>
      <p class="mono">Feito com cuidado, terra e comunidade.</p>
    </div>
  </footer>
</template>

<script setup>
import FaqAccordion from './FaqAccordion.vue'
import { faq } from '../data/faqData.js'

const faqItems = faq.footer
</script>

<style scoped>
footer {
  background: var(--white-bleached);
  border-top: 1px solid rgba(74, 55, 40, 0.1);
  padding: 4rem 8% 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 0.75rem;
  color: var(--moss-haze);
  font-style: italic;
  margin: 0.5rem 0 1rem;
}

.footer-contact p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  color: var(--ink);
}

.footer-links h4 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--terracotta);
  margin-bottom: 1rem;
}

.footer-links a {
  display: block;
  text-decoration: none;
  color: var(--moss-haze);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  transition: var(--transition-soft);
}

.footer-links a:hover {
  color: var(--terracotta);
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(74, 55, 40, 0.08);
  text-align: center;
  font-size: 0.75rem;
  color: var(--moss-haze);
}

.footer-bottom p:last-child {
  margin-top: 0.5rem;
  font-size: 0.65rem;
}

@media (max-width: 900px) {
  .footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
</style>
