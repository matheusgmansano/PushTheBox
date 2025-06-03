<script>
import { mapa1 } from '@/mapas/mapa1.js';
import createScript from '@/scripts/jogo';
import '@/styles/elementosMapa.css';
import '@/styles/body.css';
import '@/styles/botoes.css';
import '@/styles/telaVitoria.css';

export default createScript(mapa1, '/fase2');
</script>

<template>

  <title>Fase 1</title>
  <button @click="voltar" class="botaoVoltar">INÍCIO</button>

  <!-- falta adicionar cronometro -->
  <div class="tela">
    <h1>Fase 1</h1>
    <div class="mapa">
      <div v-for="(linha, y) in mapa" :key="y" class="linha">
        <div v-for="(celula, x) in linha" :key="x" :class="getClasse(y, x)">

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

</template>

<style></style>