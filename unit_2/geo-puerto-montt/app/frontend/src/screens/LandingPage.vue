<template>
  <div class="p-8 space-y-6">
    <!-- Your existing “Play Game” button -->
    <Button @click="PlayGame">Click here to play the game</Button>

    <!-- New button to trigger the rotation -->
    <Button @click="rotateCard" class="ml-4">Rotate the Card</Button>

    <div>
      <div class="inline-flex" ref="box">
        <Polaroid />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap"; // npm install gsap
import Button from "primevue/button";
import Polaroid from "@/components/PolaroidPhoto.vue";

const router = useRouter();
const box = ref(null);

function PlayGame() {
  router.push("/PlayGame");
}

function rotateCard() {
  // gsap.to targets the DOM element and animates rotation
  gsap.to(box.value, {
    rotation: 360,
    duration: 2,
    ease: "power1.inOut",
    // optional: reset rotation after complete so it can run again
    onComplete() {
      gsap.set(box.value, { rotation: 0 });
    },
  });
}
</script>

<style>
/* No extra CSS needed—Tailwind covers it */
</style>
