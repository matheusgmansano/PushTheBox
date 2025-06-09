<template>
  <div class="tela-creditos">

    <h1>Créditos</h1>

    <h2>Desenvolvido por:</h2>
    <p>Davi Bomfim Climaco</p>
    <p>Matheus Gregorio Mansano</p>
    <p>Matheus De Oliveira Mascarello</p>
    <p>Talis de Mello Sossai</p>
    <p>Heitor Henrique Couto Silva</p>

    <h2>Engenharia de Software</h2>
    <p>Turma C - 3º Semestre</p>

    <h2>Professor</h2>
    <p>Hugo Fumero</p>
    <div class="fundo-imagens">
      <img src="@/assets/fundo2.png" class="fundo2-img" />
    </div>

    <h2>Design e arte</h2>
    <p>Equipe Push the Box</p>

    <p><strong>Obrigado por jogar!</strong></p>

    <button @click="voltar" class="botaoSecundario">Voltar</button>
  </div>
</template>

<script>
import '@/styles/telaCreditos.css';

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
