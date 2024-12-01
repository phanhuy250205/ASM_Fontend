<!-- ProductCard.vue - Component hiển thị thông tin sản phẩm đơn lẻ -->
<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
    <!-- Phần hình ảnh sản phẩm với overlay khi hover -->
    <div class="relative group">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      >
      <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <router-link 
          :to="'/products/' + product.id"
          class="bg-white text-black px-6 py-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          Xem chi tiết
        </router-link>
      </div>
    </div>

    <!-- Phần thông tin sản phẩm -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
      
      <!-- Phần giá và các nút tương tác -->
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-gray-900">{{ formatPrice(product.price) }}</span>
        <div class="flex items-center gap-2">
          <!-- Nút điều chỉnh số lượng -->
          <div class="flex items-center border rounded-lg">
            <button 
              @click="updateQuantity(-1)"
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span class="px-3 py-1 border-x">{{ quantity }}</span>
            <button 
              @click="updateQuantity(1)"
              class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          <!-- Nút thêm vào giỏ hàng -->
          <button 
            @click="handleAddToCart"
            class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Định nghĩa props và emits
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['addToCart'])

// Quản lý số lượng sản phẩm
const quantity = ref(1)

// Hàm format giá tiền theo định dạng VND
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price)
}

// Hàm cập nhật số lượng sản phẩm
const updateQuantity = (change) => {
  const newQuantity = quantity.value + change
  if (newQuantity >= 1 && newQuantity <= 99) {
    quantity.value = newQuantity
  }
}

// Hàm xử lý thêm vào giỏ hàng và emit sự kiện
const handleAddToCart = () => {
  emit('addToCart', {
    ...props.product,
    quantity: quantity.value
  })
  // Reset số lượng sau khi thêm
  quantity.value = 1
}
</script>