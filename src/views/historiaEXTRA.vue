<template>
  <title>Fim do Jogo</title>

  <div class="container">
    <div class="celular">
      <div class="topo">Chefe Malvado</div>
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
          @click="faseEXTRA"
          class="botaoHistoria"
        >
          😫 Fazer HORA-EXTRA
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/historia.css';
import faseEXTRA from './faseEXTRA.vue';
export default {
  data() {
    return {
      dialogo: [],
      falasOriginais: [
        {
          personagem: 'chefe',
          texto: 'Tenho uma oportunidade imperdível para você rapaz!!!'
        },
        {
          personagem: 'empurrilson',
          texto: 'Lá vem você me explorar de novo...'
        },
        {
          personagem: 'chefe',
          texto: 'O que você pensa que eu sou?? Um carrasco?.'
        },
        {
          personagem: 'empurrilson',
          texto: '...'
        },
        {
          personagem: 'chefe',
          texto: 'Enfim... Hora Extra!!!'
        },
        {
          personagem: 'empurrilson',
          texto: 'Não sei se to afim... Ia tirar um tempo com minha família.'
        },
        {
          personagem: 'chefe',
          texto: 'Não quero saber, trabalhe ou RUA!!!!!!!'
        },
      ],
      mostrarBotao: false,
      audioRecebimentoPool: [],
      audioEnvioPool: [],
      audioPoolIndex: 0,
    };
  },
  mounted() {
    for (let i = 0; i < 5; i++) {
      const audioReceb = new Audio('/audio/recebimento.mp3');
      audioReceb.volume = 0.3;
      this.audioRecebimentoPool.push(audioReceb);

      const audioEnv = new Audio('/audio/envio.mp3');
      audioEnv.volume = 0.3;
      this.audioEnvioPool.push(audioEnv);
    }
    this.exibirDialogo();
  },
  methods: {
    voltarMenu() {
      this.$router.push('/');
    },
    async exibirDialogo() {
      for (let i = 0; i < this.falasOriginais.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.dialogo.push(this.falasOriginais[i]);

        let audioToPlay;
        if (i === this.falasOriginais.length - 2) {
          audioToPlay = this.audioEnvioPool[this.audioPoolIndex];
        } else {
          audioToPlay = this.audioRecebimentoPool[this.audioPoolIndex];
        }

        audioToPlay.currentTime = 0;
        audioToPlay.play();
        this.audioPoolIndex = (this.audioPoolIndex + 1) % this.audioRecebimentoPool.length;
      }
      this.mostrarBotao = true;
    }
  }
};
</script>

<style scoped>

</style>