<template>
  <section class="hero">
    <div class="hero-bg">
      <div
        v-for="img in heroImages"
        :key="img"
        class="hero-bg-img"
        :style="{ backgroundImage: 'url(' + img + ')' }"
      ></div>
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="mono hero-tagline">Ponto de Cultura Comunitário</span>
      <h1>Tecendo novos modos de <i style="font-family: 'Playfair Display'; font-style: italic;">habitar a terra.</i></h1>
      <p>A continuidade de uma trajetória iniciada em 2014, unindo bioconstrução, agroecologia, arte e ancestralidade para cultivar autonomia e harmonia.</p>
    </div>
  </section>
</template>

<script setup>
function assetPath(path) {
  const base = import.meta.env.BASE_URL
  const clean = path.startsWith('/') ? path.slice(1) : path
  return base + clean
}

const heroImages = [
  assetPath('images/hero-1.webp'),
  assetPath('images/hero-2.webp'),
  assetPath('images/hero-3.webp')
]
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 8%;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  mix-blend-mode: multiply;
  filter: saturate(0.8) sepia(0.3);
}

.hero-bg-img:nth-child(1) {
  background-position: center 30%;
  opacity: 0.15;
}

.hero-bg-img:nth-child(2) {
  background-position: center 60%;
  opacity: 0.08;
}

.hero-bg-img:nth-child(3) {
  background-position: center 20%;
  opacity: 0.1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(244,235,217,0.92) 0%, rgba(244,235,217,0.7) 50%, rgba(244,235,217,0.85) 100%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-tagline {
  margin-bottom: 1.5rem;
  display: block;
}

.hero h1 {
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  line-height: 1.1;
  max-width: 900px;
  margin-bottom: 2rem;
}

.hero p {
  max-width: 500px;
  font-size: 1.1rem;
  color: var(--moss-haze);
  margin-left: auto;
  text-align: right;
  border-right: 2px solid var(--terracotta);
  padding-right: 2rem;
}

@media (max-width: 900px) {
  .hero h1 { font-size: 3rem; }
}
</style>
