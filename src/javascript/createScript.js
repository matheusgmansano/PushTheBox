import { mover } from './movimentacaoPersonagem.js';
import { verificarVitoria } from './checagemVitoria.js';
import { tocarMusica, pararMusica } from './audio.js'; // Importa as funções atualizadas de áudio
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
                audioDerrota: null,
                audioVitoria: null,
            };
        },

        mounted() {
            this.mapa = clonarMapa(this.mapa1);
            window.addEventListener('keydown', this.processarMovimento);
            this.iniciarCronometro();

            // Inicializa a música principal da fase
            // Você pode passar o caminho da música conforme sua lógica
            tocarMusica('/audio/easy-theme/main_theme_01.wav', 0.2);

            // Sons de derrota e vitória
            this.audioDerrota = new Audio('/audio/somDerrota.mp3');
            this.audioDerrota.volume = 0.3;
            this.audioVitoria = new Audio('/audio/somVitoria.mp3');
            this.audioVitoria.volume = 0.3;

            console.log(this.mapa); // Teste
        },

        beforeUnmount() {
            window.removeEventListener('keydown', this.processarMovimento);
            pararCronometro(this.intervaloCronometro);

            // Para a música principal
            pararMusica();

            // Para os sons de vitória e derrota, se estiverem tocando
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
                this.tipoDerrota = 'tempo'; // Para tela de derrota por tempo

                this.intervaloCronometro = setInterval(() => {
                    tempoRestante--;
                    this.cronometro = tempoRestante;

                    if (tempoRestante <= 0) {
                        clearInterval(this.intervaloCronometro);
                        this.mostrarDerrota = true;
                        this.jogoAtivo = false;

                        // Para a música principal
                        pararMusica();

                        // Toca som de derrota
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

                // Reinicia a música principal
                tocarMusica('/audio/easy-theme/main_theme_01.wav', 0.2);

                // Para sons de vitória e derrota, se estiverem tocando
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

            processarMovimento(event) {
                if (!this.jogoAtivo) return;

                const novoMapa = mover(this.mapa, event);
                this.mapa = novoMapa;

                for (let y = 0; y < novoMapa.length; y++) {
                    for (let x = 0; x < novoMapa[y].length; x++) {
                        if ((novoMapa[y][x] === 'PE' || novoMapa[y][x] === 'PD' || novoMapa[y][x] === 'PC' || novoMapa[y][x] === 'PF') && this.mapa1[y][x] === 'BV') {
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                            this.tipoDerrota = 'buraco';
                            pararCronometro(this.intervaloCronometro);

                            pararMusica();

                            if (this.audioDerrota) {
                                this.audioDerrota.play();
                            }

                            return;
                        }

                        if (novoMapa[y][x] === 'B' && this.mapa1[y][x] === 'BV') {
                            this.mostrarDerrota = true;
                            this.jogoAtivo = false;
                            this.tipoDerrota = 'buraco';
                            pararCronometro(this.intervaloCronometro);

                            pararMusica();

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

                    pararMusica();

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
