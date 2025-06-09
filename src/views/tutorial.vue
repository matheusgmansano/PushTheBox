<template>
  <div class="tela-tutorial">

    <h1>Tutorial</h1>

    <h2>🎮 Como jogar</h2>
    <p><strong>Movimentação:</strong> Use as teclas direcionais do teclado (↑, ↓, ←, →) para mover o personagem pelo cenário.</p>
    <p><strong>Objetivo:</strong> Empurre as caixas até os locais marcados ou indicados no mapa.</p>

    <h2>🧠 Regras importantes</h2>
    <p>O personagem apenas empurra as caixas.</p>
    <p>Planeje bem os movimentos: se empurrar a caixa para um canto sem saída, talvez não consiga mais movê-la.</p>
    <p><strong>Vitória:</strong> Você vence a fase quando todas as caixas estiverem posicionadas corretamente nos locais indicados.</p>

    <p><strong>Divirta-se resolvendo os desafios e pensando nas melhores estratégias para completar cada nível!</strong></p>


    <button @click="voltar" class="botaoSecundario">Voltar</button>
  </div>
</template>

<script>
import '@/styles/telaTutorial.css';

export default {
  methods: {
    voltar() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>
