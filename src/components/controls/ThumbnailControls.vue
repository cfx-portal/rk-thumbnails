<template>
  <div class="controls grid grid-cols-4 gap-4 bg-[var(--controls-bg-color)] p-6 rounded-xl w-[1600px] box-border transition-colors duration-300">
    <div class="control-group flex flex-col">
      <label for="handle-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-at mr-2"></i>Handle Text
      </label>
      <input
        id="handle-text"
        type="text"
        :value="configStore.handleText"
        @input="updateHandleText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter handle text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label for="title-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-heading mr-2"></i>Title Text
      </label>
      <input
        id="title-text"
        type="text"
        :value="configStore.titleText"
        @input="updateTitleText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter title text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label for="right-header-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-align-right mr-2"></i>Right Header Text
      </label>
      <input
        id="right-header-text"
        type="text"
        :value="configStore.rightHeaderText"
        @input="updateRightHeaderText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter right header text"
      />
    </div>

    <div class="control-group flex flex-col">
      <label for="footer-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-shoe-prints mr-2"></i>Footer Text
      </label>
      <input
        id="footer-text"
        type="text"
        :value="configStore.footerText"
        @input="updateFooterText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter footer text"
      />
    </div>

    <div class="control-group flex flex-col col-span-2">
      <label for="image-url" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-image mr-2"></i>Image URL
      </label>
      <input
        id="image-url"
        type="text"
        :value="configStore.imageUrl"
        @input="updateImageUrl"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter image URL"
      />
    </div>
    <div class="control-group flex flex-col col-span-2">
      <label for="image-scale" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-expand mr-2"></i>Image Scale ({{ configStore.imageScale }}%)
      </label>
      <input
        id="image-scale"
        type="range"
        min="20"
        max="100"
        :value="configStore.imageScale"
        @input="updateImageScale"
        class="w-full h-2 rounded-md bg-[var(--input-bg-color)] cursor-pointer accent-[var(--button-primary-bg-color)]"
      />
    </div>
    <div class="control-group flex flex-col col-span-2">
      <label for="logo-url" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-star mr-2"></i>Logo URL
      </label>
      <input
        id="logo-url"
        type="text"
        :value="configStore.logoUrl"
        @input="updateLogoUrl"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter logo URL"
      />
    </div>
    <div class="control-group flex flex-col col-span-2">
      <label for="footer-right-logo-url" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-star mr-2"></i>Footer Right Logo URL
      </label>
      <input
        id="footer-right-logo-url"
        type="text"
        :value="configStore.footerRightLogoUrl"
        @input="updateFooterRightLogoUrl"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter footer right logo URL"
      />
    </div>
    <div class="control-group flex flex-col">
      <label for="footer-left-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-align-left mr-2"></i>Footer Left Text
      </label>
      <input
        id="footer-left-text"
        type="text"
        :value="configStore.footerLeftText"
        @input="updateFooterLeftText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter footer left text"
      />
    </div>
    <div class="control-group flex flex-col">
      <label for="footer-right-text" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-align-right mr-2"></i>Footer Right Text
      </label>
      <input
        id="footer-right-text"
        type="text"
        :value="configStore.footerRightText"
        @input="updateFooterRightText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        placeholder="Enter footer right text"
      />
    </div>
    <ColorScheme
      :selected-theme="selectedTheme"
      :themes="themes"
      @update:selected-theme="updateSelectedTheme"
      @theme-change="updateTheme"
    />
    <div class="control-group flex flex-col">
      <label for="grid-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Show Grid</label>
      <input 
        type="checkbox" 
        id="grid-toggle" 
        :checked="showGrid"
        @change="updateShowGrid"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div class="control-group flex flex-col">
      <label for="gradient-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Gradient BG</label>
      <input
        type="checkbox"
        id="gradient-toggle"
        :checked="configStore.gradientEnabled"
        @change="updateGradientEnabled"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div v-if="configStore.gradientEnabled" class="control-group flex flex-col">
      <label for="gradient-start" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-palette mr-2"></i>Gradient Start
      </label>
      <input
        id="gradient-start"
        type="color"
        :value="configStore.gradientColorStart"
        @input="updateGradientColorStart"
        class="w-full h-10 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] cursor-pointer"
      />
    </div>
    <div v-if="configStore.gradientEnabled" class="control-group flex flex-col">
      <label for="gradient-end" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-palette mr-2"></i>Gradient End
      </label>
      <input
        id="gradient-end"
        type="color"
        :value="configStore.gradientColorEnd"
        @input="updateGradientColorEnd"
        class="w-full h-10 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] cursor-pointer"
      />
    </div>
    <div class="control-group flex flex-col">
      <label for="grain-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Show Grain</label>
      <input
        type="checkbox"
        id="grain-toggle"
        :checked="configStore.showGrain"
        @change="updateShowGrain"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div v-if="configStore.showGrain" class="control-group flex flex-col">
      <label for="grain-opacity" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        <i class="fas fa-adjust mr-2"></i>Grain ({{ Math.round(configStore.grainOpacity * 100) }}%)
      </label>
      <input
        id="grain-opacity"
        type="range"
        min="0.01"
        max="0.5"
        step="0.01"
        :value="configStore.grainOpacity"
        @input="updateGrainOpacity"
        class="w-full h-2 rounded-md bg-[var(--input-bg-color)] cursor-pointer accent-[var(--button-primary-bg-color)]"
      />
    </div>
    <div class="control-group flex flex-col">
      <label for="disable-image-toggle" class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Disable Image</label>
      <input 
        type="checkbox" 
        id="disable-image-toggle" 
        :checked="isTextOnly"
        @change="updateIsTextOnly"
        class="appearance-none relative w-6 h-6 bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md cursor-pointer mt-2 inline-block align-middle checked:bg-[var(--button-primary-bg-color)] checked:border-[var(--button-primary-bg-color)] checked:after:content-[''] checked:after:absolute checked:after:top-1 checked:after:left-2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-solid checked:after:border-[var(--input-text-color)_0_3px_3px_0] checked:after:rotate-45"
      >
    </div>
    <div class="control-group flex flex-col">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">Download</label>
      <DownloadButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadButton from './DownloadButton.vue'
