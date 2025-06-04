export function classeParaPosicao(tipoCelula) {
    if (tipoCelula === '#') return 'parede';
    if (tipoCelula === 'P') return 'jogador';
    if (tipoCelula === 'B') return 'bloco';
    if (tipoCelula === 'X') return 'objetivo';
    // if (tipoCelula === 'JO') return 'jogadorObjetivo';
    // if (tipoCelula === 'BO') return 'blocoObjetivo';
    return 'vazio';
}