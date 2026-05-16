<template>
  <nav class="navbar navbar-dark bg-dark py-3">
    <div class="container">
      <h2 class="navbar-brand mb-0">🧠 Fancy Quiz App</h2>
      <div class="badge bg-light text-dark fs-5">
        {{ currentIndex + 1 }} / {{ total }}
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentIndex: Number,
  total: Number
})
</script>