export function classeParaPosicao(tipoCelula) {
    if (tipoCelula === '#') return 'parede';
    if (tipoCelula === 'B') return 'bloco';
    if (tipoCelula === 'X') return 'objetivo';
    if (tipoCelula === 'BV') return 'blocoVazio';

    // Direções normais
    if (tipoCelula === 'PD') return 'personagemDireita';
    if (tipoCelula === 'PE') return 'personagemEsquerda';
    if (tipoCelula === 'PF') return 'personagemFrente';
    if (tipoCelula === 'PC') return 'personagemCostas';

    // Direções objetivo (personagem em cima do objetivo)
    if (tipoCelula === 'PCO') return 'personagemCostasObjetivo';
    if (tipoCelula === 'PFO') return 'personagemFrenteObjetivo';
    if (tipoCelula === 'PDO') return 'personagemDireitaObjetivo';
    if (tipoCelula === 'PEO') return 'personagemEsquerdaObjetivo';

    return 'vazio';
}