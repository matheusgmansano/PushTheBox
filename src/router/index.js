import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'

const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router