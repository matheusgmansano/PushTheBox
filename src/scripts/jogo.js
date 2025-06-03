export default function createScript(mapaInicial, proximaFase, tempoLimiteSegundos) {
    return {
        data() {
            return {
                mapa1: mapaInicial, // Mapa original da fase
                mapa: [], 
                mensagem: '', // Mensagem que será exibida ao jogador, ao concluir a fase
                mostrarProximaFase: false, // Caso seja true, o painel de vitória será exibido
                cronometro: 0,
                intervaloCronometro: null
            };
        },

        mounted() {
    // Configuração inicial do mapa
    this.mostrarProximaFase = false; // Garante que a tela de vitória não apareça
    this.mapa = this.mapa1.map(row => row.map(cell => cell.trim())); // Clona o mapa inicial
    window.addEventListener('keydown', this.mover); // Detecta movimento do teclado
    this.iniciarCronometro(); // Inicia o cronômetro

    // Configuração do áudio
    this.audio = new Audio('/audio/easy-theme/main_theme_01.wav'); // Ajuste o caminho se necessário
    this.audio.loop = true;
    this.audio.volume = 0.5;

    const iniciarMusica = () => {
      this.audio.play();
      document.removeEventListener('click', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);
  },

  beforeUnmount() {
    // Remover eventos e parar cronômetro
    window.removeEventListener('keydown', this.mover);
    this.pararCronometro();

    // Parar áudio
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  },


        methods: {
            // Define a classe CSS de cada cédula, com base no seu conteúdo
            // ou seja, # sempre retornará parede
            classeParaPosicao(y, x) {
                const tipoCelula = this.mapa[y][x];
                if (tipoCelula === '#') return 'parede';
                if (tipoCelula === 'P') return 'jogador';
                if (tipoCelula === 'B') return 'bloco';
                if (tipoCelula === 'X') return 'objetivo';
                // if (tipoCelula === 'BO') return 'blocoObjetivo';
                // if (tipoCelula === 'JO') return 'jogadorObjetivo';
                return 'vazio';
            },

            iniciarCronometro() {
                if (this.intervaloCronometro) clearInterval(this.intervaloCronometro);

                this.intervaloCronometro = setInterval(() => {
                    this.cronometro++;

                    if (this.cronometro >= tempoLimiteSegundos) {
                        this.reiniciar();
                    }
                }, 1000);
            },


            pararCronometro() {
                if (this.intervaloCronometro) {
                    clearInterval(this.intervaloCronometro);
                    this.intervaloCronometro = null;
                }
            },

            // Reinicia a fase, restaurando o mapa original
            reiniciar() {
                this.mapa = this.mapa1.map(row => [...row]);
                this.mostrarProximaFase = false;
                this.cronometro = 0;
                this.pararCronometro();
                this.iniciarCronometro();
            },

            // Volta para a tela inicial
            voltar() {
                this.pararCronometro();
                this.$router.push('/');
            },

            // Movimentação do jogador
            mover(event) {

                let yJogador = -1;
                let xJogador = -1;

                // Localiza a posição ATUAL jogador
                for (let y = 0; y < this.mapa.length; y++) {
                    for (let x = 0; x < this.mapa[y].length; x++) {
                        if (this.mapa[y][x] === 'P') {
                            yJogador = y;
                            xJogador = x;
                            break;
                        }
                    }
                    if (yJogador !== -1) break;
                }

                // Caso jogador não for encontrado, interrompe
                if (yJogador === -1 || xJogador === -1) return;

                let yNovo = yJogador;
                let xNovo = xJogador;

                // Analisa qual botão o jogador pressionada e calcula a nova posição
                switch (event.key) {
                    case 'ArrowUp':
                        yNovo = yJogador - 1;
                        break;
                    case 'ArrowDown':
                        yNovo = yJogador + 1;
                        break;
                    case 'ArrowLeft':
                        xNovo = xJogador - 1;
                        break;
                    case 'ArrowRight':
                        xNovo = xJogador + 1;
                        break;
                }

                // Verifica se a posição está dentro dos limites
                if (yNovo >= 0 && yNovo !== this.mapa.length && xNovo >= 0 && xNovo !== this.mapa[0].length) {
                    let destinoJogador = this.mapa[yNovo][xNovo];

                    // Verifica se o destinoJogador é vazio ou o objetivo, se não for move o jogador
                    if (destinoJogador !== '#' && destinoJogador !== 'B') {
                        this.mapa[yJogador][xJogador] = ' ';
                        this.mapa[yNovo][xNovo] = 'P';
                        this.mapa = [...this.mapa];
                    } else if (destinoJogador === 'B') {
                        // Variaveis iniciadas com objetivo de calcular para onde o bloco será empurrado
                        let yDepoisBloco = yNovo + (yNovo - yJogador);
                        let xDepoisBloco = xNovo + (xNovo - xJogador);

                        if (yDepoisBloco >= 0 && yDepoisBloco < this.mapa.length && xDepoisBloco >= 0 && xDepoisBloco < this.mapa[0].length) {
                            let destinoBloco = this.mapa[yDepoisBloco][xDepoisBloco];
                            if (destinoBloco !== '#' && destinoBloco !== 'B') {
                                // Move o bloco e o jogador
                                this.mapa[yDepoisBloco][xDepoisBloco] = 'B';
                                this.mapa[yNovo][xNovo] = 'P';
                                this.mapa[yJogador][xJogador] = ' ';
                                this.mapa = [...this.mapa];
                            }
                        }
                    }
                }
                this.verificarVitoria();
                // Chama a função verificarVitoria toda vez que o jogador faz um movimento
            },

            // Função para verificar se todos os blocos estão nos objetivos 'X'
            verificarVitoria() {
                let blocosCorretos = 0;
                let totalObjetivos = 0;

                for (let y = 0; y < this.mapa1.length; y++) {
                    for (let x = 0; x < this.mapa1[y].length; x++) {
                        if (this.mapa1[y][x] === 'X') {
                            totalObjetivos++;
                            if (this.mapa[y][x] === 'B') {
                                blocosCorretos++;
                            }
                        }
                    }
                }

                // Se todos os blocos estiverem nos objetivos, o jogador vence
                if (blocosCorretos === totalObjetivos) {
                    this.mensagem = 'Parabéns!';
                    this.mostrarProximaFase = true;
                    this.pararCronometro(); // Para o cronometro aqui
                } else {
                    this.mensagem = '';
                    this.mostrarProximaFase = false;
                }
            },

            // Função para avançar para a próxima fase
            irParaProximaFase() {
                this.mostrarProximaFase = false;
                this.$router.push(proximaFase)
            }
        }
    }
}