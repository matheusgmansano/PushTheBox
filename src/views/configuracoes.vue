<template>
  <div class="tela-configuracoes" style="color: white; padding: 20px;">
    <h1>Configurações</h1>

    <label for="volume">Volume do Som:</label>
    <input
      id="volume"
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model.number="volume"
      @input="alterarVolume"
    />

    <p>Volume atual: {{ (volume * 100).toFixed(0) }}%</p>

    <button @click="voltar" class="botaoSecundario">Voltar</button>
  </div>
</template>

<script>
import '@/styles/telaConfig.css';

export default {
  data() {
    return {
      volume: 0.2,
      somClique: null,
    };
  },
  mounted() {
    this.somClique = new Audio('/audio/somButaoClick.mp3');
    this.somClique.volume = this.volume;
  },
  methods: {
    alterarVolume() {
      if (this.somClique) {
        this.somClique.volume = this.volume;
        this.somClique.currentTime = 0;
        this.somClique.play();
      }
    },
    voltar() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* seus estilos existentes aqui */
</style>
