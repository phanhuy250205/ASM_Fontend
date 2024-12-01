import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function login(userData) {
    // Simulate API call
    const fakeToken = 'fake-jwt-token-' + Math.random()
    user.value = userData
    token.value = fakeToken
    
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', fakeToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
})