<script>
// Importa o mapa da fase 10 para esta fase
import { mapa10 } from '@/mapas/mapa10';

// Importa a função que cria a lógica do jogo
import createScript from '@/javascript/createScript';

// Importa funções de áudio
import { tocarMusica, pararMusica, toggleMute, estaMutada } from '@/javascript/audio.js';

// Importa estilos visuais usados nesta fase
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

export default {
  // Usa o mixin para criar a lógica da fase 10, próxima rota é /historia3, tempo limite 60 segundos
  mixins: [createScript(mapa10, '/historia3', 60)],
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

    // Toca a música da fase 8 (talvez queira trocar para a música da fase 10)
    tocarMusica('/audio/curious_theme.wav', 0.2);
  },
  beforeUnmount() {
    // Para a música quando o componente for destruído
    pararMusica();
  },
  methods: {
    alternarMute() {
      // Alterna o estado do mute e salva
      this.mute = toggleMute();
    },
    toggleMenu() {
      // Alterna visibilidade do menu suspenso
      this.mostrarMenu = !this.mostrarMenu;
    },
    tocarSom() {
      // Toca o som do clique, reiniciando o áudio do início
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
      // Toca som e volta para o início
      this.tocarSom();
      this.voltar();
    },
    irParaCreditosComSom() {
      // Toca som e navega para créditos
      this.tocarSom();
      this.irParaCreditos();
    },
    irParaCreditos() {
      // Toca som e muda rota para créditos
      this.tocarSom();
      this.$router.push('/creditos');
    }
  }
};
</script>

<template>
  <!-- Define o título da aba -->
  <title>Fase 10</title>

  <!-- Menu flutuante com opções -->
  <div class="menu-container">
    <!-- Botão que abre ou fecha o menu -->
    <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

    <!-- Botão para alternar som mudo ou não -->
    <button @click="alternarMute" class="botaoMenu">
      {{ mute ? '🔇' : '🔊' }}
    </button>

    <!-- Menu suspenso, aparece se mostrarMenu for true -->
    <div v-if="mostrarMenu" class="menu-dropdown">
      <button @click="reiniciarComSom">Reiniciar</button>
      <button @click="voltarComSom">Voltar início</button>
      <button @click="irParaCreditosComSom">Créditos</button>
    </div>
  </div>

  <!-- Tela principal da fase -->
  <div class="tela">
    <!-- Título da fase -->
    <h1 style="margin-bottom: -10px;">Fase 10</h1>

    <!-- Cronômetro visível em laranja -->
    <h2 style="color: orange">{{ cronometro }}</h2>

    <!-- Renderização do mapa com linhas e células -->
    <div class="mapa">
      <div v-for="(linha, y) in mapa" :key="y" class="linha">
        <div v-for="(tipoCelula, x) in linha" :key="x" :class="classeParaPosicao(y, x)">
          <!-- Cada célula recebe uma classe CSS conforme seu tipo -->
        </div>
      </div>
    </div>
  </div>

  <!-- Tela de vitória, aparece ao concluir a fase -->
  <div v-if="mostrarProximaFase" class="telaVitoria">
    <div class="janela">
      <h2>Fase Concluída!</h2>
      <button @click="irParaProximaFase" class="botaoVitoria">Próxima Fase</button>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>

  <!-- Tela de derrota, aparece se o jogador perder -->
  <div v-if="mostrarDerrota" class="telaDerrota">
    <div class="janela">
      <!-- Mensagem específica dependendo do motivo da derrota -->
      <h2 v-if="tipoDerrota === 'tempo'">Tempo Esgotado!</h2>
      <h2 v-else-if="tipoDerrota === 'buraco'">Você caiu no Buraco!</h2>
      <h2 v-else>Derrota!</h2>

      <!-- Botões para reiniciar ou voltar ao menu -->
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>
</template>