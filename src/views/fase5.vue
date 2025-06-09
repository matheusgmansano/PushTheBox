<script>
// Importa o mapa da fase 5
import { mapa5 } from '@/mapas/mapa5.js';

// Importa a função que cria a lógica do jogo
import createScript from '@/javascript/createScript';

// Importa funções de áudio
import { tocarMusica, pararMusica, toggleMute, estaMutada } from '@/javascript/audio.js';

// Importa os estilos visuais da fase e das telas
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

export default {
  // Aplica o mixin que contém a lógica do jogo para o mapa5,
  // define a rota da próxima fase e o tempo limite (40 segundos)
  mixins: [createScript(mapa5, '/historia2', 40)],
  data() {
    return {
      mostrarMenu: false, // Controla a exibição do menu suspenso
      somClique: null,    // Objeto Audio para o som de clique no menu
      mute: false         // Estado atual do som (mutado ou não)
    };
  },
  mounted() {
    // Cria o som de clique para o menu e define volume baixo
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Toca a música da fase 5
    tocarMusica('/audio/hauntedcastle.mp3', 0.2);
  },
  beforeUnmount() {
    // Para a música ao sair da fase
    pararMusica();
  },
  methods: {
    // Alterna entre mudo e som, armazenando o estado
    alternarMute() {
      this.mute = toggleMute();
    },
    // Alterna a exibição do menu suspenso
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
    },
    // Toca o som de clique, reiniciando caso já esteja tocando
    tocarSom() {
      if (this.somClique) {
        this.somClique.currentTime = 0;
        this.somClique.play();
      }
    },
    // Reinicia a fase tocando o som de clique
    reiniciarComSom() {
      this.tocarSom();
      this.reiniciar();
    },
    // Volta ao menu inicial tocando o som de clique
    voltarComSom() {
      this.tocarSom();
      this.voltar();
    },
    // Vai para a tela de créditos tocando o som de clique
    irParaCreditosComSom() {
      this.tocarSom();
      this.irParaCreditos();
    },
    // Navega para a rota de créditos
    irParaCreditos() {
      this.tocarSom();
      this.$router.push('/creditos');
    }
  }
};
</script>

<template>
  <!-- Define o título da aba do navegador -->
  <title>Fase 5</title>

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
    <h1 style="margin-bottom: -10px;">Fase 5</h1>

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