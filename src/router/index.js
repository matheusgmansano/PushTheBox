import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import historia from '@/views/historia.vue'
import historia2 from '@/views/historia2.vue'
import historia3 from '@/views/historia3.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'


const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/historia', name: 'historia', component: historia },
  { path: '/historia2', name: 'historia2', component: historia2 }, 
  { path: '/historia3', name: 'historia3', component: historia3 }, 
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router