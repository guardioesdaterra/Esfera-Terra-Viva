<template>
  <section class="container" id="fazemos">
    <div class="organic-grid">
      <div
        v-for="(pillar, index) in pillars"
        :key="index"
        class="pillar-card"
        :style="{ borderRadius: pillar.radius, marginTop: pillar.margin }"
        ref="cards"
      >
        <svg class="pillar-icon" viewBox="0 0 24 24"><path :d="pillar.icon"/></svg>
        <h3>{{ pillar.title }}</h3>
        <p class="mono" style="font-size: 0.65rem;">{{ pillar.subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cards = ref([])

const pillars = [
  {
    title: 'Bioconstrução',
    subtitle: 'Manejo Ecológico',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    margin: '0',
    icon: 'M12,3L2,12H5V20H19V12H22L12,3M12,8.7L16.5,12.7V18H7.5V12.7L12,8.7M12,11.5L9,14.5L10.4,15.9L12,14.3L13.6,15.9L15,14.5L12,11.5Z'
  },
  {
    title: 'Agrofloresta',
    subtitle: 'Sementes Crioulas',
    radius: '60% 40% 30% 70% / 50% 60% 40% 50%',
    margin: '2rem 0 0 0',
    icon: 'M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M7,8C5.34,8 4,9.34 4,11C4,12.66 5.34,14 7,14C8.66,14 10,12.66 10,11C10,9.34 8.66,8 7,8M12,14C10.34,14 9,15.34 9,17C9,18.66 10.34,20 12,20C13.66,20 15,18.66 15,17C15,15.34 13.66,14 12,14Z'
  },
  {
    title: 'Ancestralidade',
    subtitle: 'Ritos e Saberes',
    radius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    margin: '-1rem 0 0 0',
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6L11.45,7.26L10.12,7.45L11.09,8.4L10.86,9.73L12,9.1L13.14,9.73L12.91,8.4L13.88,7.45L12.55,7.26L12,6Z'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) rotate(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.value.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) rotate(-2deg)';
    card.style.transition = 'var(--transition-soft)';
    observer.observe(card);
  });
})
</script>

<style scoped>
.organic-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.pillar-card {
  grid-column: span 4;
  background: var(--white-bleached);
  padding: 3rem 2rem;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  transition: var(--transition-soft);
  border: 1px solid rgba(74, 55, 40, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.pillar-card:hover {
  transform: translateY(-10px) rotate(2deg);
  background: var(--sand-paper);
  box-shadow: 0 30px 60px rgba(74, 55, 40, 0.08);
}

.pillar-card h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1.75rem;
}

.pillar-icon {
  width: 60px;
  height: 60px;
  fill: var(--terracotta);
  opacity: 0.8;
}

@media (max-width: 900px) {
  .pillar-card { grid-column: span 6; }
}

@media (max-width: 600px) {
  .pillar-card { grid-column: span 12; }
}
</style>
