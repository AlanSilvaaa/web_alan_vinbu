<template>
  <!-- Card container: preserve 3D context -->
  <div class="relative w-64 h-80" style="transform-style: preserve-3d;">
    <!-- Front side -->
    <div class="absolute inset-0 bg-white shadow-lg p-4 flex flex-col justify-between"
      style="backface-visibility: hidden;">
      <img src="../assets/images/normal_mode_pixel.png" alt="Photo of normal mode"
        class="w-full h-64 object-cover mb-4" />
      <h1 class="text-black font-minecraft">Modo normal</h1>
      <small class="text-gray-600 text-sm">1855 pts.</small>
    </div>

    <!-- Back side -->
    <div class="absolute inset-0 bg-gray-100 shadow-lg p-4 flex flex-col justify-center items-center"
      style="transform: rotateY(180deg); backface-visibility: hidden;">
      <h2 class="text-black font-minecraft mb-2">Modo normal</h2>
      <p class="text-gray-700 text-center">Las normas son las siguiente:</p>
      <ul>
        <li class="text-gray-700">1. 3 minutos por ronda</li>
        <li class="text-gray-700">2. 3 rondas</li>
        <li class="text-gray-700">3. Puedes mover la cámara</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// No extra logic needed here; rotation is handled by parent with GSAP
</script>

<style scoped>
/* Optional: smooth edges */
</style>
