import { createRouter, createWebHistory } from 'vue-router'
import TelaInicial from '@/views/telaInicial.vue'
import historia from '@/views/historia.vue'
import historia2 from '@/views/historia2.vue'
import historia3 from '@/views/historia3.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'
import fase3 from '@/views/fase3.vue'
import fase4 from '@/views/fase4.vue'
import fase5 from '@/views/fase5.vue'
import fase6 from '@/views/fase6.vue'
import fase7 from '@/views/fase7.vue'
import fase8 from '@/views/fase8.vue'
import fase9 from '@/views/fase9.vue'


const routes = [
  
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/historia', name: 'historia', component: historia },
  { path: '/historia2', name: 'historia2', component: historia2 }, 
  { path: '/historia3', name: 'historia3', component: historia3 }, 
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 },
  { path: '/fase3', name: 'fase3', component: fase3 },
  { path: '/fase4', name: 'fase4', component: fase4 },
  { path: '/fase5', name: 'fase5', component: fase5 },
  { path: '/fase6', name: 'fase6', component: fase6 },
  { path: '/fase7', name: 'fase7', component: fase7 },
  { path: '/fase8', name: 'fase8', component: fase8 },
  { path: '/fase9', name: 'fase9', component: fase9 },
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router