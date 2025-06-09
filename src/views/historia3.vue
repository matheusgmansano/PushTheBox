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
          @click="voltarMenu"
          class="botaoHistoria"
        >
          🏁 Voltar ao Menu
        </button>
        <button
          v-if="mostrarBotao"
          @click="historiaEXTRA"
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
export default {
  data() {
    return {
      dialogo: [],
      falasOriginais: [
        {
          personagem: 'chefe',
          texto: 'Bom... contra todas as expectativas, você conseguiu terminar tudo.'
        },
        {
          personagem: 'chefe',
          texto: 'Caixas empurradas, buracos evitados, nenhum prejuízo grande... é, vai ver você não é tão incompetente assim.'
        },
        {
          personagem: 'chefe',
          texto: 'Como recompensa... tome esse vale-refeição de R$ 15,00. Mas só vale na lanchonete aqui da frente, e não cobre a bebida.'
        },
        {
          personagem: 'empurrilson',
          texto: 'Só isso?! Depois de tudo que eu fiz?!'
        },
        {
          personagem: 'chefe',
          texto: 'Reclama com o RH. Agora sai da minha frente, que eu tenho mais gente pra explorar... digo, coordenar.'
        },
        {
          personagem: 'empurrilson',
          texto: '...'
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
    voltarMenu() {
      this.$router.push('/');
    },
    historiaEXTRA() {
      this.$router.push('/historiaEXTRA');
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