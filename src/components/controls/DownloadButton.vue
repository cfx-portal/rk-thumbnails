<template>
  <button
    @click="downloadThumbnail"
    :disabled="isDownloading"
    class="w-full p-3 rounded-md bg-[var(--button-primary-bg-color)] hover:bg-[var(--button-primary-hover-bg-color)] text-[var(--input-text-color)] font-['Manrope'] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    <i class="fas fa-download"></i>
    {{ isDownloading ? 'Downloading...' : 'Download Thumbnail' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import html2canvas from 'html2canvas'

const isDownloading = ref(false)

async function fetchAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { mode: 'cors' })
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function waitForImageLoad(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    if (img.complete && img.naturalWidth > 0) {
      resolve()
      return
    }
    img.onload = () => resolve()
    img.onerror = () => resolve()
  })
}

async function downloadThumbnail() {
  if (isDownloading.value) return

  isDownloading.value = true

  try {
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'none'
    }

    const thumbnail = document.getElementById('thumbnail') as HTMLElement
    if (!thumbnail) {
      throw new Error('Thumbnail element not found')
    }

    // Convert all images to base64 data URLs via fetch to avoid CORS issues
    const images = thumbnail.querySelectorAll('img')
    const originalSrcs: { img: HTMLImageElement; src: string }[] = []

    for (const img of images) {
      if (img.src && !img.src.startsWith('data:')) {
        const origSrc = img.src
        originalSrcs.push({ img, src: origSrc })

        const dataUrl = await fetchAsDataUrl(origSrc)
        if (dataUrl) {
          img.src = dataUrl
          await waitForImageLoad(img)
        }
      }
    }

    // Small delay to ensure DOM has updated
    await new Promise(r => setTimeout(r, 100))

    let canvas: HTMLCanvasElement
    try {
      canvas = await html2canvas(thumbnail, {
        useCORS: true,
        scale: 1,
        backgroundColor: null,
        logging: false,
        removeContainer: true
      })
    } catch {
      // Fallback: allow tainted canvas
      canvas = await html2canvas(thumbnail, {
        allowTaint: true,
        scale: 1,
        backgroundColor: null,
        logging: false,
        removeContainer: true
      })
    }

    // Restore original image sources
    for (const { img, src } of originalSrcs) {
      img.src = src
    }

    const link = document.createElement('a')
    link.download = 'thumbnail.png'
    try {
      link.href = canvas.toDataURL('image/png')
    } catch {
      // If canvas is tainted, try blob approach
      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/png')
      )
      if (blob) {
        link.href = URL.createObjectURL(blob)
      } else {
        throw new Error('Could not export canvas')
      }
    }
    link.click()

    if (controls) {
      controls.style.display = 'grid'
    }
  } catch (error) {
    console.error('Download failed:', error)
    const controls = document.querySelector('.controls') as HTMLElement
    if (controls) {
      controls.style.display = 'grid'
    }
  } finally {
    isDownloading.value = false
  }
}
</script>
