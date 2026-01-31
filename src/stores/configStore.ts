import { reactive } from 'vue'

export const configStore = reactive({
  handleText: '@rk.dev',
  titleText: 'Input Data',
  rightHeaderText: 'Input Data',
  footerText: 'Input Data',
  footerLeftText: 'Invite Only',
  footerRightText: 'Not Affiliated With Cfx.re/Rockstar Games.',
  imageUrl: '',
  logoUrl: '',
  footerRightLogoUrl: '',
  gradientEnabled: false,
  gradientColorStart: '#1a1e2a',
  gradientColorEnd: '#2a1020',
  imageScale: 100,
  showGrain: false,
  grainOpacity: 0.15
})

export function useConfigStore() {
  return {
    configStore
  }
}
