<template>
  <div
    class="texture-overlay"
    :class="{ 'texture-animated': animated }"
    :style="[textureStyle, baseStyle]"
  >
    <div v-if="animated" class="texture-animation-layer" :style="animLayerStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTexture } from '../../composables/useTexture.js'

const props = defineProps({
  type: { type: String, default: 'noise' },
  position: { type: String, default: 'fixed' },
  zIndex: { type: Number, default: 9999 },
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
  disabled: { type: Boolean, default: false },
})

const { style, isSvg } = useTexture({
  type: props.type,
  opacity: props.disabled ? 0 : props.opacity,
  blendMode: props.blendMode,
  scale: props.scale,
  intensity: props.intensity,
  color: props.color,
  color2: props.color2,
  color3: props.color3,
  animated: props.animated && !props.disabled,
  animationType: props.animationType,
  grid: props.grid,
  stroke: props.stroke,
  radius: props.radius,
  frequency: props.frequency,
  octaves: props.octaves,
})

const baseStyle = computed(() => ({
  position: props.position,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: props.zIndex,
  pointerEvents: 'none',
  contain: 'paint',
}))

const animLayerStyle = computed(() => {
  if (!isSvg.value) return {}
  return {
    position: 'absolute',
    inset: 0,
    backgroundImage: style.value.backgroundImage,
    backgroundRepeat: 'repeat',
    backgroundSize: style.value.backgroundSize,
    opacity: 0,
    animation: `grainShift ${4}s steps(4) infinite`,
    pointerEvents: 'none',
  }
})
</script>

<style scoped>
.texture-overlay {
  contain: paint;
}

.texture-animated {
  will-change: opacity;
}
</style>

<style>
@keyframes grainShift {
  0%, 100% { opacity: 0; }
  25% { opacity: 0.4; }
  50% { opacity: 0.2; }
  75% { opacity: 0.5; }
}

@keyframes texturePulse {
  0%, 100% { opacity: var(--tp-base, 1); }
  50% { opacity: calc(var(--tp-base, 1) * 0.6); }
}

@keyframes textureDrift {
  0%, 100% { background-position: 0 0; }
  50% { background-position: 5px 8px; }
}

@keyframes textureWave {
  0%, 100% { background-position: 0 0; }
  50% { background-position: 8px 4px; }
}
</style>
