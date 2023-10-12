// @ts-check
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'user',

  state: () => ({
    token: '1234',
  }),
})
