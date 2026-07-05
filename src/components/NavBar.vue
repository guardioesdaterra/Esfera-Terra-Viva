<template>
  <nav>
    <a href="#" class="logo">Esfera Terra Viva</a>
    <div class="nav-links">
      <a href="#sobre">SOBRE</a>
      <a href="#fazemos">O QUE FAZEMOS</a>
      <a href="#territorios">TERRITÓRIOS</a>
      <a href="#participar">PARTICIPAR</a>
      <a href="#contato">CONTATO</a>
    </div>
    <div class="mono" style="opacity: 0.6;">CULTURA VIVA · 2024</div>
  </nav>
</template>

<style scoped>
nav {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(to bottom, var(--sand-paper) 40%, transparent);
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clay-deep);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--ink);
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--transition-soft);
  opacity: 0.7;
}

.nav-links a:hover {
  opacity: 1;
  color: var(--ochre-sun);
}

@media (max-width: 900px) {
  .nav-links { display: none; }
}
</style>
