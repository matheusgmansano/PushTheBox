<script scoped>
import '@/styles/botoes.css';
import '@/styles/body.css';

export default {
  data() {
    return {
      audio: null
    };
  },
  mounted() {
    this.audio = new Audio('/audio/hard-theme/desertbounce-trimmed.wav');
    this.audio.loop = true;
    this.audio.volume = 0.2;

    const iniciarMusica = () => {
      this.audio.play();
      document.removeEventListener('click', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);
  },
  beforeUnmount() {
    // Parar áudio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },
  methods: {
    irParaHistoria() {
      this.$router.push('/historia');
    }
  }
};
</script>

<template>
  <title>Tela Inicial</title>

  <div class="tela">
    <h1 class="titulo">Push the Box</h1>
    <button @click="irParaHistoria" class="botaoIniciar">INICIAR</button>
  </div>

</template>

<style scoped>
.titulo {
  color: rgb(255, 255, 255);
  font-family: 'Silkscreen', monospace;
  font-size: 60px;
  animation: pulse 8s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.10);
    opacity: 0.8;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>