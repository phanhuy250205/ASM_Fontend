<template>
  <nav
    class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
  >
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo và menu chính -->
        <div class="flex items-center space-x-8">
          <router-link to="/" class="text-2xl font-bold">Shop ABC</router-link>
          <div class="hidden md:flex space-x-6">
            <router-link
              to="/"
              class="hover:text-indigo-200 transition-colors duration-200 font-medium"
              active-class="text-indigo-200"
            >
              Trang chủ
            </router-link>
            <router-link
              to="/products"
              class="hover:text-indigo-200 transition-colors duration-200 font-medium"
              active-class="text-indigo-200"
            >
              Sản phẩm
            </router-link>
          </div>
        </div>

        <!-- Menu người dùng -->
        <div class="flex items-center space-x-6">
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/cart"
              class="relative hover:text-indigo-200 transition-colors duration-200"
            >
              <span
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartStore.itemCount }}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </router-link>
            <router-link
              to="/profile"
              class="hover:text-indigo-200 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </router-link>
            <button
              @click="logout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Đăng xuất
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Đăng nhập
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
