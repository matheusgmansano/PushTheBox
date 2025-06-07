import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import historia from '@/views/historia.vue'
import fase1 from '@/views/fase1.vue'
import fase2teste from '@/views/fase2teste.vue'


const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
   { path: '/historia', name: 'historia', component: historia },
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2teste', name: 'fase2teste', component: fase2teste }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router