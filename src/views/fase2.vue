<script>
import { mapa2 } from '@/mapas/mapa2.js';
import createScript from '@/scripts/jogo';
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';
import '@/styles/telaDerrota.css';

export default createScript(mapa2, '/fase3', 10);
</script>

<template>

  <title>Fase 2</title>
  <button @click="voltar" class="botaoVoltar">INÍCIO</button>

  <div class="tela">
    <h1>Fase 2</h1>
    <p>{{ cronometro }}</p>
    <div class="mapa">
      <div v-for="(linha, y) in mapa" :key="y" class="linha">
        <div v-for="(tipoCelula, x) in linha" :key="x" :class="classeParaPosicao(y, x)">

        </div>
      </div>
    </div>
    <button @click="reiniciar" class="botaoReiniciar">Reiniciar</button>
  </div>

  <div v-if="mostrarProximaFase" class="telaVitoria">
    <div class="janela">
      <h2>Fase Concluída!</h2>
      <button @click="irParaProximaFase" class="botaoVitoria">Próxima Fase</button>
      <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
      <button @click="voltar" class="botaoVitoria">Menu</button>
    </div>
  </div>

  <div v-if="mostrarDerrota" class="telaDerrota">
  <div class="janela">
    <h2>Tempo Esgotado!</h2>
    <button @click="reiniciar" class="botaoVitoria">Reiniciar</button>
    <button @click="voltar" class="botaoVitoria">Menu</button>
  </div>
</div>

</template>

<style>

</style>