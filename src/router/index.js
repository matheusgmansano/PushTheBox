import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import fase1 from '@/views/fase1.vue'

const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/fase1', name: 'fase1', component: fase1 }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router