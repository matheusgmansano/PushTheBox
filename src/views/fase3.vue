<script>
// Importa o mapa (3) da fase 3
import { mapa3 } from '@/mapas/mapa3.js';

// Importa a função que cria a lógica do jogo
import createScript from '@/javascript/createScript';

// Importa funções de áudio
import { tocarMusica, pararMusica, toggleMute, estaMutada } from '@/javascript/audio.js';

// Importa estilos visuais da fase e das telas
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

export default {
  // Aplica a lógica do jogo para o mapa3, redirecionando para a fase 4, com limite de 40 segundos
  mixins: [createScript(mapa3, '/fase4', 40)],
  data() {
    return {
      mostrarMenu: false, // Controla a exibição do menu suspenso
      somClique: null     // Áudio de clique do menu
    };
  },
  mounted() {
    // Configura o som de clique do menu
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Toca a música da fase 3
    tocarMusica('/audio/main_theme_01.wav', 0.2);
  },
  beforeUnmount() {
    // Para a música quando a fase for desmontada
    pararMusica();
  },
  methods: {
    alternarMute() {
      this.mute = toggleMute(); // Alterna e armazena o estado de mute/unmute
    },
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu; // Alterna visibilidade do menu
    },
    tocarSom() {
      if (this.somClique) {
        this.somClique.currentTime = 0;
        this.somClique.play(); // Reproduz o som de clique do início
      }
    },
    reiniciarComSom() {
      this.tocarSom(); // Toca o som antes de reiniciar a fase
      this.reiniciar();
    },
    voltarComSom() {
      this.tocarSom(); // Toca o som antes de voltar para o menu
      this.voltar();
    },
    irParaCreditosComSom() {
      this.tocarSom(); // Toca o som antes de ir para a tela de créditos
      this.irParaCreditos();
    },
    irParaCreditos() {
      this.tocarSom();
      this.$router.push('/creditos'); // Redireciona para a tela de créditos
    }
  }
};
</script>

<template>
  <!-- Define o título da aba do navegador -->
  <title>Fase 3</title>

  <!-- Menu flutuante no topo da tela -->
  <div class="menu-container">
    <!-- Botão que abre o menu de opções -->
    <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

    <!-- Botão de som (mute/unmute) -->
    <button @click="alternarMute" class="botaoMenu">
      {{ mute ? '🔇' : '🔊' }}
    </button>

    <!-- Menu suspenso com opções -->
    <div v-if="mostrarMenu" class="menu-dropdown">
      <button @click="reiniciarComSom">Reiniciar</button>
      <button @click="voltarComSom">Voltar início</button>
      <button @click="irParaCreditosComSom">Créditos</button>
    </div>
  </div>

  <!-- Tela principal da fase -->
  <div class="tela">
    <!-- Título da fase -->
    <h1 style="margin-bottom: -10px;">Fase 3</h1>

    <!-- Cronômetro da fase -->
    <h2 style="color: orange">{{ cronometro }}</h2>

    <!-- Mapa do jogo -->
    <div class="mapa">
      <div v-for="(linha, y) in mapa" :key="y" class="linha">
        <div v-for="(tipoCelula, x) in linha" :key="x" :class="classeParaPosicao(y, x)">
          <!-- Cada célula recebe uma classe CSS baseada no conteúdo do mapa -->
        </div>
      </div>
    </div>
  </div>

  <!-- Tela de vitória (aparece quando a fase é vencida) -->
  <div v-if="mostrarProximaFase" class="telaVitoria">
    <div class="janela">
      <h2>Fase Concluída!</h2>
      <button @click="irParaProximaFase" class="botaoVitoria">Próxima Fase</button>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>

  <!-- Tela de derrota (aparece se o jogador perder) -->
  <div v-if="mostrarDerrota" class="telaDerrota">
    <div class="janela">
      <!-- Mensagem personalizada conforme o tipo de derrota -->
      <h2 v-if="tipoDerrota === 'tempo'">Tempo Esgotado!</h2>
      <h2 v-else-if="tipoDerrota === 'buraco'">Você caiu no Buraco!</h2>
      <h2 v-else>Derrota!</h2>

      <!-- Botões -->
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>
</template>