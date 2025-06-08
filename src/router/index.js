import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import historia from '@/views/historia.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'
import fase3 from '@/views/fase3.vue'
import fase4 from '@/views/fase4.vue'
import fase5 from '@/views/fase5.vue'


const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/historia', name: 'historia', component: historia },
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 },
  { path: '/fase3', name: 'fase3', component: fase3 },
  { path: '/fase4', name: 'fase4', component: fase4 },
  { path: '/fase5', name: 'fase5', component: fase5 }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router