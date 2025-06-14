// Importa as funções do Vue Router necessárias para criar o roteador e usar o histórico de navegação do navegador
import { createRouter, createWebHistory } from 'vue-router'

// Importa as "views", ou seja, os componentes de tela da aplicação
import TelaInicial from '@/views/telaInicial.vue'
import Configuracoes from '@/views/configuracoes.vue'
import Tutorial from '@/views/tutorial.vue'
import Creditos from '@/views/creditos.vue'
import historia from '@/views/historia.vue'
import historia2 from '@/views/historia2.vue'
import historia3 from '@/views/historia3.vue'
import historiaEXTRA from '@/views/historiaEXTRA.vue'
import fase1 from '@/views/fase1.vue'
import fase2 from '@/views/fase2.vue'
import fase3 from '@/views/fase3.vue'
import fase4 from '@/views/fase4.vue'
import fase5 from '@/views/fase5.vue'
import fase6 from '@/views/fase6.vue'
import fase7 from '@/views/fase7.vue'
import fase8 from '@/views/fase8.vue'
import fase9 from '@/views/fase9.vue'
import fase10 from '@/views/fase10.vue'
import faseEXTRA from '@/views/faseEXTRA.vue'

// Define as rotas da aplicação, cada uma com caminho, nome e componente correspondente
const routes = [
  { path: '/', name: 'TelaInicial', component: TelaInicial },
  { path: '/configuracoes', name: 'Configuracoes', component: Configuracoes },
  { path: '/tutorial', name: 'Tutorial', component: Tutorial },
  { path: '/creditos', name: 'Creditos', component: Creditos },

  // Rotas da história do jogo
  { path: '/historia', name: 'historia', component: historia },
  { path: '/historia2', name: 'historia2', component: historia2 },
  { path: '/historia3', name: 'historia3', component: historia3 },
  { path: '/historiaEXTRA', name: 'historiaEXTRA', component: historiaEXTRA },

  // Rotas das fases do jogo
  { path: '/fase1', name: 'fase1', component: fase1 },
  { path: '/fase2', name: 'fase2', component: fase2 },
  { path: '/fase3', name: 'fase3', component: fase3 },
  { path: '/fase4', name: 'fase4', component: fase4 },
  { path: '/fase5', name: 'fase5', component: fase5 },
  { path: '/fase6', name: 'fase6', component: fase6 },
  { path: '/fase7', name: 'fase7', component: fase7 },
  { path: '/fase8', name: 'fase8', component: fase8 },
  { path: '/fase9', name: 'fase9', component: fase9 },
  { path: '/fase10', name: 'fase10', component: fase10 },
  { path: '/faseEXTRA', name: 'faseEXTRA', component: faseEXTRA },
]

// Cria a instância do roteador com o modo de histórico real do navegador e as rotas definidas acima
const router = createRouter({
  history: createWebHistory(), // Usa o modo history, sem # na URL
  routes // Passa o array de rotas para o roteador
})

// Exporta o roteador para ser utilizado no arquivo principal da aplicação (main.js)
export default router