<!-- Products.vue - Trang hiển thị danh sách sản phẩm -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header section -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-gray-900">Sản phẩm của chúng tôi</h1>
        <p class="mt-2 text-gray-600">Khám phá bộ sưu tập độc đáo và chất lượng</p>
      </div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters section -->
      <div class="mb-8 flex items-center justify-between">
        <div class="flex gap-4">
          <select 
            v-model="sortBy"
            class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="price">Sắp xếp theo giá</option>
          </select>
        </div>
        
        <!-- Search box -->
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            class="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-black"
          >
          <svg 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Products grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products'

// Store initialization
const cartStore = useCartStore()

// Local state
const searchQuery = ref('')
const sortBy = ref('name')

// Computed property để lọc và sắp xếp sản phẩm
const filteredProducts = computed(() => {
  let result = [...products]
  
  // Lọc theo search query
  if (searchQuery.value) {
    result = result.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Sắp xếp sản phẩm
  result.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy.value === 'price') {
      return a.price - b.price
    }
    return 0
  })
  
  return result
})

// Xử lý sự kiện thêm vào giỏ hàng từ ProductCard
const handleAddToCart = (productData) => {
  cartStore.addToCart(productData)
  // Hiển thị thông báo thành công
  alert(`Đã thêm ${productData.quantity} ${productData.name} vào giỏ hàng`)
}
</script>