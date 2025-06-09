<script>
// Importa o mapa da fase 6
import { mapa6 } from '@/mapas/mapa6.js';

// Importa a função que cria a lógica do jogo
import createScript from '@/javascript/createScript';

// Importa funções para controle de áudio
import { tocarMusica, pararMusica, toggleMute, estaMutada } from '@/javascript/audio.js';

// Importa estilos das fases, botões e telas
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

export default {
  // Usa o mixin com a lógica do jogo para o mapa6,
  // define a próxima rota ('/fase7') e tempo limite (40 segundos)
  mixins: [createScript(mapa6, '/fase7', 40)],
  data() {
    return {
      mostrarMenu: false, // controla a exibição do menu suspenso
      somClique: null,    // objeto Audio para som do clique no menu
      mute: false         // estado do som (mutado ou não)
    };
  },
  mounted() {
    // Inicializa o som de clique para os botões do menu
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Toca a música da fase 6
    tocarMusica('/audio/hauntedcastle.mp3', 0.2);
  },
  beforeUnmount() {
    // Para a música quando sair da fase
    pararMusica();
  },
  methods: {
    // Alterna entre som mutado ou ativado, atualizando o estado
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
    // Reinicia a fase com som de clique
    reiniciarComSom() {
      this.tocarSom();
      this.reiniciar();
    },
    // Volta para o menu inicial com som de clique
    voltarComSom() {
      this.tocarSom();
      this.voltar();
    },
    // Vai para a tela de créditos com som de clique
    irParaCreditosComSom() {
      this.tocarSom();
      this.irParaCreditos();
    },
    // Navega para a rota de créditos do jogo
    irParaCreditos() {
      this.tocarSom();
      this.$router.push('/creditos');
    }
  }
};
</script>

<template>
  <!-- Define o título da aba do navegador -->
  <title>Fase 6</title>

  <!-- Menu flutuante no topo da tela -->
  <div class="menu-container">
    <!-- Botão que abre o menu de opções -->
    <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

    <!-- Botão para ativar/desativar o som -->
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
    <h1 style="margin-bottom: -10px;">Fase 6</h1>

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

  <!-- Tela de vitória (quando o jogador vence a fase) -->
  <div v-if="mostrarProximaFase" class="telaVitoria">
    <div class="janela">
      <h2>Fase Concluída!</h2>
      <button @click="irParaProximaFase" class="botaoVitoria">Próxima Fase</button>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>

  <!-- Tela de derrota (quando o jogador perde) -->
  <div v-if="mostrarDerrota" class="telaDerrota">
    <div class="janela">
      <!-- Mensagem conforme o motivo da derrota -->
      <h2 v-if="tipoDerrota === 'tempo'">Tempo Esgotado!</h2>
      <h2 v-else-if="tipoDerrota === 'buraco'">Você caiu no Buraco!</h2>
      <h2 v-else>Derrota!</h2>

      <!-- Botões para reiniciar ou voltar ao menu -->
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>
</template>