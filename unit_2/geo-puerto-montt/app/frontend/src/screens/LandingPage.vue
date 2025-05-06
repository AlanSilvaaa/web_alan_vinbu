<template>
  <div class="p-8 space-y-6">
    <Button @click="PlayGame">Click here to play the game</Button>

    <Button @click="rotateCard" class="ml-4">Rotate the Card</Button>

    <div>
      <div @mouseover="hoverCard" @mouseout="unhoverCard" class="inline-flex" style="transform-style: preserve-3d;" ref="box">
        <Polaroid />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import Button from "primevue/button";
import Polaroid from "@/components/PolaroidPhoto.vue";
import { useSound } from "@vueuse/sound";
import flip_card from "../assets/sounds/card_flipped.wav";

const router = useRouter();
const box = ref(null);
const flipped = ref(false);

const { play } = useSound(flip_card);

function PlayGame() {
  router.push("/PlayGame");
}

function hoverCard() {
  gsap.to(box.value, {
    y: -30,
    duration: 0.3,
    ease: "power1.inOut",
  });
}

function unhoverCard() {
  gsap.to(box.value, {
    y: 0,
    duration: 0.3,
    ease: "power1.inOut",
  });
}

function rotateCard() {
  play();

  gsap.to(box.value, {
    transformOrigin: "center center",
    rotationY: flipped.value ? 360 : 180,
    duration: 1,
    ease: "power1.inOut",
    onComplete() {
      gsap.set(box.value, { rotation: 0 });
      flipped.value = !flipped.value;
    },
  });
}
</script>

<style></style>
