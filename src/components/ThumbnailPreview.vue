<template>
  <div
    id="thumbnail"
    ref="thumbnailRef"
    class="w-[1600px] h-[800px] bg-[var(--thumbnail-bg-color)] relative overflow-hidden p-[60px_80px] box-border transition-colors duration-300"
    :style="backgroundStyle"
  >
    <div v-if="!isTextOnly" id="default-layout" class="flex justify-between items-center w-full h-full">
      <div class="left-panel flex flex-col justify-center h-full w-1/2 relative -left-10">
        <div class="handle text-[var(--thumbnail-secondary-text-color)] text-2xl mb-4">{{ configStore.handleText }}</div>
        <div class="title-container">
          <div class="flex items-center gap-5">
            <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo" class="w-[70px] h-[70px] object-contain" />
            <h1 class="title text-[60px] font-extrabold leading-[1.1] m-0 text-[var(--thumbnail-main-text-color)]">{{ configStore.titleText }}</h1>
          </div>
          <div class="reflection-container flex items-center gap-5 scale-y-[-1] mt-2 opacity-40" style="-webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent); mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);">
            <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo Reflection" class="w-[70px] h-[70px] object-contain" />
            <h1 class="reflection text-[60px] font-extrabold leading-[1.1] m-0 text-[var(--thumbnail-main-text-color)]">{{ configStore.titleText }}</h1>
          </div>
        </div>
      </div>
      <div class="right-panel flex flex-col items-center justify-start h-full w-1/2 relative -right-10">
        <div class="right-panel-header text-[var(--thumbnail-secondary-text-color)] text-xl font-bold mb-6 tracking-[2px] text-center">{{ configStore.rightHeaderText }}</div>
        <div class="flex flex-col items-center w-[95%] flex-grow">
          <div class="ui-card bg-transparent border-none rounded-2xl flex justify-center items-center box-border overflow-hidden" :style="{ width: configStore.imageScale + '%', height: configStore.imageScale + '%' }">
            <img
              v-if="configStore.imageUrl && !isTextOnly"
              :src="configStore.imageUrl"
              alt="Image Preview"
              class="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div
            v-if="configStore.imageUrl && !isTextOnly"
            class="ui-card-reflection overflow-hidden mt-1 opacity-40 scale-y-[-1]"
            :style="{ width: configStore.imageScale + '%', height: (configStore.imageScale * 0.35) + '%', '-webkit-mask-image': 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', 'mask-image': 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }"
          >
            <img
              :src="configStore.imageUrl"
              alt="Image Reflection"
              class="w-full h-full object-cover object-top rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="isTextOnly" id="text-only-layout" class="w-full h-full relative">
      <div id="text-only-header" class="absolute top-[40px] left-1/2 transform -translate-x-1/2">
        <div class="border border-[var(--thumbnail-secondary-text-color)] px-8 py-3">
          <span class="text-[16px] font-bold tracking-[6px] uppercase text-[var(--thumbnail-secondary-text-color)]">{{ configStore.rightHeaderText }}</span>
        </div>
      </div>
      <div id="text-only-main-content" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full text-center">
        <div class="flex items-center justify-center gap-6">
          <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo" class="w-[80px] h-[80px] object-contain" />
          <h1 id="text-only-title" class="text-[73px] font-extrabold leading-[1.1] text-[var(--thumbnail-main-text-color)] m-0">{{ configStore.titleText }}</h1>
        </div>
        <div class="reflection-container flex items-center justify-center gap-6 scale-y-[-1] mt-2 opacity-40" style="-webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent); mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);">
          <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo Reflection" class="w-[80px] h-[80px] object-contain" />
          <h1 id="text-only-reflection" class="text-[73px] font-extrabold leading-[1.1] text-[var(--thumbnail-main-text-color)] m-0">{{ configStore.titleText }}</h1>
        </div>
      </div>
      <div id="text-only-footer" class="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-[var(--thumbnail-secondary-text-color)]">
        <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo" class="w-[28px] h-[28px] object-contain" />
        <span class="text-lg font-medium">{{ configStore.footerLeftText }}</span>
        <span class="text-lg opacity-60 mx-1">|</span>
        <img v-if="configStore.footerRightLogoUrl" :src="configStore.footerRightLogoUrl" alt="Logo" class="w-[28px] h-[28px] object-contain" />
        <span class="text-lg font-medium">{{ configStore.footerRightText }}</span>
      </div>
    </div>

    <div v-if="!isTextOnly" class="footer-text absolute bottom-[15px] left-[75%] transform -translate-x-1/2 flex items-center gap-4 text-[var(--thumbnail-secondary-text-color)]">
      <img v-if="configStore.logoUrl" :src="configStore.logoUrl" alt="Logo" class="w-[24px] h-[24px] object-contain" />
      <span class="text-lg font-bold tracking-[4px]">{{ configStore.footerText }}</span>
    </div>

    <!-- Grain overlay -->
    <canvas
      v-if="configStore.showGrain"
      ref="grainCanvas"
      class="absolute inset-0 w-full h-full pointer-events-none z-10"
      :style="{ opacity: configStore.grainOpacity }"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useConfigStore } from '../stores/configStore'

interface Props {
  isTextOnly: boolean
  backgroundStyle: any
}

defineProps<Props>()

const {
  configStore
} = useConfigStore()

const thumbnailRef = ref<HTMLElement>()
const grainCanvas = ref<HTMLCanvasElement>()

function generateGrain() {
  const canvas = grainCanvas.value
  if (!canvas) return

  canvas.width = 1600
  canvas.height = 800

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const imageData = ctx.createImageData(1600, 800)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255
    data[i] = value
    data[i + 1] = value
    data[i + 2] = value
    data[i + 3] = 255
  }

  ctx.putImageData(imageData, 0, 0)
}

watch(() => configStore.showGrain, async (show) => {
  if (show) {
    await nextTick()
    generateGrain()
  }
})

onMounted(() => {
  if (configStore.showGrain) {
    nextTick(() => generateGrain())
  }
})
</script>
