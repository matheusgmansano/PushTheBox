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
  this.$router.push('/configuracoes');
},
    irParaCreditos() {
      this.tocarSom();
      this.$router.push('/creditos');
    }
  }
};
</script>

<template>
  <title>Tela Inicial</title>

  <div class="tela">
    <h1 class="titulo">Push the Box</h1>
    <button @click="irParaHistoria" class="botaoIniciar">INICIAR</button>
    <button @click="irParaCreditos" class="botaoSecundario">CRÉDITOS</button>
    <button @click="irParaConfiguracoes" class="botaoSecundario">CONFIGURAÇÕES</button>
  </div>
</template>
