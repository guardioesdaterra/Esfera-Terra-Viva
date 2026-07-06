import { computed, reactive } from 'vue'

function svgUrl(svg) {
  const cleaned = svg.replace(/\s+/g, ' ').trim()
  return `url("data:image/svg+xml,${encodeURIComponent(cleaned)}")`
}

const patternDefs = {

  noise: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${o.frequency||0.8}' numOctaves='${o.octaves||2}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`),
    size: 128 * (o.scale || 1),
  }),

  dust: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><filter id='d'><feTurbulence type='fractalNoise' baseFrequency='${o.frequency||2.5}' numOctaves='${o.octaves||1}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#d)' opacity='${o.intensity||0.15}'/></svg>`),
    size: 64 * (o.scale || 1),
  }),

  grunge: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='${o.frequency||0.4}' numOctaves='${o.octaves||3}' stitchTiles='stitch'/><feColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 ${o.intensity||0.12} 0'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`),
    size: 96 * (o.scale || 1),
  }),

  dots: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||48} ${o.grid||48}' xmlns='http://www.w3.org/2000/svg'><circle cx='${(o.grid||48)/4}' cy='${(o.grid||48)/4}' r='${o.radius||3}' fill='${o.color||'#000'}' opacity='${o.intensity||0.12}'/><circle cx='${(o.grid||48)*3/4}' cy='${(o.grid||48)/4}' r='${o.radius||3}' fill='${o.color||'#000'}' opacity='${o.intensity||0.12}'/><circle cx='${(o.grid||48)/2}' cy='${(o.grid||48)/2}' r='${o.radius||3}' fill='${o.color||'#000'}' opacity='${o.intensity||0.12}'/><circle cx='${(o.grid||48)/4}' cy='${(o.grid||48)*3/4}' r='${o.radius||3}' fill='${o.color||'#000'}' opacity='${o.intensity||0.12}'/><circle cx='${(o.grid||48)*3/4}' cy='${(o.grid||48)*3/4}' r='${o.radius||3}' fill='${o.color||'#000'}' opacity='${o.intensity||0.12}'/></svg>`),
    size: (o.grid || 48) * (o.scale || 1),
  }),

  crosshatch: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='0' x2='${o.grid||32}' y2='${o.grid||32}' stroke='${o.color||'#000'}' stroke-width='${o.stroke||1}' opacity='${o.intensity||0.1}'/><line x1='${o.grid||32}' y1='0' x2='0' y2='${o.grid||32}' stroke='${o.color||'#000'}' stroke-width='${o.stroke||1}' opacity='${o.intensity||0.1}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),

  canvas: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${o.intensity||0.06}'/><rect x='${(o.grid||32)/2}' y='${(o.grid||32)/2}' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${o.intensity||0.06}'/><line x1='0' y1='${(o.grid||32)/2}' x2='${o.grid||32}' y2='${(o.grid||32)/2}' stroke='${o.color||'#000'}' stroke-width='0.5' opacity='${o.intensity||0.04}'/><line x1='${(o.grid||32)/2}' y1='0' x2='${(o.grid||32)/2}' y2='${o.grid||32}' stroke='${o.color||'#000'}' stroke-width='0.5' opacity='${o.intensity||0.04}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),

  waves: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||64} ${(o.grid||64)/2}' xmlns='http://www.w3.org/2000/svg'><path d='M0 ${(o.grid||64)/4} Q${(o.grid||64)/4} 0 ${(o.grid||64)/2} ${(o.grid||64)/4} T${o.grid||64} ${(o.grid||64)/4}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||1.5}' opacity='${o.intensity||0.08}'/></svg>`),
    size: (o.grid || 64) * (o.scale || 1),
  }),

  brick: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||48} ${(o.grid||48)/2}' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='${(o.grid||48)/2-1}' height='${(o.grid||48)/4-1}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.12}'/><rect x='${(o.grid||48)/2+1}' y='0' width='${(o.grid||48)/2-1}' height='${(o.grid||48)/4-1}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.12}'/><rect x='${-(o.grid||48)/4}' y='${(o.grid||48)/4+1}' width='${(o.grid||48)/2-1}' height='${(o.grid||48)/4-1}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.12}'/><rect x='${(o.grid||48)/4+1}' y='${(o.grid||48)/4+1}' width='${(o.grid||48)/2-1}' height='${(o.grid||48)/4-1}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.12}'/><rect x='${(o.grid||48)*3/4+1}' y='${(o.grid||48)/4+1}' width='${(o.grid||48)/2-1}' height='${(o.grid||48)/4-1}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.12}'/></svg>`),
    size: (o.grid || 48) * (o.scale || 1),
  }),

  herringbone: (o) => {
    const g = o.grid || 32
    return {
      image: svgUrl(`<svg viewBox='0 0 ${g} ${g}' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='${g/4}' height='${g/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.1)*0.6}'/><rect x='${g/2}' y='${g/2}' width='${g/4}' height='${g/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.1)*0.6}'/><rect x='${g/4}' y='${g/4}' width='${g/4}' height='${g/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.1)*0.4}'/><rect x='${g*3/4}' y='${g*3/4}' width='${g/4}' height='${g/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.1)*0.4}'/><line x1='0' y1='${g/2}' x2='${g/2}' y2='0' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.08}'/><line x1='${g/2}' y1='${g}' x2='${g}' y2='${g/2}' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.08}'/></svg>`),
      size: g * (o.scale || 1),
    }
  },

  honeycomb: (o) => {
    const g = o.grid || 48
    const r = g / 4
    const h = r * Math.sqrt(3)
    return {
      image: svgUrl(`<svg viewBox='0 0 ${g} ${g}' xmlns='http://www.w3.org/2000/svg'><polygon points='${g/2},${g/2 - r} ${g/2 + h},${g/2 - r/2} ${g/2 + h},${g/2 + r/2} ${g/2},${g/2 + r} ${g/2 - h},${g/2 + r/2} ${g/2 - h},${g/2 - r/2}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.1}'/></svg>`),
      size: g * (o.scale || 1),
    }
  },

  checkerboard: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${o.intensity||0.06}'/><rect x='${(o.grid||32)/2}' y='${(o.grid||32)/2}' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${o.intensity||0.06}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),

  diamond: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><polygon points='${(o.grid||32)/2},0 ${o.grid||32},${(o.grid||32)/2} ${(o.grid||32)/2},${o.grid||32} 0,${(o.grid||32)/2}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.1}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),

  zigzag: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||48} ${(o.grid||48)/2}' xmlns='http://www.w3.org/2000/svg'><polyline points='0,${(o.grid||48)/2} ${(o.grid||48)/4},0 ${(o.grid||48)/2},${(o.grid||48)/2} ${(o.grid||48)*3/4},0 ${o.grid||48},${(o.grid||48)/2}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||1}' opacity='${o.intensity||0.08}'/></svg>`),
    size: (o.grid || 48) * (o.scale || 1),
  }),

  triangle: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><polygon points='0,0 ${o.grid||32},0 ${(o.grid||32)/2},${o.grid||32}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.08)*0.6}'/><polygon points='0,0 0,${o.grid||32} ${(o.grid||32)/2},${o.grid||32}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.08)*0.4}'/><polygon points='${o.grid||32},0 ${o.grid||32},${o.grid||32} ${(o.grid||32)/2},${o.grid||32}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.08)*0.3}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),

  scales: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||48} ${(o.grid||48)/2}' xmlns='http://www.w3.org/2000/svg'><circle cx='${(o.grid||48)/4}' cy='${(o.grid||48)/4}' r='${(o.grid||48)/4}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.08}'/><circle cx='${(o.grid||48)*3/4}' cy='${(o.grid||48)/4}' r='${(o.grid||48)/4}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.08}'/><circle cx='${(o.grid||48)/2}' cy='${(o.grid||48)*3/4}' r='${(o.grid||48)/4}' fill='none' stroke='${o.color||'#000'}' stroke-width='${o.stroke||0.5}' opacity='${o.intensity||0.08}'/></svg>`),
    size: (o.grid || 48) * (o.scale || 1),
  }),

  woven: (o) => ({
    image: svgUrl(`<svg viewBox='0 0 ${o.grid||32} ${o.grid||32}' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='0' x2='${o.grid||32}' y2='${o.grid||32}' stroke='${o.color||'#000'}' stroke-width='${o.stroke||2}' opacity='${(o.intensity||0.08)*0.6}'/><line x1='0' y1='${o.grid||32}' x2='${o.grid||32}' y2='0' stroke='${o.color||'#000'}' stroke-width='${o.stroke||2}' opacity='${(o.intensity||0.08)*0.6}'/><rect x='0' y='0' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.08)*0.5}'/><rect x='${(o.grid||32)/2}' y='${(o.grid||32)/2}' width='${(o.grid||32)/2}' height='${(o.grid||32)/2}' fill='${o.color||'#000'}' opacity='${(o.intensity||0.08)*0.5}'/></svg>`),
    size: (o.grid || 32) * (o.scale || 1),
  }),
}

