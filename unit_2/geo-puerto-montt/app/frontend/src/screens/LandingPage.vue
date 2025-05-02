<template>
  <Button @click="PlayGame">Click here to play the game</Button>
  <div>
    <Polaroid />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from "primevue/button"
import Polaroid from '@/components/PolaroidPhoto.vue';
const router = useRouter();

function PlayGame() {
  router.push('/PlayGame');
}
</script>

<style></style>
