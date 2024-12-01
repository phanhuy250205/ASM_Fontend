<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <!-- Profile Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Header Banner -->
          <div class="bg-black h-32"></div>
          
          <!-- Profile Info -->
          <div class="px-8 pb-8">
            <!-- Avatar Section -->
            <div class="relative -mt-16 mb-8">
              <div class="w-32 h-32 bg-gray-900 rounded-full border-4 border-white flex items-center justify-center">
                <span class="text-4xl font-bold text-white">
                  {{ authStore.user?.username.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- User Details -->
            <div class="space-y-8">
              <!-- Basic Info -->
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ authStore.user?.fullName }}
                </h1>
                <p class="text-gray-600">@{{ authStore.user?.username }}</p>
              </div>

              <!-- Contact Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Email -->
                <div class="bg-gray-50 rounded-xl p-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Email</p>
                      <p class="font-medium text-gray-900">{{ authStore.user?.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Username -->
                <div class="bg-gray-50 rounded-xl p-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Tên đăng nhập</p>
                      <p class="font-medium text-gray-900">{{ authStore.user?.username }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Account Actions -->
              <div class="border-t pt-8">
                <h2 class="text-xl font-semibold mb-4">Tùy chọn tài khoản</h2>
                <div class="space-y-4">
                  <button class="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Chỉnh sửa thông tin</span>
                  </button>
                  <button 
                    @click="handleLogout"
                    class="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>