const gradientDefs = {
  paper: (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, ${o.color || 'rgba(188,108,37,0.015)'} 1px, ${o.color || 'rgba(188,108,37,0.015)'} 2px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, ${o.color2 || 'rgba(74,55,40,0.008)'} 2px, ${o.color2 || 'rgba(74,55,40,0.008)'} 3px)
    `,
  }),

  grid: (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent ${(o.grid||30)*(o.scale||1)}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.grid||30)*(o.scale||1)}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.grid||30)*(o.scale||1)+1}px),
      repeating-linear-gradient(90deg, transparent, transparent ${(o.grid||30)*(o.scale||1)}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.grid||30)*(o.scale||1)}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.grid||30)*(o.scale||1)+1}px)
    `,
  }),

  stripe: (o) => ({
    css: `repeating-linear-gradient(${o.angle||-45}deg, transparent, transparent ${o.space||8}px, ${o.color||'rgba(74,55,40,0.04)'} ${o.space||8}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.space||8)+(o.stroke||2)}px)`,
  }),

  stripeH: (o) => ({
    css: `repeating-linear-gradient(0deg, transparent, transparent ${o.space||6}px, ${o.color||'rgba(74,55,40,0.04)'} ${o.space||6}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.space||6)+(o.stroke||1)}px)`,
  }),

  stripeV: (o) => ({
    css: `repeating-linear-gradient(90deg, transparent, transparent ${o.space||6}px, ${o.color||'rgba(74,55,40,0.04)'} ${o.space||6}px, ${o.color||'rgba(74,55,40,0.04)'} ${(o.space||6)+(o.stroke||1)}px)`,
  }),

  vintage: (o) => ({
    css: `
      radial-gradient(ellipse at 50% 50%, transparent 60%, ${o.color||'rgba(188,108,37,0.03)'} 100%),
      linear-gradient(180deg, ${o.color2||'rgba(226,114,91,0.02)'} 0%, transparent 30%, transparent 70%, ${o.color3||'rgba(74,55,40,0.03)'} 100%)
    `,
  }),

  vignette: (o) => ({
    css: `radial-gradient(ellipse at 50% 50%, transparent ${o.inner||60}%, ${o.color||'rgba(74,55,40,0.04)'} 100%)`,
  }),

  lightleak: (o) => ({
    css: `
      linear-gradient(${o.angle||45}deg, ${o.color||'rgba(226,114,91,0.015)'} 0%, transparent 20%, transparent 80%, ${o.color2||'rgba(188,108,37,0.02)'} 100%)
    `,
  }),
}

