import { ref, computed } from 'vue'
import { themes, defaultTheme } from './savedThemes'
import { configStore } from './configStore'

export function useThumbnailStore() {
  const selectedTheme = ref(defaultTheme)
  const showGrid = ref(true)
  const isTextOnly = ref(false)

  const backgroundStyle = computed(() => {
    const centerGlow = 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'

    const layers: string[] = [centerGlow]
    const sizes: string[] = ['auto']

    if (showGrid.value) {
      const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--thumbnail-grid-color').trim() || 'rgba(255, 255, 255, 0.15)'
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><circle cx="12.5" cy="12.5" r="1.5" fill="${gridColor}"/></svg>`
      const encoded = btoa(svg)
      layers.push(`url("data:image/svg+xml;base64,${encoded}")`)
      sizes.push('25px 25px')
    }

    if (configStore.gradientEnabled) {
      layers.push(`linear-gradient(to bottom, ${configStore.gradientColorStart}, ${configStore.gradientColorEnd})`)
      sizes.push('auto')
    }

    return {
      backgroundImage: layers.join(', '),
      backgroundSize: sizes.join(', '),
      backgroundColor: configStore.gradientEnabled ? 'transparent' : undefined
    }
  })

  function applyTheme() {
    const theme = themes[selectedTheme.value]
    if (!theme) return

    for (const [key, value] of Object.entries(theme.colors)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  return {
    selectedTheme,
    showGrid,
    isTextOnly,
    backgroundStyle,
    applyTheme,
    themes
  }
}
