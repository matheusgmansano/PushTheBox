export default function createScript(mapaInicial, proximaFase) {
    return {
        data() {
            return {
                mapa1: mapaInicial, // Mapa original da fase
                mapa: [], 
                mensagem: '', // Mensagem que será exibida ao jogador, ao concluir a fase
                mostrarProximaFase: false // Caso seja true, o painel de vitória será exibido
            };
        },

        mounted() {
            this.mostrarProximaFase = false; // Garante que a tela de vitória não apareça
            this.mapa = this.mapa1.map(row => row.map(cell => cell.trim()));
            // Clona o mapa inicial
            window.addEventListener('keydown', this.mover);
            // Usado para detectar o movimento do teclado
        },

        beforeUnmount() {
            window.removeEventListener('keydown', this.mover);
        },

        methods: {
            // Define a classe CSS de cada cédula, com base no seu conteúdo
            // ou seja, # sempre retornará parede
            getClasse(y, x) {
                const celula = this.mapa[y][x];
                if (celula === '#') return 'parede';
                if (celula === 'P') return 'jogador';
                if (celula === 'B') return 'bloco';
                if (celula === 'X') return 'objetivo';
                if (celula === ' ') return 'blocoObjetivo';
                if (celula === ' ') return 'jogadorObjetivo';
                return 'vazio';
            },

            // Reinicia a fase, restaurando o mapa original
            reiniciar() {
                this.mapa = this.mapa1.map(row => [...row]); // Clona o mapa original
                this.mostrarProximaFase = false; // Oculta a tela de vitória
                this.mensagem = ''; // Limpa a mensagem de vitória
            },

            // Volta para a tela inicial
            voltar() {
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
                    let destino = this.mapa[yNovo][xNovo];

                    // Verifica se o destino é vazio ou o objetivo, se não for move o jogador
                    if (destino !== '#' && destino !== 'B') {
                        this.mapa[yJogador][xJogador] = ' ';
                        this.mapa[yNovo][xNovo] = 'P';
                        this.mapa = [...this.mapa];
                    } else if (destino === 'B') {
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
