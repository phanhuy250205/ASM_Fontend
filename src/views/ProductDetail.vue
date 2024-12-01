<template>
  <div class="container mx-auto p-4">
    <!-- Hiển thị thông báo yêu cầu đăng nhập nếu chưa đăng nhập -->
    <div v-if="!authStore.isAuthenticated" class="text-center py-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Vui lòng đăng nhập để xem chi tiết sản phẩm</h2>
      <router-link 
        to="/login" 
        class="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Đăng nhập ngay
      </router-link>
    </div>

    <!-- Hiển thị chi tiết sản phẩm nếu đã đăng nhập -->
    <div v-else-if="product" class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Phần hình ảnh sản phẩm -->
        <div class="relative">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-96 object-cover rounded-lg shadow-md"
          >
        </div>

        <!-- Phần thông tin sản phẩm -->
        <div class="space-y-6">
          <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
          <p class="text-gray-600 text-lg">{{ product.description }}</p>
          <div class="border-t border-b py-4">
            <p class="text-3xl font-bold text-indigo-600">{{ formatPrice(product.price) }}</p>
          </div>
          
          <!-- Nút thêm vào giỏ hàng -->
          <button 
            @click="addToCart(product)" 
            class="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Thêm vào giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hiển thị thông báo không tìm thấy sản phẩm -->
    <div v-else class="text-center text-xl text-gray-600">
      Không tìm thấy sản phẩm
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

// Khởi tạo các store và router
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// Lấy thông tin sản phẩm dựa vào id từ route
const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id))
})

// Hàm format giá tiền theo định dạng tiền Việt Nam
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Hàm xử lý thêm vào giỏ hàng
const addToCart = (product) => {
  cartStore.addToCart(product)
  alert('Đã thêm sản phẩm vào giỏ hàng!')
}
</script>