import ColorScheme from './ColorScheme.vue'
import type { Theme } from '../../stores/savedThemes'
import { useConfigStore } from '../../stores/configStore'

interface Props {
  selectedTheme: string
  showGrid: boolean
  isTextOnly: boolean
  themes: Record<string, Theme>
}

interface Emits {
  (e: 'update:selectedTheme', value: string): void
  (e: 'update:showGrid', value: boolean): void
  (e: 'update:isTextOnly', value: boolean): void
  (e: 'themeChange', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const {
  configStore
} = useConfigStore()

function updateHandleText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.handleText = target.value
}

function updateTitleText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.titleText = target.value
}

function updateRightHeaderText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.rightHeaderText = target.value
}

function updateFooterText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.footerText = target.value
}

function updateImageUrl(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.imageUrl = target.value
}

function updateLogoUrl(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.logoUrl = target.value
}

function updateFooterLeftText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.footerLeftText = target.value
}

function updateFooterRightText(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.footerRightText = target.value
}

function updateFooterRightLogoUrl(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.footerRightLogoUrl = target.value
}

function updateGradientEnabled(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.gradientEnabled = target.checked
}

function updateGradientColorStart(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.gradientColorStart = target.value
}

function updateGradientColorEnd(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.gradientColorEnd = target.value
}

function updateImageScale(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.imageScale = parseInt(target.value)
}

function updateShowGrain(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.showGrain = target.checked
}

function updateGrainOpacity(event: Event) {
  const target = event.target as HTMLInputElement
  configStore.grainOpacity = parseFloat(target.value)
}

function updateSelectedTheme(themeKey: string) {
  emit('update:selectedTheme', themeKey)
}

function updateTheme(themeKey: string) {
  emit('themeChange', themeKey)
}

function updateShowGrid(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:showGrid', target.checked)
}

function updateIsTextOnly(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:isTextOnly', target.checked)
}
</script>

<style scoped>
.controls select::-webkit-scrollbar {
  width: 8px;
}

.controls select::-webkit-scrollbar-track {
  background: var(--input-bg-color);
  border-radius: 4px;
}

.controls select::-webkit-scrollbar-thumb {
  background: var(--button-primary-bg-color);
  border-radius: 4px;
  transition: background-color 0.2s;
}

.controls select::-webkit-scrollbar-thumb:hover {
  background: var(--button-primary-hover-bg-color);
}

.controls select {
  scrollbar-width: thin;
  scrollbar-color: var(--button-primary-bg-color) var(--input-bg-color);
}

.controls select option {
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls select option:hover {
  background-color: var(--button-primary-bg-color);
}

.controls select option:checked {
  background-color: var(--button-primary-hover-bg-color);
  font-weight: 600;
}
</style>
