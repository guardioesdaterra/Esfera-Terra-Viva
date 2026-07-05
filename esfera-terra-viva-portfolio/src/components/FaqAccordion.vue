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
          <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>
        </button>
        <div class="faq-answer" ref="answers">
          <p>{{ item.a }}</p>
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
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--clay-deep);
}

.faq-item {
  border-bottom: 1px solid rgba(74, 55, 40, 0.1);
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
  transition: var(--transition-soft);
}

.faq-question:hover {
  color: var(--terracotta);
}

.faq-chevron {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--moss-haze);
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease;
}

.faq-item.open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer p {
  overflow: hidden;
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--moss-haze);
  padding-bottom: 0;
  transition: padding 0.4s ease;
}

.faq-item.open .faq-answer p {
  padding-bottom: 1.25rem;
}
</style>