const animationDefs = {
  grainShift: {
    css: `grainShift ${4}s steps(4) infinite`,
    keyframes: `@keyframes grainShift { 0%,100% { opacity: 0; } 25% { opacity: 0.4; } 50% { opacity: 0.2; } 75% { opacity: 0.5; } }`,
  },
  pulse: {
    css: `texturePulse ${3}s ease-in-out infinite`,
    keyframes: `@keyframes texturePulse { 0%,100% { opacity: var(--tp-base,1); } 50% { opacity: calc(var(--tp-base,1) * 0.6); } }`,
  },
  drift: {
    css: `textureDrift ${8}s ease-in-out infinite`,
    keyframes: `@keyframes textureDrift { 0%,100% { background-position: 0 0; } 50% { background-position: 5px 8px; } }`,
  },
  wave: {
    css: `textureWave 6s ease-in-out infinite`,
    keyframes: `@keyframes textureWave { 0%,100% { background-position: 0 0; } 50% { background-position: 8px 4px; } }`,
  },
}

const TEXTURE_KEYS = Object.keys(patternDefs).concat(Object.keys(gradientDefs))
const ANIMATION_KEYS = Object.keys(animationDefs)

function mergeOpts(defaults, overrides) {
  const r = { ...defaults }
  for (const k of Object.keys(overrides)) {
    if (overrides[k] !== undefined) r[k] = overrides[k]
  }
  return r
}

