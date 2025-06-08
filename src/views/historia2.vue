<template>
  <title>Buracos</title>

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
          @click="faseBuraco"
          class="botaoHistoria"
        >
          🕳️ Enfrentar os Buracos
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
          texto: 'Empurrilson, parabéns. Você sobreviveu mais tempo do que eu esperava...'
        },
        {
          personagem: 'chefe',
          texto: 'Mas agora acabou a moleza. O chão do depósito tá... digamos... passando por "melhorias estruturais".'
        },
        {
          personagem: 'chefe',
          texto: 'Tradução: tem buracos por todo lado. Pisa errado, e é tchau e bença.'
        },
        {
          personagem: 'chefe',
          texto: 'Mas ó... as caixas ainda precisam ir pros "X", viu? Buraco ou não, entrega é prioridade!'
        },
        {
          personagem: 'empurrilson',
          texto: 'Buracos?! Isso não é um depósito, é uma armadilha!'
        },
        {
          personagem: 'chefe',
          texto: 'É o que temos. Agora mexa-se, antes que um buraco resolva engolir sua motivação.'
        }
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
    faseBuraco() {
      this.$router.push('/faseBuraco');
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
