import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './screens/LandingPage.vue'
import GameView from './screens/PlayGame.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/PlayGame', component: GameView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router