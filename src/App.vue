<script setup lang="ts">
import { onMounted } from 'vue'
import { useThumbnailStore } from './stores/thumbnailStore'
import ThumbnailPreview from './components/ThumbnailPreview.vue'
import ThumbnailControls from './components/controls/ThumbnailControls.vue'

const {
  selectedTheme,
  showGrid,
  isTextOnly,
  backgroundStyle,
  applyTheme,
  themes
} = useThumbnailStore()

onMounted(() => {
  applyTheme()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-[var(--page-bg-color)] text-[var(--input-text-color)] font-['Manrope'] flex flex-col items-center justify-center p-8 gap-8 transition-colors duration-300">
    <ThumbnailPreview
      :is-text-only="isTextOnly"
      :background-style="backgroundStyle"
    />
    
    <ThumbnailControls
      v-model:selected-theme="selectedTheme"
      v-model:show-grid="showGrid"
      v-model:is-text-only="isTextOnly"
      :themes="themes"
      @theme-change="applyTheme"
    />
  </div>
</template>

<style scoped>

</style>
