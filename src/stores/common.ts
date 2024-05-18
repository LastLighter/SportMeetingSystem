import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginData } from '@/api/manage/type'

export const useCommonStore = defineStore('common', () => {
  const loginData = ref<LoginData>()
  let notiShow = ref<boolean>(false)
  let notiTitle = ref<string>('修改昵称')
  let labelValue = ref<string>('昵称')
  try {
    loginData.value = JSON.parse(localStorage.getItem('userInfo') || '{}') as LoginData
  } catch (err) {
  }

  return { loginData, notiShow,notiTitle,labelValue }
})
