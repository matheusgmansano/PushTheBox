<script>
import { mapa1 } from '@/mapas/mapa1.js';
import createScript from '@/javascript/createScript';
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

// Importa as funções para controlar o áudio
import { tocarMusica, pararMusica } from '@/javascript/audio.js';

// Importa a música da fase 1
import curiousTheme from '@/../public/audio/curious_theme.wav'; // Ajuste o caminho se necessário

export default {
  mixins: [createScript(mapa1, '/historia2', 10)],
  data() {
    return {
      mostrarMenu: false,
      somClique: null
    };
  },
  mounted() {
    // Configura o som de clique do menu
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Toca a música da fase 1
    tocarMusica(curiousTheme, 0.2); // Ajuste o volume conforme desejar
  },
  beforeUnmount() {
    // Para a música quando sair da fase
    pararMusica();
  },
  methods: {
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
    },
    tocarSom() {
      if (this.somClique) {
        this.somClique.currentTime = 0;
        this.somClique.play();
      }
    },
    reiniciarComSom() {
      this.tocarSom();
      this.reiniciar();
    },
    voltarComSom() {
      this.tocarSom();
      this.voltar();
    },
    irParaCreditosComSom() {
      this.tocarSom();
      this.irParaCreditos();
    },
    irParaCreditos() {
      alert("Indo para Créditos...");
    }
  }
};
</script>

<template>
  <title>Fase 1</title>

  <div class="menu-container">
    <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

    <div v-if="mostrarMenu" class="menu-dropdown">
      <button @click="reiniciarComSom">Reiniciar</button>
      <button @click="voltarComSom">Voltar início</button>
      <button @click="irParaCreditosComSom">Créditos</button>
    </div>
  </div>

  <div class="tela">
    <h1 style="margin-bottom: -10px;">Fase 1</h1>
    <h2 style="color: orange">{{ cronometro }}</h2>
    <div class="mapa">
      <div v-for="(linha, y) in mapa" :key="y" class="linha">
        <div v-for="(tipoCelula, x) in linha" :key="x" :class="classeParaPosicao(y, x)">
        </div>
      </div>
    </div>
  </div>

  <div v-if="mostrarProximaFase" class="telaVitoria">
    <div class="janela">
      <h2>Fase Concluída!</h2>
      <button @click="irParaProximaFase" class="botaoVitoria">Próxima Fase</button>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>

  <div v-if="mostrarDerrota" class="telaDerrota">
    <div class="janela">
      <h2 v-if="tipoDerrota === 'tempo'">Tempo Esgotado!</h2>
      <h2 v-else-if="tipoDerrota === 'buraco'">Você caiu no Buraco!</h2>
      <h2 v-else>Derrota!</h2>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>
</template>
