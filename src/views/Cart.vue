<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
    
    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Danh sách sản phẩm -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Chọn tất cả -->
        <div class="bg-white rounded-xl shadow-md p-4 flex items-center">
          <label class="flex items-center space-x-3">
            <input 
              type="checkbox"
              v-model="selectAll"
              @change="handleSelectAll"
              class="w-5 h-5 text-black rounded border-gray-300 focus:ring-black"
            >
            <span class="text-gray-700 font-medium">Chọn tất cả</span>
          </label>
        </div>

        <!-- Danh sách sản phẩm -->
        <div v-for="item in cartStore.items" :key="item.id" 
          class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <!-- Checkbox chọn sản phẩm -->
            <input 
              type="checkbox"
              v-model="selectedItems"
              :value="item.id"
              class="w-5 h-5 text-black rounded border-gray-300 focus:ring-black"
            >
            
            <!-- Thông tin sản phẩm -->
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-800">{{ item.name }}</h3>
              <p class="text-gray-600">{{ formatPrice(item.price) }}</p>
              <div class="flex items-center space-x-2 mt-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  -
                </button>
                <span class="w-12 text-center">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  +
                </button>
                <button 
                  @click="removeFromCart(item.id)"
                  class="ml-4 text-red-500 hover:text-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tổng giỏ hàng và mã giảm giá -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-bold mb-6">Tổng đơn hàng</h2>
        
        <!-- Phần mã giảm giá -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-3">Mã giảm giá</h3>
          <div class="flex space-x-2">
            <input 
              v-model="discountCode"
              type="text"
              placeholder="Nhập mã giảm giá"
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            >
            <button 
              @click="applyDiscountCode"
              class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Áp dụng
            </button>
          </div>
          <!-- Hiển thị mã giảm giá đã áp dụng -->
          <div v-if="discountStore.appliedDiscount" class="mt-2 text-sm">
            <p class="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Đã áp dụng mã: {{ discountStore.appliedDiscount.code }}
              <button 
                @click="discountStore.removeDiscount()"
                class="ml-2 text-red-500 hover:text-red-600"
              >
                ×
              </button>
            </p>
          </div>
        </div>

        <!-- Chi tiết thanh toán -->
        <div class="space-y-3">
          <div class="flex justify-between text-gray-600">
            <span>Tạm tính ({{ selectedItems.length }} sản phẩm):</span>
            <span>{{ formatPrice(selectedTotal) }}</span>
          </div>
          <div v-if="discountAmount > 0" class="flex justify-between text-green-600">
            <span>Giảm giá:</span>
            <span>-{{ formatPrice(discountAmount) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg pt-3 border-t">
            <span>Tổng cộng:</span>
            <span class="text-black">{{ formatPrice(finalTotal) }}</span>
          </div>
          
          <!-- Nút thanh toán -->
          <button 
            :disabled="selectedItems.length === 0"
            :class="[
              'w-full mt-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300',
              selectedItems.length > 0 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <span>Thanh toán {{ selectedItems.length }} sản phẩm</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Giỏ hàng trống -->
    <div v-else class="text-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-xl text-gray-600 mb-6">Giỏ hàng của bạn đang trống</p>
      <router-link 
        to="/products" 
        class="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
      >
        Tiếp tục mua sắm
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { useDiscountStore } from '../stores/discount'

const cartStore = useCartStore()
const discountStore = useDiscountStore()
const discountCode = ref('')
const selectedItems = ref([])
const selectAll = ref(false)

// Tính tổng tiền cho các sản phẩm được chọn
const selectedTotal = computed(() => {
  return cartStore.items
    .filter(item => selectedItems.value.includes(item.id))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

// Tính số tiền được giảm giá
const discountAmount = computed(() => {
  return discountStore.calculateDiscount(selectedTotal.value)
})

// Tính tổng tiền cuối cùng
const finalTotal = computed(() => {
  return selectedTotal.value - discountAmount.value
})

// Format giá tiền
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price)
}

// Xử lý chọn tất cả
const handleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = cartStore.items.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

// Watch thay đổi của selectedItems để cập nhật selectAll
watch(selectedItems, (newValue) => {
  selectAll.value = newValue.length === cartStore.items.length
})

// Áp dụng mã giảm giá
const applyDiscountCode = () => {
  if (!discountCode.value) {
    alert('Vui lòng nhập mã giảm giá!')
    return
  }
  
  const result = discountStore.applyDiscount(discountCode.value)
  alert(result.message)
  if (result.success) {
    discountCode.value = ''
  }
}

// Cập nhật số lượng sản phẩm
const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId)
  // Xóa khỏi danh sách đã chọn
  selectedItems.value = selectedItems.value.filter(id => id !== productId)
}
</script>