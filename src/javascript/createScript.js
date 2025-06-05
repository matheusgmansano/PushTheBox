import { mover } from './movimentacaoPersonagem.js';
import { verificarVitoria } from './checagemVitoria.js';
import { configurarAudio } from './audio.js';
import { iniciarCronometro, pararCronometro } from './timer.js';
import { classeParaPosicao } from './gameLogic.js';
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
            this.audioDerrota = new Audio('/public/audio/somDerrota.mp3');
            this.audioDerrota.volume = 0.3;
            this.audioVitoria = new Audio('/public/audio/somVitoria.mp3');
            this.audioVitoria.volume = 0.3;  // Ajuste também
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
                return classeParaPosicao(this.mapa[y][x]);
            },

            iniciarCronometro() {
                let tempoRestante = tempoLimiteSegundos;
                this.cronometro = tempoRestante;

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
            },

            voltar() {
                pararCronometro(this.intervaloCronometro);
                this.$router.push('/');
            },

            // Função para processar o movimento do jogador.
            processarMovimento(event) {
                if (!this.jogoAtivo) return;

                this.mapa = mover(this.mapa, event);

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