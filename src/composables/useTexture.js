import { computed, reactive } from 'vue'

function svg(s) {
  const w = s.includes('xmlns=') ? s : s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  return `url("data:image/svg+xml,${encodeURIComponent(w.replace(/\s+/g, ' '))}")`
}

function sz(v, s) { return (v || s) * (arguments[2] || 1) }

const SVG = {
  noise: (o) => ({
    url: svg(`<svg viewBox='0 0 32 32'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${o.f||0.6}' numOctaves='${o.oct||1}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`),
    size: 64,
  }),
  dust: (o) => ({
    url: svg(`<svg viewBox='0 0 32 32'><filter id='d'><feTurbulence type='fractalNoise' baseFrequency='${o.f||2}' numOctaves='${o.oct||1}' stitchTiles='stitch'/><feColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 ${o.int||0.12} 0'/></filter><rect width='100%' height='100%' filter='url(#d)'/></svg>`),
    size: 32,
  }),
  dots: (o) => {
    const g = o.g || 48
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><circle cx='${g/4}' cy='${g/4}' r='${o.r||3}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/><circle cx='${g*3/4}' cy='${g/4}' r='${o.r||3}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/><circle cx='${g/2}' cy='${g/2}' r='${o.r||3}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/><circle cx='${g/4}' cy='${g*3/4}' r='${o.r||3}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/><circle cx='${g*3/4}' cy='${g*3/4}' r='${o.r||3}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/></svg>`),
      size: g,
    }
  },
  'dots-small': (o) => {
    const g = o.g || 24
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><circle cx='${g/4}' cy='${g/4}' r='${o.r||1.5}' fill='${o.c||'#000'}' opacity='${o.int||0.1}'/><circle cx='${g*3/4}' cy='${g/4}' r='${o.r||1.5}' fill='${o.c||'#000'}' opacity='${o.int||0.1}'/><circle cx='${g/4}' cy='${g*3/4}' r='${o.r||1.5}' fill='${o.c||'#000'}' opacity='${o.int||0.1}'/><circle cx='${g*3/4}' cy='${g*3/4}' r='${o.r||1.5}' fill='${o.c||'#000'}' opacity='${o.int||0.1}'/><circle cx='${g/2}' cy='${g/2}' r='${o.r||1.5}' fill='${o.c||'#000'}' opacity='${o.int||0.1}'/></svg>`),
      size: g,
    }
  },
  'dots-dense': (o) => {
    const g = o.g || 16
    const s = g / 4
    let circles = ''
    for (let y = 0; y < 5; y++)
      for (let x = 0; x < 5; x++)
        circles += `<circle cx='${s*(x+0.5)}' cy='${s*(y+0.5)}' r='${o.r||1}' fill='${o.c||'#000'}' opacity='${o.int||0.08}'/>`
    return { url: svg(`<svg viewBox='0 0 ${g} ${g}'>${circles}</svg>`), size: g }
  },
  crosshatch: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||32} ${o.g||32}'><line x1='0' y1='0' x2='${o.g||32}' y2='${o.g||32}' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.1}'/><line x1='${o.g||32}' y1='0' x2='0' y2='${o.g||32}' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.1}'/></svg>`),
    size: o.g || 32,
  }),
  'crosshatch-dense': (o) => {
    const g = o.g || 16
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><line x1='0' y1='0' x2='${g}' y2='${g}' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><line x1='${g}' y1='0' x2='0' y2='${g}' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/></svg>`),
      size: g,
    }
  },
  checkerboard: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||32} ${o.g||32}'><rect x='0' y='0' width='${(o.g||32)/2}' height='${(o.g||32)/2}' fill='${o.c||'#000'}' opacity='${o.int||0.07}'/><rect x='${(o.g||32)/2}' y='${(o.g||32)/2}' width='${(o.g||32)/2}' height='${(o.g||32)/2}' fill='${o.c||'#000'}' opacity='${o.int||0.07}'/></svg>`),
    size: o.g || 32,
  }),
  diamond: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||32} ${o.g||32}'><polygon points='${(o.g||32)/2},0 ${o.g||32},${(o.g||32)/2} ${(o.g||32)/2},${o.g||32} 0,${(o.g||32)/2}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.1}'/></svg>`),
    size: o.g || 32,
  }),
  triangle: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||32} ${o.g||32}'><polygon points='0,0 ${o.g||32},0 ${(o.g||32)/2},${o.g||32}' fill='${o.c||'#000'}' opacity='${(o.int||0.08)*0.6}'/><polygon points='0,0 0,${o.g||32} ${(o.g||32)/2},${o.g||32}' fill='${o.c||'#000'}' opacity='${(o.int||0.08)*0.4}'/><polygon points='${o.g||32},0 ${o.g||32},${o.g||32} ${(o.g||32)/2},${o.g||32}' fill='${o.c||'#000'}' opacity='${(o.int||0.08)*0.3}'/></svg>`),
    size: o.g || 32,
  }),
  zigzag: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||48} ${(o.g||48)/2}'><polyline points='0,${(o.g||48)/2} ${(o.g||48)/4},0 ${(o.g||48)/2},${(o.g||48)/2} ${(o.g||48)*3/4},0 ${o.g||48},${(o.g||48)/2}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.08}'/></svg>`),
    size: o.g || 48,
  }),
  chevron: (o) => {
    const g = o.g || 48
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g/2}'><polyline points='0,${g/4} ${g/4},0 ${g/2},${g/4} ${g/2},0' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.07}'/><polyline points='${g/2},${g/4} ${g*3/4},0 ${g},${g/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.07}'/></svg>`),
      size: g,
    }
  },
  honeycomb: (o) => {
    const g = o.g || 48
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><polygon points='${g/2},${g/2-g/4} ${g/2+g/4*Math.sqrt(3)/2},${g/2-g/8} ${g/2+g/4*Math.sqrt(3)/2},${g/2+g/8} ${g/2},${g/2+g/4} ${g/2-g/4*Math.sqrt(3)/2},${g/2+g/8} ${g/2-g/4*Math.sqrt(3)/2},${g/2-g/8}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.1}'/></svg>`),
      size: g,
    }
  },
  hexagon: (o) => {
    const g = o.g || 48
    const r = g / 3
    const h = r * Math.sqrt(3)
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><polygon points='${g/2},0 ${g/2+h},${r/2} ${g/2+h},${r/2+r} ${g/2},${r+r} ${g/2-h},${r/2+r} ${g/2-h},${r/2}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><polygon points='${g/2},${g} ${g/2+h},${g-r/2} ${g/2+h},${g-r/2-r} ${g/2},${g-r-r} ${g/2-h},${g-r/2-r} ${g/2-h},${g-r/2}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/></svg>`),
      size: g,
    }
  },
  'grid-dot': (o) => {
    const g = o.g || 24
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><circle cx='0' cy='0' r='${o.r||1}' fill='${o.c||'#000'}' opacity='${o.int||0.12}'/></svg>`),
      size: g,
    }
  },
  canvas: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||24} ${o.g||24}'><rect x='0' y='0' width='${(o.g||24)/2}' height='${(o.g||24)/2}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/><rect x='${(o.g||24)/2}' y='${(o.g||24)/2}' width='${(o.g||24)/2}' height='${(o.g||24)/2}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/></svg>`),
    size: o.g || 24,
  }),
  herringbone: (o) => {
    const g = o.g || 24
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><rect x='0' y='0' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${(o.int||0.1)*0.6}'/><rect x='${g/2}' y='${g/2}' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${(o.int||0.1)*0.6}'/></svg>`),
      size: g,
    }
  },
  woven: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||24} ${o.g||24}'><line x1='0' y1='0' x2='${o.g||24}' y2='${o.g||24}' stroke='${o.c||'#000'}' stroke-width='${o.w||2}' opacity='${(o.int||0.08)*0.6}'/><line x1='0' y1='${o.g||24}' x2='${o.g||24}' y2='0' stroke='${o.c||'#000'}' stroke-width='${o.w||2}' opacity='${(o.int||0.08)*0.6}'/></svg>`),
    size: o.g || 24,
  }),
  scales: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||36} ${(o.g||36)/2}'><circle cx='${(o.g||36)/4}' cy='${(o.g||36)/4}' r='${(o.g||36)/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><circle cx='${(o.g||36)*3/4}' cy='${(o.g||36)/4}' r='${(o.g||36)/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><circle cx='${(o.g||36)/2}' cy='${(o.g||36)*3/4}' r='${(o.g||36)/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/></svg>`),
    size: o.g || 36,
  }),
  brick: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||36} ${(o.g||36)/2}'><rect x='0' y='0' width='${(o.g||36)/2-1}' height='${(o.g||36)/4-1}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.12}'/><rect x='${(o.g||36)/2+1}' y='0' width='${(o.g||36)/2-1}' height='${(o.g||36)/4-1}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.12}'/></svg>`),
    size: o.g || 36,
  }),
  basket: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><rect x='0' y='0' width='${g/3}' height='${g/3}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/><rect x='${g*2/3}' y='0' width='${g/3}' height='${g/3}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/><rect x='${g/3}' y='${g/3}' width='${g/3}' height='${g/3}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/><rect x='0' y='${g*2/3}' width='${g/3}' height='${g/3}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/><rect x='${g*2/3}' y='${g*2/3}' width='${g/3}' height='${g/3}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/></svg>`),
      size: g,
    }
  },
  ribbed: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||8} ${o.g||8}'><rect x='0' y='0' width='${(o.g||8)/2}' height='${o.g||8}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/></svg>`),
    size: o.g || 8,
  }),
  twill: (o) => {
    const g = o.g || 24
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><line x1='0' y1='${g/4}' x2='${g*3/4}' y2='${g}' stroke='${o.c||'#000'}' stroke-width='${o.w||1.5}' opacity='${(o.int||0.08)*0.5}'/><line x1='${g/4}' y1='0' x2='${g}' y2='${g*3/4}' stroke='${o.c||'#000'}' stroke-width='${o.w||1.5}' opacity='${(o.int||0.08)*0.5}'/></svg>`),
      size: g,
    }
  },
  stripe: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||4} ${o.g||4}'><rect x='0' y='0' width='${(o.g||4)/2}' height='${o.g||4}' fill='${o.c||'#000'}' opacity='${o.int||0.05}'/></svg>`),
    size: o.g || 4,
  }),
  'stripe-wide': (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||8} ${o.g||8}'><rect x='0' y='0' width='${(o.g||8)/2}' height='${o.g||8}' fill='${o.c||'#000'}' opacity='${o.int||0.06}'/></svg>`),
    size: o.g || 8,
  }),
  'stripe-diag': (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||12} ${o.g||12}'><line x1='0' y1='${o.g||12}' x2='${o.g||12}' y2='0' stroke='${o.c||'#000'}' stroke-width='${o.w||2}' opacity='${o.int||0.06}'/></svg>`),
    size: o.g || 12,
  }),
  waves: (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||48} ${(o.g||48)/2}'><path d='M0 ${(o.g||48)/4} Q${(o.g||48)/4} 0 ${(o.g||48)/2} ${(o.g||48)/4} T${o.g||48} ${(o.g||48)/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||1.5}' opacity='${o.int||0.08}'/></svg>`),
    size: o.g || 48,
  }),
  'waves-dense': (o) => ({
    url: svg(`<svg viewBox='0 0 ${o.g||16} ${(o.g||16)/2}'><path d='M0 ${(o.g||16)/4} Q${(o.g||16)/4} 0 ${(o.g||16)/2} ${(o.g||16)/4} T${o.g||16} ${(o.g||16)/4}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||1}' opacity='${o.int||0.05}'/></svg>`),
    size: o.g || 16,
  }),
  pinstripe: (o) => ({
    url: svg(`<svg viewBox='0 0 4 4'><rect x='0' y='0' width='1' height='4' fill='${o.c||'#000'}' opacity='${o.int||0.04}'/></svg>`),
    size: 4,
  }),
  fishnet: (o) => {
    const g = o.g || 24
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><line x1='0' y1='0' x2='${g}' y2='${g}' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.06}'/><line x1='0' y1='${g}' x2='${g}' y2='0' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.06}'/></svg>`),
      size: g,
    }
  },
  target: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><circle cx='${g/2}' cy='${g/2}' r='${g/2}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.06}'/><circle cx='${g/2}' cy='${g/2}' r='${g/3}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.06}'/><circle cx='${g/2}' cy='${g/2}' r='${g/6}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.06}'/></svg>`),
      size: g,
    }
  },
  sunburst: (o) => {
    const g = o.g || 36
    let lines = ''
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4
      lines += `<line x1='${g/2}' y1='${g/2}' x2='${g/2+Math.cos(a)*g}' y2='${g/2+Math.sin(a)*g}' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/>`
    }
    return { url: svg(`<svg viewBox='0 0 ${g} ${g}'>${lines}</svg>`), size: g }
  },
  bubble: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><circle cx='${g/4}' cy='${g/4}' r='${g/5}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/><circle cx='${g*3/4}' cy='${g/4}' r='${g/5}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/><circle cx='${g/2}' cy='${g/2}' r='${g/5}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/><circle cx='${g/4}' cy='${g*3/4}' r='${g/5}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/><circle cx='${g*3/4}' cy='${g*3/4}' r='${g/5}' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.05}'/></svg>`),
      size: g,
    }
  },
  cobblestone: (o) => {
    const g = o.g || 32
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><rect x='1' y='1' width='${g/2-2}' height='${g/2-2}' rx='3' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><rect x='${g/2+1}' y='1' width='${g/2-2}' height='${g/2-2}' rx='3' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><rect x='1' y='${g/2+1}' width='${g/2-2}' height='${g/2-2}' rx='3' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/><rect x='${g/2+1}' y='${g/2+1}' width='${g/2-2}' height='${g/2-2}' rx='3' fill='none' stroke='${o.c||'#000'}' stroke-width='${o.w||0.5}' opacity='${o.int||0.08}'/></svg>`),
      size: g,
    }
  },
  shingle: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g/2}'><rect x='0' y='0' width='${g/3-2}' height='${g/4-2}' rx='1' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/><rect x='${g/3+1}' y='0' width='${g/3-2}' height='${g/4-2}' rx='1' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/><rect x='1' y='${g/4}' width='${g/3-2}' height='${g/4-2}' rx='1' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.4}'/><rect x='${g/2+1}' y='${g/4}' width='${g/3-2}' height='${g/4-2}' rx='1' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.4}'/></svg>`),
      size: g,
    }
  },
  parquet: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><rect x='0' y='0' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${o.int||0.05}'/><rect x='${g/2}' y='0' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${o.int||0.05}'/><rect x='${g/4}' y='${g/2}' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${o.int||0.05}'/><rect x='${g*3/4}' y='${g/2}' width='${g/4}' height='${g/2}' fill='${o.c||'#000'}' opacity='${o.int||0.05}'/></svg>`),
      size: g,
    }
  },
  tartan: (o) => {
    const g = o.g || 36
    return {
      url: svg(`<svg viewBox='0 0 ${g} ${g}'><rect x='0' y='0' width='${g/4}' height='${g}' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/><rect x='${g*3/4}' y='0' width='${g/4}' height='${g}' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/><rect x='0' y='0' width='${g}' height='${g/4}' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/><rect x='0' y='${g*3/4}' width='${g}' height='${g/4}' fill='${o.c||'#000'}' opacity='${(o.int||0.06)*0.5}'/></svg>`),
      size: g,
    }
  },
}

