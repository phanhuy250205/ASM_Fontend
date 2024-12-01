<template>
  <div class="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <div class="text-4xl text-indigo-600 mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>