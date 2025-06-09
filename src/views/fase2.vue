<script>
import { mapa2 } from '@/mapas/mapa2.js';
import createScript from '@/javascript/createScript';
import { tocarMusica, pararMusica } from '@/javascript/audio.js'; // Importa as funções de música
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

export default {
  mixins: [createScript(mapa2, '/fase3', 30)],
  data() {
    return {
      mostrarMenu: false,
      somClique: null
    };
  },
  mounted() {
    // Som de clique no menu
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    // Música da Fase 2 usando o caminho absoluto
    tocarMusica('/audio/hauntedcastle.mp3', 0.2);
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
  <title>Fase 2</title>

  <div class="menu-container">
    <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

    <div v-if="mostrarMenu" class="menu-dropdown">
      <button @click="reiniciarComSom">Reiniciar</button>
      <button @click="voltarComSom">Voltar início</button>
      <button @click="irParaCreditosComSom">Créditos</button>
    </div>
  </div>

  <div class="tela">
    <h1 style="margin-bottom: -10px;">Fase 2</h1>
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
