import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'
import fase3 from '@/views/fase3.vue'
import fase4 from '@/views/fase4.vue'

const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 },
  { path: '/fase3', name: 'fase3', component: fase3 },
  { path: '/fase4', name: 'fase4', component: fase4 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router