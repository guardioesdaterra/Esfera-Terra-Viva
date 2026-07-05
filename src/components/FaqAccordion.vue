<template>
  <div class="faq-section" v-if="items && items.length">
    <h3 class="faq-title">{{ title }}</h3>
    <div class="faq-accordion">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="faq-item"
        :class="{ open: openIndex === i }"
      >
        <button class="faq-question" @click="toggle(i)">
          <span>{{ item.q }}</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
        </button>
        <div class="faq-answer" ref="answers">
          <div class="faq-answer-inner">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  items: { type: Array, default: () => [] },
  title: { type: String, default: 'Perguntas Frequentes' }
})

const openIndex = ref(-1)

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<style scoped>
.faq-section {
  margin-top: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.faq-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--clay-deep);
}

.faq-item {
  border-bottom: 1px solid rgba(74, 55, 40, 0.08);
  transition: border-color 0.3s ease;
}

.faq-item.open {
  border-bottom-color: rgba(226, 114, 91, 0.2);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--clay-deep);
  text-align: left;
  transition: var(--transition-fast);
}

.faq-question:hover {
  color: var(--terracotta);
}

.faq-chevron {
  flex-shrink: 0;
  transition: transform 0.4s ease, color 0.3s ease;
  color: var(--moss-haze);
}

.faq-item.open .faq-chevron {
  transform: rotate(45deg);
  color: var(--terracotta);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-item.open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer p {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--moss-haze);
  padding: 0 1.5rem 1.25rem 0;
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 0.45s ease, opacity 0.45s ease;
}

.faq-item.open .faq-answer p {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.12s;
}

.timeline-section .faq-title { color: var(--sand-paper); }
.timeline-section .faq-question { color: var(--sand-paper); }
.timeline-section .faq-question:hover { color: var(--ochre-sun); }
.timeline-section .faq-answer p { color: rgba(244, 235, 217, 0.75); }
.timeline-section .faq-item { border-bottom-color: rgba(244, 235, 217, 0.1); }
.timeline-section .faq-item.open { border-bottom-color: rgba(226, 114, 91, 0.3); }
</style>
