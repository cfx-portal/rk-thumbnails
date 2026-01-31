<template>
  <div class="control-group flex flex-col">
    <label for="color-scheme-select" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
      <i class="fas fa-palette mr-2"></i>Color Scheme
    </label>
    <div class="theme-selector relative">
      <button
        @click="toggleDropdown"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope'] appearance-none bg-[url('data:image/svg+xml,%3csvg_xmlns=%27http://www.w3.org/2000/svg%27_fill=%27none%27_viewBox=%270_0_20_20%27%3e%3cpath_stroke=%27%23a9b1d6%27_stroke-linecap=%27round%27_stroke-linejoin=%27round%27_stroke-width=%271.5%27_d=%27M6_8l4_4_4-4%27/%3e%3c/svg%3e')] bg-[right_0.5rem_center_1.5em_1.5em] bg-no-repeat pr-10 text-left"
      >
        {{ selectedThemeName }}
      </button>
      
      <div v-if="isDropdownOpen" class="absolute bottom-full left-0 right-0 mb-1 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
        <div v-for="(category, categoryName) in categorizedThemes" :key="categoryName" class="theme-category">
          <div class="category-header px-3 py-2 text-xs font-semibold text-[var(--thumbnail-secondary-text-color)] bg-[var(--controls-bg-color)] border-b border-[var(--input-border-color)]">
            {{ categoryName }}
          </div>
          <div class="category-themes">
            <button
              v-for="(theme, key) in category"
              :key="key"
              @click="selectTheme(key)"
              class="w-full px-3 py-2 text-left hover:bg-[var(--button-primary-bg-color)] transition-colors duration-200 flex items-center gap-3"
              :class="{ 'bg-[var(--button-primary-hover-bg-color)]': key === selectedTheme }"
            >
              <div class="theme-preview w-4 h-4 rounded border border-[var(--input-border-color)]" :style="{ backgroundColor: theme.colors['--thumbnail-bg-color'] }"></div>
              <span class="text-[var(--input-text-color)]">{{ theme.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Theme } from '../../stores/savedThemes'

interface Props {
  selectedTheme: string
  themes: Record<string, Theme>
}

interface Emits {
  (e: 'update:selectedTheme', value: string): void
  (e: 'themeChange', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDropdownOpen = ref(false)

const categorizedThemes = computed(() => {
  const categories: Record<string, Record<string, Theme>> = {
    'Dark': {},
    'Light': {},
    'Colorful': {}
  }
  
  for (const [key, theme] of Object.entries(props.themes)) {
    if (theme.category) {
      categories[theme.category][key] = theme
    } else {
      categories['Dark'][key] = theme
    }
  }
  
  return categories
})

const selectedThemeName = computed(() => {
  return props.themes[props.selectedTheme]?.name || 'Select Theme'
})



function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectTheme(themeKey: string) {
  emit('update:selectedTheme', themeKey)
  emit('themeChange', themeKey)
  isDropdownOpen.value = false
}

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-selector')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-selector {
  position: relative;
}

.theme-category:not(:last-child) {
  border-bottom: 1px solid var(--input-border-color);
}

.category-header {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.theme-preview {
  flex-shrink: 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--input-bg-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--button-primary-bg-color);
  border-radius: 4px;
  transition: background-color 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--button-primary-hover-bg-color);
}
</style>
