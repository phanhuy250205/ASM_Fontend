import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref(JSON.parse(localStorage.getItem('cart')) || [])

  // Getters
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  // Số lượng các sản phẩm khác nhau trong giỏ hàng
  const itemCount = computed(() => {
    return items.value.length
  })

  // Actions
  function addToCart(productData) {
    const existingItem = items.value.find(item => item.id === productData.id)
    
    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng
      existingItem.quantity = productData.quantity
    } else {
      // Nếu là sản phẩm mới, thêm vào giỏ hàng
      items.value.push(productData)
    }
    
    saveToLocalStorage()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        saveToLocalStorage()
      }
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  // Clear cart
  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }

  return {
    items,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
})