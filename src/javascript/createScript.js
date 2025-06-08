import { mover } from './movimentacaoPersonagem.js';
import { verificarVitoria } from './checagemVitoria.js';
import { configurarAudio } from './audio.js';
import { iniciarCronometro, pararCronometro } from './timer.js';
import { classeParaPosicao as mapearClasse } from './gameLogic.js';
import { clonarMapa } from './clonarMapa.js';

export default function createScript(mapaInicial, proximaFase, tempoLimiteSegundos) {
    return {
        data() {
            return {
                mapa1: mapaInicial,
                mapa: [],
                mensagem: '',
                mostrarProximaFase: false,
                mostrarDerrota: false,
                tipoDerrota: '', // 'tempo', 'buraco', etc.
                cronometro: 0,
                intervaloCronometro: null,
                jogoAtivo: true,
                audio: null,
                audioDerrota: null,
                audioVitoria: null,
            };
        },

        mounted() {
            this.mapa = clonarMapa(this.mapa1);
            window.addEventListener('keydown', this.processarMovimento);
            this.iniciarCronometro();
            this.audio = configurarAudio();
            this.audioDerrota = new Audio('/audio/somDerrota.mp3');
            this.audioDerrota.volume = 0.3;
            this.audioVitoria = new Audio('/audio/somVitoria.mp3');
            this.audioVitoria.volume = 0.3;  // Ajuste também
            console.log(this.mapa)//teste
        },

        beforeUnmount() {
            window.removeEventListener('keydown', this.processarMovimento);
            pararCronometro(this.intervaloCronometro);
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }

            if (this.audioDerrota) {
                this.audioDerrota.pause();
                this.audioDerrota.currentTime = 0;

            }
            if (this.audioVitoria) {
                this.audioVitoria.pause();
                this.audioVitoria.currentTime = 0;
            }


        },

        methods: {
            classeParaPosicao(y, x) {
                const atual = this.mapa[y][x];
                const base = this.mapa1[y][x];

                if (atual === 'B' && base === 'X') return 'blocoObjetivo';
                if ((atual === 'PE' || atual === 'PD' || atual === 'PC' || atual === 'PF') && base === 'X') return 'jogadorObjetivo';
                if (atual === 'JO') return 'jogadorObjetivo';

                if (atual === 'B') return 'bloco';
                if (atual === 'PD') return 'personagemDireita';
                if (atual === 'PE') return 'personagemEsquerda';
                if (atual === 'PF') return 'personagemFrente';
                if (atual === 'PC') return 'personagemCostas';

                if (base === '#') return 'parede';
                if (base === 'X') return 'objetivo';
                if (base === 'BV') return 'blocoVazio';

                return 'vazio';
            },

            iniciarCronometro() {
                let tempoRestante = tempoLimiteSegundos;
                this.cronometro = tempoRestante;
                this.tipoDerrota = 'tempo'; // PARA A TELA DE DERROTA SER POR TEMPO CASO APENAS ACABE

                this.intervaloCronometro = setInterval(() => {
                    tempoRestante--;
                    this.cronometro = tempoRestante;

                    if (tempoRestante <= 0) {
                        clearInterval(this.intervaloCronometro);
                        this.mostrarDerrota = true;
                        this.jogoAtivo = false;

                        //PARA A MUSICA PRINCIPAL QUANDO ACABA O TEMPO
                        if (this.audio) {
                            this.audio.pause();
                            this.audio.currentTime = 0;
                        }

                        // COMECA A TOCAR O SOM DE DERROTA
                        if (this.audioDerrota) {
                            this.audioDerrota.play();
                        }
                    }
                }, 1000);
            },

            reiniciar() {
                this.mapa = clonarMapa(this.mapa1);
                this.mostrarProximaFase = false;
                this.mostrarDerrota = false;
                this.cronometro = 0;
                pararCronometro(this.intervaloCronometro);
                this.iniciarCronometro();
                this.jogoAtivo = true;

                if (this.audio) {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    this.audio.play();
                }

                if (this.audioVitoria) {
                    this.audioVitoria.pause();
                    this.audioVitoria.currentTime = 0;
                }
                if (this.audioDerrota) {
                    this.audioDerrota.pause();
                    this.audioDerrota.currentTime = 0;
                }
            },

            voltar() {
                pararCronometro(this.intervaloCronometro);
                this.$router.push('/');
            },

            // Função para processar o movimento do jogador.
            processarMovimento(event) {
                if (!this.jogoAtivo) return;

                const novoMapa = mover(this.mapa, event);
                this.mapa = novoMapa;

                for (let y = 0; y < novoMapa.length; y++) {
                    for (let x = 0; x < novoMapa[y].length; x++) {
                        if ((novoMapa[y][x] === 'PE' || novoMapa[y][x] === 'PD' || novoMapa[y][x] === 'PC' || novoMapa[y][x] === 'PF') && this.mapa1[y][x] === 'BV') {  //CASO PERSONAGEM CAIA NA buraco
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                            this.tipoDerrota = 'buraco';  // PARA SABER QUE SERA A TELA DE DERROTA DO BURACO

                            pararCronometro(this.intervaloCronometro);

                            // Para música principal
                            if (this.audio) {
                                this.audio.pause();
                                this.audio.currentTime = 0;
                            }

                            // Toca som de derrota
                            if (this.audioDerrota) {
                                this.audioDerrota.play();
                            }

                            return;
                        }

                        if (novoMapa[y][x] === 'B' && this.mapa1[y][x] === 'BV') {  //CASO BLOCO SEJA EMPURRADO PARA BURACO
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                            this.tipoDerrota = 'buraco';   //PARA SABER QUE SERA A TELA DE DERROTA DA BURACO

                            pararCronometro(this.intervaloCronometro);

                            if (this.audio) {
                                this.audio.pause();
                                this.audio.currentTime = 0;
                            }

                            if (this.audioDerrota) {
                                this.audioDerrota.play();
                            }

                            return;
                        }
                    }
                }

                this.mapa = novoMapa;

                if (verificarVitoria(this.mapa, this.mapa1)) {
                    this.mensagem = 'Parabéns!';
                    this.mostrarProximaFase = true;
                    this.jogoAtivo = false;
                    pararCronometro(this.intervaloCronometro);

                    // Para a música principal
                    if (this.audio) {
                        this.audio.pause();
                        this.audio.currentTime = 0;
                    }

                    // Toca som de vitória
                    if (this.audioVitoria) {
                        this.audioVitoria.play();
                    }
                }
            },

            irParaProximaFase() {
                this.mostrarProximaFase = false;
                this.$router.push(proximaFase);
            }
        }
    }
}