<script>
import { mapa1 } from '@/mapas/mapa1.js';
import createScript from '@/javascript/createScript';
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';
import '@/styles/telaMenu.css';

<<<<<<< HEAD

export default {
  mixins: [createScript(mapa1, '/fase2teste', 10)],
  data() {
    return {
      mostrarMenu: false,
      somClique: null
    };
  },
  mounted() {
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;
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
=======
export default createScript(mapa1, '/fase2', 10);
>>>>>>> ebf455a9b9b5feb57c91d3dee5862fca49a614f3
</script>

<template>
  <title>Fase 1</title>

  <!-- Botão de Menu -->
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
    <h2 style="color:orange ">{{ cronometro }}</h2>
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

