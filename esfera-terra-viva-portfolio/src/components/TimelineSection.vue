<template>
  <section class="timeline-section" id="sobre">
    <h2>Nossa Trajetória</h2>
    <div class="timeline-flex">
      <div class="timeline-item">
        <span class="timeline-year">2014 — 2024</span>
        <h3>Círculo Vivencial Terra Viva</h3>
        <p style="opacity: 0.8; margin-top: 1rem;">Uma década em Águas da Prata (SP), erguendo espaços coletivos e experimentando novas formas de organização social em plena Mata Atlântica.</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-year">2024 — PRESENTE</span>
        <h3>Esfera Terra Viva</h3>
        <p style="opacity: 0.8; margin-top: 1rem;">Transição e expansão. Sistematização de saberes entre o Oeste da Bahia (Estação Flor do Alto) e a nova base em São João da Boa Vista (SP).</p>
      </div>
    </div>
  </section>
</template>

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
  margin-bottom: 4rem;
}

.timeline-flex {
  display: flex;
  gap: 4rem;
  position: relative;
}

.timeline-item {
  flex: 1;
  position: relative;
  padding-top: 2rem;
  border-top: 1px solid rgba(244, 235, 217, 0.2);
}

.timeline-year {
  font-family: 'JetBrains Mono', monospace;
  color: var(--ochre-sun);
  display: block;
  margin-bottom: 1rem;
}

@media (max-width: 900px) {
  .timeline-flex { flex-direction: column; }
}
</style>
