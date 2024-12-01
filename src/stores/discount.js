import { defineStore } from 'pinia'
import { ref } from 'vue'

// Danh sách mã giảm giá có sẵn
const availableDiscounts = {
  'WELCOME10': { code: 'WELCOME10', value: 0.1, type: 'percent' },
  'SAVE20': { code: 'SAVE20', value: 0.2, type: 'percent' },
  'MINUS50K': { code: 'MINUS50K', value: 50000, type: 'fixed' }
}

export const useDiscountStore = defineStore('discount', () => {
  const appliedDiscount = ref(null)
  
  // Áp dụng mã giảm giá
  function applyDiscount(code) {
    const discount = availableDiscounts[code.toUpperCase()]
    if (discount) {
      appliedDiscount.value = discount
      return { success: true, message: 'Áp dụng mã giảm giá thành công!' }
    }
    return { success: false, message: 'Mã giảm giá không hợp lệ!' }
  }
  
  // Tính số tiền được giảm
  function calculateDiscount(subtotal) {
    if (!appliedDiscount.value) return 0
    
    if (appliedDiscount.value.type === 'percent') {
      return subtotal * appliedDiscount.value.value
    } else {
      return Math.min(appliedDiscount.value.value, subtotal)
    }
  }
  
  // Xóa mã giảm giá đã áp dụng
  function removeDiscount() {
    appliedDiscount.value = null
  }
  
  return {
    appliedDiscount,
    applyDiscount,
    calculateDiscount,
    removeDiscount
  }
})