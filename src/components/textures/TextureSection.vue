<template>
  <div class="texture-section" :style="{ position: 'relative' }">
    <div class="texture-section-overlay" :style="[textureStyle, { zIndex: zIndex || 0 }]"></div>
    <slot />
  </div>
</template>

<script setup>
import { useTexture } from '../../composables/useTexture.js'

const props = defineProps({
  type: { type: String, default: 'noise' },
  opacity: { type: Number, default: 0.045 },
  blendMode: { type: String, default: null },
  scale: { type: Number, default: 1 },
  intensity: { type: Number, default: 0.08 },
  color: { type: String, default: null },
  color2: { type: String, default: null },
  color3: { type: String, default: null },
  grid: { type: Number, default: null },
  stroke: { type: Number, default: null },
  radius: { type: Number, default: null },
  frequency: { type: [String, Number], default: null },
  octaves: { type: Number, default: null },
  space: { type: Number, default: null },
  angle: { type: Number, default: null },
  inner: { type: Number, default: null },
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
  grid: props.grid,
  stroke: props.stroke,
  radius: props.radius,
  frequency: props.frequency,
  octaves: props.octaves,
  space: props.space,
  angle: props.angle,
  inner: props.inner,
})
</script>

<style scoped>
.texture-section { position: relative; }

.texture-section-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  contain: paint;
}

.texture-section > :deep(*) {
  position: relative;
  z-index: 1;
}
</style>
