export function verificarVitoria(mapa, mapaOriginal) {
    let blocosCorretos = 0;
    let totalObjetivos = 0;

    for (let y = 0; y < mapaOriginal.length; y++) {
        for (let x = 0; x < mapaOriginal[y].length; x++) {
            if (mapaOriginal[y][x] === 'X') {
                totalObjetivos++;
                if (mapa[y][x] === 'B') {
                    blocosCorretos++;
                }
            }
        }
    }

    return blocosCorretos === totalObjetivos;
}