<template>
  <TextureSection type="diamond" :opacity="0.2" blend-mode="multiply" color="#BC6C25">
    <footer id="contato">
    <div class="footer-main">
      <div class="footer-brand">
        <h2>
          <img class="logo-mark" :src="assetPath('Three-Dots.webp')" alt="Esfera Terra Viva" width="32" height="32" />
          Esfera Terra Viva
        </h2>
        <p class="mono footer-locale">São João da Boa Vista, SP</p>
        <p class="footer-tagline">CULTSP - Ponto de Cultura Comunitário</p>
        <div class="footer-contact">
          <p><strong>E-mail:</strong> contato@esferaterraviva.org</p>
          <p><strong>Instagram:</strong> @esferaterraviva</p>
        </div>
        <div class="footer-social">
          <a href="https://www.instagram.com/esferaterraviva" target="_blank" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
          <a href="#" aria-label="E-mail">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
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
        <a href="#">ALC Nature</a>
        <a href="#">Rede Cultura Viva</a>
      </div>
    </div>

    <FaqAccordion :items="faqItems" title="Dúvidas Gerais" />

    <div class="footer-bottom">
      <p>© 2024 Esfera Terra Viva — CULTSP — Alinhado à PNCV</p>
      <p class="mono">Feito com cuidado, terra e comunidade.</p>
    </div>
  </footer>
  </TextureSection>
</template>

<script setup>
import TextureSection from './textures/TextureSection.vue'
import FaqAccordion from './FaqAccordion.vue'
import { assetPath } from '../utils/paths.js'
import { faq } from '../data/faqData.js'

const faqItems = faq.footer
</script>

<style scoped>
footer {
  background: var(--white-bleached);
  border-top: 1px solid rgba(74, 55, 40, 0.08);
  padding: 4rem 8% 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
}

.footer-locale {
  font-size: 0.6rem;
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

.footer-social {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.footer-social a {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(74, 55, 40, 0.08);
  color: var(--moss-light);
  transition: var(--transition-fast);
}

.footer-social a:hover {
  background: var(--terracotta);
  color: white;
  transform: translateY(-2px);
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
  color: var(--moss-light);
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  margin-bottom: 0.5rem;
  transition: var(--transition-fast);
  position: relative;
  width: fit-content;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--terracotta);
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: var(--terracotta);
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(74, 55, 40, 0.06);
  text-align: center;
  font-size: clamp(0.65rem, 0.8vw, 0.8rem);
  color: var(--moss-light);
}

.footer-bottom p:last-child {
  margin-top: 0.5rem;
  font-size: 0.65rem;
}

@media (max-width: 900px) {
  .footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
}

@media (max-width: 600px) {
  .footer-main { grid-template-columns: 1fr; }
}
</style>