export function useTexture(options = {}) {
  const config = reactive({
    type: 'noise',
    opacity: 1,
    blendMode: null,
    scale: 1,
    intensity: 1,
    animated: false,
    animationType: 'grainShift',
    color: null,
    color2: null,
    color3: null,
    frequency: null,
    octaves: null,
    grid: null,
    radius: null,
    stroke: null,
    space: null,
    angle: null,
    inner: null,
    ...options,
  })

  const isSvg = computed(() => patternDefs[config.type] != null)

  const resolved = computed(() => {
    const gen = patternDefs[config.type] || gradientDefs[config.type]
    if (!gen) return { css: '', image: null, size: null }

    const opts = { ...config }
    if (!opts.color) {
      opts.color = config.type === 'dust' || config.type === 'grunge' ? '#000' : '#000'
    }

    const result = gen(opts)

    const cssParts = []

    if (isSvg.value) {
      cssParts.push(`background-image: ${result.image}`)
      cssParts.push(`background-repeat: repeat`)
      cssParts.push(`background-size: ${result.size}px ${result.size}px`)
    } else {
      if (result.css) {
        cssParts.push(`background: ${result.css}`)
        cssParts.push(`background-repeat: repeat`)
      }
    }

    cssParts.push(`opacity: ${config.opacity}`)
    if (config.blendMode) {
      cssParts.push(`mix-blend-mode: ${config.blendMode}`)
    }
    cssParts.push('pointer-events: none')
    cssParts.push('contain: paint')

    if (config.animated && isSvg.value) {
      const anim = animationDefs[config.animationType] || animationDefs.grainShift
      cssParts.push(`animation: ${anim.css}`)
    }

    return {
      css: cssParts.join('; '),
      image: result.image,
      size: result.size,
      keyframes: (config.animated && isSvg.value)
        ? (animationDefs[config.animationType] || animationDefs.grainShift).keyframes
        : '',
    }
  })

  const style = computed(() => {
    const r = resolved.value
    const obj = {}

    if (isSvg.value) {
      obj.backgroundImage = r.image
      obj.backgroundRepeat = 'repeat'
      if (r.size) {
        obj.backgroundSize = `${r.size}px ${r.size}px`
      }
    } else {
      const gen = gradientDefs[config.type]
      if (gen) {
        const opts = { ...config }
        const result = gen(opts)
        obj.background = result.css
      }
    }

    obj.opacity = config.opacity
    if (config.blendMode) {
      obj.mixBlendMode = config.blendMode
    }
    obj.pointerEvents = 'none'
    obj.contain = 'paint'

    if (config.animated) {
      const anim = animationDefs[config.animationType] || animationDefs.grainShift
      obj.animation = anim.css
    }

    if (config.animated && isSvg.value) {
      const anim = animationDefs[config.animationType] || animationDefs.grainShift
      obj.animation = anim.css
    }

    return obj
  })

  const keyframes = computed(() => {
    if (!config.animated && !isSvg.value) return ''
    const anim = animationDefs[config.animationType] || animationDefs.grainShift
    return anim.keyframes
  })

  function setType(type) {
    if (TEXTURE_KEYS.includes(type)) {
      config.type = type
    }
  }

  function setOptions(opts) {
    for (const k of Object.keys(opts)) {
      if (k in config) {
        config[k] = opts[k]
      }
    }
  }

  const typeList = TEXTURE_KEYS

  return {
    config,
    style,
    keyframes,
    isSvg,
    setType,
    setOptions,
    typeList,
  }
}
