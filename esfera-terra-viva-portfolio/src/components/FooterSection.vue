<template>
  <footer>
    <div class="footer-brand">
      <h2>Esfera Terra Viva</h2>
      <p class="mono">São João da Boa Vista, SP</p>
      <p style="font-size: 0.7rem; margin-top: 1rem; color: var(--moss-haze);">© 2024 — Política Nacional de Cultura Viva</p>
    </div>
    <div class="footer-nav">
      <a href="#">Instagram</a>
      <a href="#">WhatsApp</a>
      <a href="#">E-mail</a>
      <a href="#">Imprensa</a>
      <a href="#">Mídia</a>
      <a href="#">Privacidade</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: 4rem 8%;
  border-top: 1px solid rgba(74, 55, 40, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-brand h2 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 4rem;
}

.footer-nav a {
  text-decoration: none;
  color: var(--moss-haze);
  font-size: 0.8rem;
}
</style>
