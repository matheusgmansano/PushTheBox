export function mover(mapa, event) {
    let direcao = ' ';
    let direcaoObjetivo = ' ';

    let yJogador = -1;
    let xJogador = -1;

    // Loop para encontrar a posição ATUAL do jogador 'P' no mapa.
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (
                mapa[y][x] === 'PE' ||
                mapa[y][x] === 'PD' ||
                mapa[y][x] === 'PF' ||
                mapa[y][x] === 'PC' ||
                mapa[y][x] === 'PCO' ||
                mapa[y][x] === 'PEO' ||
                mapa[y][x] === 'PDO' ||
                mapa[y][x] === 'PFO'
            ) {
                yJogador = y; // Linha
                xJogador = x; // Coluna
                break; // Sai do segundo FOR se o jogador for encontrado
            }
        }
        if (yJogador !== -1) break; // Sai do primeiro FOR se o jogador for encontrado
    }

    // Se não encontrou jogador, retorna mapa original
    if (yJogador === -1 || xJogador === -1) return mapa;

    // Salva o valor da célula antiga antes de alterar o mapa
    let valorCelulaAntiga = mapa[yJogador][xJogador];

    let yNovo = yJogador;
    let xNovo = xJogador;

    // Atualiza as coordenadas da nova posição com base na tecla pressionada.
    switch (event.key) {
        case 'ArrowUp':
            yNovo--;
            direcao = 'PC';
            direcaoObjetivo = 'PCO';
            break;
        case 'ArrowDown':
            yNovo++;
            direcao = 'PF';
            direcaoObjetivo = 'PFO';
            break;
        case 'ArrowLeft':
            xNovo--;
            direcao = 'PE';
            direcaoObjetivo = 'PEO';
            break;
        case 'ArrowRight':
            xNovo++;
            direcao = 'PD';
            direcaoObjetivo = 'PDO';
            break;
        default:
            return mapa;
    }

    // Verifica se a nova posição está dentro dos limites do mapa.
    if (yNovo >= 0 && yNovo < mapa.length && xNovo >= 0 && xNovo < mapa[0].length) {
        let destinoJogador = mapa[yNovo][xNovo];

        // Se o destino for DIFERENTE de parede '#' e bloco 'B' permite a movimentação.
        if (destinoJogador !== '#' && destinoJogador !== 'B' && destinoJogador !== 'X') {
            if (
                valorCelulaAntiga === 'PFO' ||
                valorCelulaAntiga === 'PCO' ||
                valorCelulaAntiga === 'PDO' ||
                valorCelulaAntiga === 'PEO'
            ) {
                mapa[yJogador][xJogador] = 'X'; // volta a ser objetivo
            } else {
                mapa[yJogador][xJogador] = ' '; // volta a ser vazio
            }
            mapa[yNovo][xNovo] = direcao;
        }
        // Caso o destino seja um objetivo 'X'
        else if (destinoJogador === 'X') {
            if (
                valorCelulaAntiga === 'PFO' ||
                valorCelulaAntiga === 'PCO' ||
                valorCelulaAntiga === 'PDO' ||
                valorCelulaAntiga === 'PEO'
            ) {
                mapa[yJogador][xJogador] = 'X';
            } else {
                mapa[yJogador][xJogador] = ' ';
            }
            console.log(direcaoObjetivo);
            mapa[yNovo][xNovo] = direcaoObjetivo;
        }

        // Caso o destino for bloco 'B', tenta empurrar o bloco.
        else if (destinoJogador === 'B') {
            // Calcula a posição logo depois do bloco, na mesma direção da movimentação.
            let yDepoisBloco = yNovo + (yNovo - yJogador);
            let xDepoisBloco = xNovo + (xNovo - xJogador);

            // Verifica se a posição depois do bloco está dentro dos limites do mapa.
            if (yDepoisBloco >= 0 && yDepoisBloco < mapa.length && xDepoisBloco >= 0 && xDepoisBloco < mapa[0].length) {
                let destinoBloco = mapa[yDepoisBloco][xDepoisBloco];

                // Se o espaço depois do bloco não for parede nem outro bloco, permite empurrar.
                if (destinoBloco !== '#' && destinoBloco !== 'B') {
                    mapa[yDepoisBloco][xDepoisBloco] = 'B'; // Move o bloco para a nova direção.
                    mapa[yNovo][xNovo] = direcao; // Move o jogador para onde estava o bloco.

                    // Restaura a célula antiga do jogador corretamente
                    if (
                        valorCelulaAntiga === 'PFO' ||
                        valorCelulaAntiga === 'PCO' ||
                        valorCelulaAntiga === 'PDO' ||
                        valorCelulaAntiga === 'PEO'
                    ) {
                        mapa[yJogador][xJogador] = 'X';
                    } else {
                        mapa[yJogador][xJogador] = ' ';
                    }
                }
            }
        }
    }

    // Retorna uma cópia do mapa atualizado para disparar reatividade.
    return [...mapa];
}