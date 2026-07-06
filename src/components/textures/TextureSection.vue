<template>
  <div class="texture-section" :style="sectionStyle">
    <div
      class="texture-section-overlay"
      :class="{ 'texture-animated': animated }"
      :style="textureStyle"
    ></div>
    <slot />
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { useTexture } from '../../composables/useTexture.js'

const props = defineProps({
  type: { type: String, default: 'noise' },
  opacity: { type: Number, default: 0.045 },
  blendMode: { type: String, default: null },
  scale: { type: Number, default: 1 },
  intensity: { type: Number, default: 1 },
  color: { type: String, default: null },
  color2: { type: String, default: null },
  color3: { type: String, default: null },
  animated: { type: Boolean, default: false },
  animationType: { type: String, default: 'grainShift' },
  grid: { type: Number, default: null },
  stroke: { type: Number, default: null },
  radius: { type: Number, default: null },
  frequency: { type: [String, Number], default: null },
  octaves: { type: Number, default: null },
  zIndex: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
})

const { style: textureStyle } = useTexture({
  type: props.type,
  opacity: props.disabled ? 0 : props.opacity,
  blendMode: props.blendMode,
  scale: props.scale,
  intensity: props.intensity,
  color: props.color,
  color2: props.color2,
  color3: props.color3,
  animated: false,
  grid: props.grid,
  stroke: props.stroke,
  radius: props.radius,
  frequency: props.frequency,
  octaves: props.octaves,
})

const sectionStyle = computed(() => ({
  position: 'relative',
}))
</script>

<style scoped>
.texture-section {
  position: relative;
}

.texture-section-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  contain: paint;
  z-index: 0;
}

.texture-section-overlay.texture-animated {
  will-change: opacity;
}

.texture-section > :deep(*) {
  position: relative;
  z-index: 1;
}
</style>
