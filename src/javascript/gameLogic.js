export function classeParaPosicao(tipoCelula) {
    if (tipoCelula === '#') return 'parede';
    if (tipoCelula === 'B') return 'bloco';
    if (tipoCelula === 'X') return 'objetivo';
    if (tipoCelula === 'JO') return 'jogadorObjetivo';
    if (tipoCelula === 'L') return 'lava';

    if (tipoCelula === 'PD') return 'personagemDireita';
    if (tipoCelula === 'PE') return 'personagemEsquerda';
    if (tipoCelula === 'PF') return 'personagemFrente';
    if (tipoCelula === 'PC') return 'personagemCostas';

    return 'vazio';
}