<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-black text-white">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-black to-gray-800"></div>
      </div>

      <!-- Welcome Content -->
      <div class="relative">
        <div class="container mx-auto px-4 py-32">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Chào mừng 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {{ authStore.user?.username || 'bạn' }}
              </span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-12">
              Khám phá bộ sưu tập công nghệ độc đáo tại ABC Shop
            </p>
            <router-link 
              to="/products" 
              class="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Xem sản phẩm
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="container mx-auto px-4 py-24">
      <h2 class="text-3xl font-bold text-center mb-16">Sản phẩm nổi bật</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-gray-50 py-24">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">Tại sao chọn chúng tôi?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Chất lượng đảm bảo</h3>
            <p class="text-gray-600">Cam kết 100% hàng chính hãng</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Giao hàng nhanh</h3>
            <p class="text-gray-600">Giao hàng trong 24h</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Hỗ trợ 24/7</h3>
            <p class="text-gray-600">Luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const featuredProducts = products.slice(0, 3)

const handleAddToCart = (productData) => {
  cartStore.addToCart(productData)
  alert(`Đã thêm ${productData.quantity} ${productData.name} vào giỏ hàng`)
}
</script>