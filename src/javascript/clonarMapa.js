export function clonarMapa(mapa) {
    return mapa.map(row => [...row]);
}