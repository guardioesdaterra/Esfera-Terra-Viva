<template>
  <div class="participation" id="participar">
    <div>
      <h2 style="color: white; margin-bottom: 0.5rem;">Como Participar?</h2>
      <p style="opacity: 0.9;">Voluntariado, vagas sociais e mutirões abertos.</p>
    </div>
    <div style="display: flex; gap: 1rem;">
      <a href="#" class="btn-organic">Agendar Visita</a>
      <a href="#" class="btn-organic" style="background: var(--clay-deep); color: white;">Ver Vagas Sociais</a>
    </div>
  </div>
</template>

<style scoped>
.participation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--terracotta);
  margin: 6rem 8%;
  padding: 4rem;
  border-radius: 30px;
  color: white;
}

@media (max-width: 900px) {
  .participation {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
}
</style>
