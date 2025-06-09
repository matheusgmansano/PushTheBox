// Importações de módulos responsáveis por diferentes partes do jogo.
import { mover } from './movimentacaoPersonagem.js'; // Função que processa o movimento do personagem.
import { verificarVitoria } from './checagemVitoria.js'; // Função que verifica se o jogador venceu.
import { tocarMusica, pararMusica } from './audio.js'; // Funções para controlar a música do jogo.
import { iniciarCronometro, pararCronometro } from './timer.js'; // Cronômetro do jogo.
import { classeParaPosicao as mapearClasse } from './gameLogic.js'; // Mapeia caracteres do mapa para classes CSS.
import { clonarMapa } from './clonarMapa.js'; // Função para copiar o estado inicial do mapa.

// Função que cria e retorna o objeto com a estrutura do componente Vue da fase
export default function createScript(mapaInicial, proximaFase, tempoLimiteSegundos) {
    return {
        data() {
            return {
                mapa1: mapaInicial, // Mapa original da fase, ou seja, não alterado.
                mapa: [], // Mapa atual, alterado com o movimento do jogador.
                mensagem: '', // Mensagem de vitória OU derrota.
                mostrarProximaFase: false, // Exibe botão para ir à próxima fase.
                mostrarDerrota: false, // Exibe tela de derrota.
                tipoDerrota: '', // Tipo de derrota: 'tempo', 'buraco', etc.
                cronometro: 0, // Tempo restante.
                intervaloCronometro: null, // Referência ao setInterval.
                jogoAtivo: true, // Flag que determina se o jogo está ativo.
                audioDerrota: null, // Objeto de som para derrota.
                audioVitoria: null // Objeto de som para vitória.
            };
        },

        mounted() {
            // Clona o mapa inicial para o mapa atual
            this.mapa = clonarMapa(this.mapa1);
            window.addEventListener('keydown', this.processarMovimento); // Processa as teclas pressionadas
            this.iniciarCronometro(); // Começa o cronômetro da fase

            // Inicializa a música principal da fase
            tocarMusica('/audio/easy-theme/main_theme_01.wav', 0.2);

            // Sons de derrota e vitória
            this.audioDerrota = new Audio('/audio/somDerrota.mp3');
            this.audioDerrota.volume = 0.3;

            this.audioVitoria = new Audio('/audio/somVitoria.mp3');
            this.audioVitoria.volume = 0.3;
        },

        beforeUnmount() {
            // Remove o processo de verificar as teclas pressionadas
            window.removeEventListener('keydown', this.processarMovimento);
            pararCronometro(this.intervaloCronometro); // Para o cronômetro
            pararMusica(); // Para a música principal

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
            // Retorna a classe CSS com base na posição atual e na posição original do mapa
            classeParaPosicao(y, x) {
                const atual = this.mapa[y][x];
                const base = this.mapa1[y][x];

                // Se tem bloco sobre objetivo
                if (atual === 'B' && base === 'X') return 'blocoObjetivo';

                // Personagem sobre objetivo
                if (atual === 'PD' && base === 'X') return 'personagemDireitaObjetivo';
                if (atual === 'PE' && base === 'X') return 'personagemEsquerdaObjetivo';
                if (atual === 'PC' && base === 'X') return 'personagemCostasObjetivo';
                if (atual === 'PF' && base === 'X') return 'personagemFrenteObjetivo';
                if (atual === 'PDO' && base === 'X') return 'personagemDireitaObjetivo';
                if (atual === 'PEO' && base === 'X') return 'personagemEsquerdaObjetivo';
                if (atual === 'PCO' && base === 'X') return 'personagemCostasObjetivo';
                if (atual === 'PFO' && base === 'X') return 'personagemFrenteObjetivo';

                // Classes normais
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

            // Inicia o cronômetro e verifica derrota por tempo
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

            // Reinicia o estado da fase
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

            // Volta para a tela inicial
            voltar() {
                pararCronometro(this.intervaloCronometro);
                this.$router.push('/');
            },

            // Processa o movimento do jogador ao pressionar uma tecla
            processarMovimento(event) {
                if (!this.jogoAtivo) return;

                const novoMapa = mover(this.mapa, event);
                this.mapa = novoMapa;

                // Verifica se o personagem ou bloco caiu no buraco
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

                // Verifica se o jogador venceu a fase
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

            // Vai para a próxima fase usando o Vue Router
            irParaProximaFase() {
                this.mostrarProximaFase = false;
                this.$router.push(proximaFase);
            }
        }
    }
}