const CSS_PATTERNS = {
  paper: (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, ${o.c||'rgba(188,108,37,0.015)'} 1px, ${o.c||'rgba(188,108,37,0.015)'} 2px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, ${o.c2||'rgba(74,55,40,0.008)'} 2px, ${o.c2||'rgba(74,55,40,0.008)'} 3px)
    `,
  }),
  grid: (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent ${sz(o.g,24)}px, ${o.c||'rgba(74,55,40,0.04)'} ${sz(o.g,24)}px, ${o.c||'rgba(74,55,40,0.04)'} ${sz(o.g,24)+1}px),
      repeating-linear-gradient(90deg, transparent, transparent ${sz(o.g,24)}px, ${o.c||'rgba(74,55,40,0.04)'} ${sz(o.g,24)}px, ${o.c||'rgba(74,55,40,0.04)'} ${sz(o.g,24)+1}px)
    `,
  }),
  'grid-fine': (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent ${sz(o.g,8)}px, ${o.c||'rgba(74,55,40,0.025)'} ${sz(o.g,8)}px, ${o.c||'rgba(74,55,40,0.025)'} ${sz(o.g,8)+0.5}px),
      repeating-linear-gradient(90deg, transparent, transparent ${sz(o.g,8)}px, ${o.c||'rgba(74,55,40,0.025)'} ${sz(o.g,8)}px, ${o.c||'rgba(74,55,40,0.025)'} ${sz(o.g,8)+0.5}px)
    `,
  }),
  'stripe-css': (o) => ({
    css: `repeating-linear-gradient(${o.a||-45}deg, transparent, transparent ${o.s||8}px, ${o.c||'rgba(74,55,40,0.04)'} ${o.s||8}px, ${o.c||'rgba(74,55,40,0.04)'} ${(o.s||8)+(o.w||2)}px)`,
  }),
  'stripe-h': (o) => ({
    css: `repeating-linear-gradient(0deg, transparent, transparent ${o.s||6}px, ${o.c||'rgba(74,55,40,0.04)'} ${o.s||6}px, ${o.c||'rgba(74,55,40,0.04)'} ${(o.s||6)+(o.w||1)}px)`,
  }),
  'stripe-v': (o) => ({
    css: `repeating-linear-gradient(90deg, transparent, transparent ${o.s||6}px, ${o.c||'rgba(74,55,40,0.04)'} ${o.s||6}px, ${o.c||'rgba(74,55,40,0.04)'} ${(o.s||6)+(o.w||1)}px)`,
  }),
  vintage: (o) => ({
    css: `
      radial-gradient(ellipse at 50% 50%, transparent 60%, ${o.c||'rgba(188,108,37,0.03)'} 100%),
      linear-gradient(180deg, ${o.c2||'rgba(226,114,91,0.02)'} 0%, transparent 30%, transparent 70%, ${o.c3||'rgba(74,55,40,0.03)'} 100%)
    `,
  }),
  vignette: (o) => ({
    css: `radial-gradient(ellipse at 50% 50%, transparent ${o.in||60}%, ${o.c||'rgba(74,55,40,0.04)'} 100%)`,
  }),
  lightleak: (o) => ({
    css: `linear-gradient(${o.a||45}deg, ${o.c||'rgba(226,114,91,0.015)'} 0%, transparent 20%, transparent 80%, ${o.c2||'rgba(188,108,37,0.02)'} 100%)`,
  }),
  edgeburn: (o) => ({
    css: `radial-gradient(ellipse at 50% 50%, transparent 40%, ${o.c||'rgba(74,55,40,0.025)'} 70%, ${o.c2||'rgba(44,44,44,0.04)'} 100%)`,
  }),
  spotlight: (o) => ({
    css: `radial-gradient(ellipse at ${o.p||'30% 30%'}, transparent 30%, ${o.c||'rgba(74,55,40,0.015)'} 100%)`,
  }),
  crossfade: (o) => ({
    css: `
      linear-gradient(135deg, ${o.c||'rgba(226,114,91,0.02)'} 0%, transparent 30%, transparent 70%, ${o.c2||'rgba(188,108,37,0.02)'} 100%),
      linear-gradient(225deg, transparent 40%, ${o.c3||'rgba(74,55,40,0.015)'} 100%)
    `,
  }),
  'stripe-fat': (o) => ({
    css: `repeating-linear-gradient(0deg, transparent, transparent ${o.s||30}px, ${o.c||'rgba(74,55,40,0.03)'} ${o.s||30}px, ${o.c||'rgba(74,55,40,0.03)'} ${(o.s||30)+(o.w||4)}px)`,
  }),
  'stripe-fat-h': (o) => ({
    css: `repeating-linear-gradient(90deg, transparent, transparent ${o.s||30}px, ${o.c||'rgba(74,55,40,0.03)'} ${o.s||30}px, ${o.c||'rgba(74,55,40,0.03)'} ${(o.s||30)+(o.w||4)}px)`,
  }),
  plaid: (o) => ({
    css: `
      repeating-linear-gradient(0deg, transparent, transparent ${o.s||20}px, ${o.c||'rgba(74,55,40,0.025)'} ${o.s||20}px, ${o.c||'rgba(74,55,40,0.025)'} ${(o.s||20)+(o.w||2)}px),
      repeating-linear-gradient(90deg, transparent, transparent ${o.s||20}px, ${o.c2||'rgba(188,108,37,0.02)'} ${o.s||20}px, ${o.c2||'rgba(188,108,37,0.02)'} ${(o.s||20)+(o.w||2)}px)
    `,
  }),
  'gradient-noise': (o) => ({
    css: `
      repeating-linear-gradient(45deg, transparent, transparent ${o.s||3}px, ${o.c||'rgba(74,55,40,0.012)'} ${o.s||3}px, ${o.c||'rgba(74,55,40,0.012)'} ${(o.s||3)+1}px),
      repeating-linear-gradient(-45deg, transparent, transparent ${o.s||3}px, ${o.c2||'rgba(188,108,37,0.008)'} ${o.s||3}px, ${o.c2||'rgba(188,108,37,0.008)'} ${(o.s||3)+1}px)
    `,
  }),
}

const CSS_KEYS = Object.keys(CSS_PATTERNS)
const SVG_KEYS = Object.keys(SVG)

function opts(config) {
  return {
    c: config.color || (CSS_KEYS.includes(config.type) ? null : '#000'),
    c2: config.color2 || null,
    c3: config.color3 || null,
    int: config.intensity != null ? config.intensity : 0.08,
    g: config.grid || null,
    r: config.radius || null,
    w: config.stroke || null,
    f: config.frequency || null,
    oct: config.octaves || null,
    s: config.space || null,
    a: config.angle || null,
    in: config.inner || null,
    p: config.position || null,
  }
}

const ALL_KEYS = [...SVG_KEYS, ...CSS_KEYS]

export function useTexture(options = {}) {
  const config = reactive({
    type: 'noise',
    opacity: 1,
    blendMode: null,
    scale: 1,
    intensity: 0.08,
    color: null,
    color2: null,
    color3: null,
    grid: null,
    stroke: null,
    radius: null,
    frequency: null,
    octaves: null,
    space: null,
    angle: null,
    inner: null,
    ...options,
  })

  const isSvg = computed(() => SVG_KEYS.includes(config.type))
  const isCss = computed(() => CSS_KEYS.includes(config.type))

  const generator = computed(() => SVG[config.type] || CSS_PATTERNS[config.type])

  const style = computed(() => {
    const gen = generator.value
    if (!gen) return { opacity: 0 }

    const o = opts(config)
    const r = gen(o)

    const result = { willChange: 'transform' }

    if (isSvg.value) {
      result.backgroundImage = r.url
      result.backgroundRepeat = 'repeat'
      const s = (r.size || 64) * (config.scale || 1)
      result.backgroundSize = `${s}px ${s}px`
    } else if (isCss.value) {
      result.background = r.css
    }

    result.opacity = config.opacity
    if (config.blendMode) result.mixBlendMode = config.blendMode
    result.pointerEvents = 'none'

    return result
  })

  function setType(type) {
    if (ALL_KEYS.includes(type)) config.type = type
  }

  function setOptions(o) {
    for (const k of Object.keys(o)) {
      if (k in config) config[k] = o[k]
    }
  }

  return { config, style, isSvg, isCss, setType, setOptions, types: ALL_KEYS }
}
