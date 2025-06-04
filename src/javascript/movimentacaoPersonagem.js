export function mover(mapa, event) {
    let yJogador = -1;
    let xJogador = -1;

    // Loop para encontrar a posição ATUAL do jogador 'P' no mapa.
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === 'P') {
                yJogador = y; // Linha
                xJogador = x; // Coluna
                break; // Sai do segundo FOR se o jogador for encontrado
            }
        }
        if (yJogador !== -1) break; // Sai do primeiro FOR se o jogador for encontrado
    }

    // IF utilizado com o objetivo de parar a execução e evitar erros, caso o jogador não seja encontrado.
    // Retorna o mapa original sem alterações.
    if (yJogador === -1 || xJogador === -1) return mapa;

    let yNovo = yJogador;
    let xNovo = xJogador;

    // Atualiza as coordenadas da nova posição com base na tecla pressionada.
    switch (event.key) {
        case 'ArrowUp':
            yNovo--;
            break;
        case 'ArrowDown':
            yNovo++;
            break;
        case 'ArrowLeft':
            xNovo--;
            break;
        case 'ArrowRight':
            xNovo++;
            break;
    }

    // Verifica se a nova posição está dentro dos limites do mapa.
    if (yNovo >= 0 && yNovo < mapa.length && xNovo >= 0 && xNovo < mapa[0].length) {
        let destinoJogador = mapa[yNovo][xNovo];

        // Se o destino for DIFERENTE de parede '#' e bloco 'B' permite a movimentação.
        if (destinoJogador !== '#' && destinoJogador !== 'B') {
            mapa[yJogador][xJogador] = ' ';
            mapa[yNovo][xNovo] = 'P';
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
                    mapa[yNovo][xNovo] = 'P'; // Move o jogador para onde estava o bloco.
                    mapa[yJogador][xJogador] = ' '; // Limpa ' ' a posição antiga do jogador.
                }
            }
        }
    }

    // Retorna uma cópia do mapa atualizado.
    return [...mapa];
}