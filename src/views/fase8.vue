<script>
// Importa o mapa da fase 8
import { mapa8 } from '@/mapas/mapa8.js';

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
  // Usa o mixin para criar a lógica da fase 8, próxima fase é a 9, tempo limite 40 segundos
  mixins: [createScript(mapa8, '/fase9', 40)],
  data() {
    return {
      mostrarMenu: false,
      somClique: null,
      mute: false
    };
  },
  mounted() {
    // Configura o som de clique do menu
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Toca a música da fase 8 usando o caminho absoluto
    tocarMusica('/audio/curious_theme.wav', 0.2);
  },
  beforeUnmount() {
    // Para a música quando o componente for destruído
    pararMusica();
  },
  methods: {
    alternarMute() {
      this.mute = toggleMute(); // alterna e armazena o novo estado de música mutada ou desmutada
    },
    toggleMenu() {
      // Abre ou fecha o menu suspenso
      this.mostrarMenu = !this.mostrarMenu;
    },
    tocarSom() {
      // Toca o som de clique, reiniciando do começo
      if (this.somClique) {
        this.somClique.currentTime = 0;
        this.somClique.play();
      }
    },
    reiniciarComSom() {
      // Toca som e reinicia a fase
      this.tocarSom();
      this.reiniciar();
    },
    voltarComSom() {
      // Toca som e volta para o início da fase
      this.tocarSom();
      this.voltar();
    },
    irParaCreditosComSom() {
      // Toca som e vai para a tela de créditos
      this.tocarSom();
      this.irParaCreditos();
    },
    irParaCreditos() {
      // Toca som e navega para a rota dos créditos
      this.tocarSom();
      this.$router.push('/creditos');
    }
  }
};
</script>

<template>
  <!-- Define o título da aba do navegador -->
  <title>Fase 8</title>

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
    <h1 style="margin-bottom: -10px;">Fase 8</h1>

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