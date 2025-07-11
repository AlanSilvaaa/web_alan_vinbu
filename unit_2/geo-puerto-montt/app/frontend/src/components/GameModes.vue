<template>
  <div class="p-8 space-y-6">
    <div class="relative flex justify-center">
      <div @click="handleCardClick(0)" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;"
        ref="no_movement_mode">
        <Polaroid :data="noMovementModeText" @playGame="PlayGame"/>
      </div>
      <div @click="handleCardClick(1)" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;"
        ref="normal_mode">
        <Polaroid :data="normalModeText" @playGame="PlayGame"/>
      </div>
      <div @click="handleCardClick(2)" class="inline-flex absolute cursor-pointer" style="transform-style: preserve-3d;"
        ref="infinite_mode">
        <Polaroid :data="infiniteModeText" @playGame="PlayGame"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import Polaroid from "@/components/PolaroidPhoto.vue";
import { normalModeText, noMovementModeText, infiniteModeText } from "@/data/polaroids";
import flip_card from "../assets/sounds/card_flipped.wav";
import { useSound } from "@vueuse/sound";

const router = useRouter();
const flipped = ref(false);
const SPACING = 360;
const no_movement_mode = ref(null);
const normal_mode = ref(null);
const infinite_mode = ref(null);
const items = [no_movement_mode, normal_mode, infinite_mode];
const currentCenterCard = ref(1);

const { play: flipCard } = useSound(flip_card);

function PlayGame(message) {
    console.log(message);
  router.push("/PlayGame");
}

onMounted(() => {
  initialAnimation();
  playAnimation();
});


/**
 * main handler of the click event on a card (rotate and move).
 * @param index - The index of the clicked card
 */
function handleCardClick(index) {
  handleFlipCard(index);
  moveCards(index);
}


/**
 * handles the flipping of the card when clicked.
 * If the clicked card is the current center card, it flips it.
 * If another card is clicked while the center card is flipped, it flips the center card back to front.
 * @param index - The index of the clicked card
 */
function handleFlipCard(index) {
  if (index === currentCenterCard.value) {
    rotateCard();
  } else if (flipped.value) {
    rotateCard();
  }
}

/**
 * Moves the cards to their new positions.
 * The clicked card moves to the center, while the other two cards move to the left and right.
 * @param index - The index of the clicked card
 */
function moveCards(index) {
  const prevCardIndex = (index + items.length - 1) % items.length;
  const nextCardIndex = (index + 1) % items.length;
  const tl = gsap.timeline();

  tl.to(
    items[index].value,
    {
      x: 0,
      scale: 1.2,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete() {
        currentCenterCard.value = index;
      }
    },0
  );

  tl.to(
    items[nextCardIndex].value,
    {
      x: SPACING,
      scale: 1,
      duration: 0.5,
      ease: "power1.inOut"
    },0
  );

  tl.to(
    items[prevCardIndex].value,
    {
      x: -SPACING,
      scale: 1,
      duration: 0.5,
      ease: "power1.inOut"
    },0
  );
}

/**
 * Flip the currently centered card.
 * Alternates between 0° (front) and 180° (back).
 */
function rotateCard() {
  flipCard();
  const centerCard = items[currentCenterCard.value].value;
  const target = flipped.value ? 0 : 180;
  gsap.to(centerCard, {
    transformOrigin: "center center",
    rotationY: target,
    duration: 0.8,
    ease: "power1.inOut",
    onComplete() {
      flipped.value = !flipped.value;
    }
  });
}


/**
 * Plays the animation of the cards moving up and down.
 * The animation is a loop that moves the cards up and down with a stagger effect.
 */
function playAnimation() {
  const elements = [
    no_movement_mode.value,
    normal_mode.value,
    infinite_mode.value
  ];
  gsap
    .timeline({ repeat: -1 })
    .to(elements, {
      y: -10,
      duration: 1.5,
      ease: "power1.inOut",
      stagger: 0.2
    })
    .to(elements, {
      y: 0,
      duration: 1.5,
      ease: "power1.inOut",
      stagger: 0.2
    });
}


/**
 * Plays the initial animation of the cards moving to their positions.
 * The cards move to their respective positions with a stagger effect.
 */
function initialAnimation() {
  gsap.to(infinite_mode.value, {
    x: SPACING,
    duration: 1,
    ease: "power1.inOut"
  });
  gsap.to(no_movement_mode.value, {
    x: -SPACING,
    duration: 1,
    ease: "power1.inOut",
    onComplete() {
      gsap.to(normal_mode.value, {
        scale: 1.2,
        duration: 1,
        ease: "power1.inOut"
      });
    }
  });
}
</script>