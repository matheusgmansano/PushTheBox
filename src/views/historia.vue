<template>
  <div class="container">
    <div class="celular">
      <div class="topo">Chefe Malvado </div>
      <div class="conversa">
        <div
          v-for="(fala, index) in dialogo"
          :key="index"
          :class="['fala', fala.personagem]"
        >
          <p>{{ fala.texto }}</p>
        </div>
        <button
          v-if="mostrarBotao"
          @click="fase1"
          class="botaoHistoria"
        >
          ✅ Começar o Trabalho
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/historia.css';
export default {
  data() {
    return {
      dialogo: [],
      falasOriginais: [
        {
          personagem: 'chefe',
          texto: 'Você aí! Novo contratado, né? Ótimo... menos um folgado pra eu demitir hoje.',
        },
        {
          personagem: 'chefe',
          texto: 'Aqui no Armazém Geral, sua missão é simples: empurrar as caixas pros lugares marcados com um "X".',
        },
        {
          personagem: 'chefe',
          texto: 'Mas não pense que é fácil! Os corredores são apertados, e se você empurrar errado, já era.',
        },
        {
          personagem: 'empurrilson',
          texto: 'Entendido, chefe! Pode deixar comigo.',
        },
        {
          personagem: 'chefe',
          texto: 'Veremos... Não me faça perder tempo. Agora vá! E lembre-se: sem salário, sem janta!',
        },
      ],
      mostrarBotao: false,
    };
  },
  mounted() {
    this.exibirDialogo();
  },
  methods: {
    fase1() {
      this.$router.push('/fase1');
    },
    async exibirDialogo() {
      for (let i = 0; i < this.falasOriginais.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.dialogo.push(this.falasOriginais[i]);
      }
      this.mostrarBotao = true;
    },
  },
};
</script>

<style scoped>

</style>
