import { defineStore } from 'pinia'

export interface AuthState {
  token: string
  expiresAt: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
    expiresAt: null,
  }),
  getters: {
    isLoggedIn(state): boolean {
      if (!state.token || typeof state.token !== 'string' || !state.token.trim()) {
        return false
      }
      return state.expiresAt == null || (Number.isFinite(state.expiresAt) && state.expiresAt > Date.now())
    },
  },
  actions: {
    setToken(token: string, expiresAt?: number | null) {
      this.token = token
      this.expiresAt = expiresAt ?? null
    },
    clearAuth() {
      this.token = ''
      this.expiresAt = null
    },
    ensureValid() {
      if (!this.isLoggedIn) {
        this.clearAuth()
        return false
      }
      return true
    },
  },
  persist: true,
})
