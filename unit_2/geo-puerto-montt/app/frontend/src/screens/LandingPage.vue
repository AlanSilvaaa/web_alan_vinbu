<template>
  <div class="p-8 space-y-6">
    <Button @click="PlayGame">Click here to play the game</Button>
    <Button @click="rotateCard" class="ml-4">Rotate the Card</Button>
    <Button @click="playAnimation" class="ml-4">Play card animations</Button>
    <Button @click="initialAnimation" class="ml-4">Play carousel</Button>
    <div class="relative flex justify-center">
      <div @click="rotateCard" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;" ref="normal_mode">
        <Polaroid :data="normalModeText" />
      </div>
      <div @click="rotateCard" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;"
        ref="no_movement_mode">
        <Polaroid :data="noMovementModeText" />
      </div>
      <div @click="rotateCard" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;" ref="infinite_mode">
        <Polaroid :data="infiniteModeText" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import Button from "primevue/button";
import Polaroid from "@/components/PolaroidPhoto.vue";
import { normalModeText } from "@/data/polaroids";
import { noMovementModeText } from "@/data/polaroids";
import { infiniteModeText } from "@/data/polaroids";
import flip_card from "../assets/sounds/card_flipped.wav";
import { useSound } from "@vueuse/sound";

const router = useRouter();
const normal_mode = ref(null);
const no_movement_mode = ref(null);
const infinite_mode = ref(null);
const flipped = ref(false);

const { play: flipCard } = useSound(flip_card);

function PlayGame() {
  router.push("/PlayGame");
}

// const items = [ no_movement_mode, normal_mode, infinite_mode ]

// function moveCards(selectedCardIndex) {
//   const prevIdx = (selectedCardIndex + items.length - 1) % items.length
//   const nextCardIndex = (selectedCardIndex + 1) % items.length;
//   return
// }

function playAnimation() {
  const elements = [
    no_movement_mode.value,
    normal_mode.value,
    infinite_mode.value
  ];
  gsap.timeline({ repeat: -1 })
    .to(elements, {
      y: -10,
      duration: 1.5,
      ease: "power1.inOut",
      stagger: 0.2,
    })
    .to(elements, {
      y: 0,
      duration: 1.5,
      ease: "power1.inOut",
      stagger: 0.2,
    });
}

onMounted(() => {
  initialAnimation();
});

function initialAnimation() {
  gsap.to(infinite_mode.value, {
    x: 360,
    duration: 1,
    ease: "power1.inOut",
  });
  gsap.to(no_movement_mode.value, {
    x: -360,
    duration: 1,
    ease: "power1.inOut",
    onComplete() {
      gsap.to(normal_mode.value, {
        scale: 1.2,
        duration: 1,
        ease: "power1.inOut"
      });
    },
    // TODO: when the animations ends, the button to start the game should appear
  });
}

function rotateCard() {
  flipCard();
  gsap.to(normal_mode.value, {
    transformOrigin: "center center",
    rotationY: flipped.value ? 360 : 180,
    duration: 1,
    ease: "power1.inOut",
    onComplete() {
      gsap.set(normal_mode.value, { rotation: 0 });
      flipped.value = !flipped.value;
    },
  });
}
</script>

<style></style>