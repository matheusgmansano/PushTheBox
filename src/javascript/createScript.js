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
                tipoDerrota: '', // 'tempo', 'lava', etc.
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
                return mapearClasse(this.mapa[y][x]);
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
                        if (novoMapa[y][x] === 'P' && this.mapa1[y][x] === 'L') {  //CASO PERSONAGEM CAIA NA LAVA
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                            this.tipoDerrota = 'lava';  //PARA SABER QUE SERA A TELA DE DERROTA DA LAVA

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

                 if (novoMapa[y][x] === 'B' && this.mapa1[y][x] === 'L') {  //CASO BLOCO SEJA EMPURRADO PARA LAVA
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                             this.tipoDerrota = 'lava';   //PARA SABER QUE SERA A TELA DE DERROTA DA LAVA

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