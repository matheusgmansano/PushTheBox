<script scoped>
import '@/styles/botoes.css';
import '@/styles/body.css';
import '@/styles/telaMenu.css';

export default {
  data() {
    return {
      audio: null,
      somClique: null,
      mostrarMenu: false
    };
  },
  mounted() {
    this.audio = new Audio('/audio/hard-theme/desertbounce-trimmed.wav');
    this.audio.loop = true;
    this.audio.volume = 0.2;

    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = 0.1;

    const iniciarMusica = () => {
      this.audio.play();
      document.removeEventListener('click', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },
  methods: {
    tocarSom() {
      if (this.somClique) {
        this.somClique.currentTime = 0;
        this.somClique.play();
      }
    },
    irParaHistoria() {
      this.tocarSom();
      this.$router.push('/historia');
    },
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
    },
    irParaConfiguracoes() {
      this.tocarSom();
      alert("Indo para Configurações...");
    },
    irParaCreditos() {
      this.tocarSom();
      alert("Indo para Créditos...");
    }
  }
};
</script>

<template>
  <title>Tela Inicial</title>

  <div class="tela">
    <h1 class="titulo">Push the Box</h1>
    <button @click="irParaHistoria" class="botaoIniciar">INICIAR</button>

    <div class="menu-container">
      <button @click="toggleMenu" class="botaoMenu">☰ MENU</button>

      <div v-if="mostrarMenu" class="menu-dropdown">
        <button @click="irParaConfiguracoes">Configurações</button>
        <button @click="irParaCreditos">Créditos</button>
      </div>
    </div>
  </div>
</template>

