/**
 * src/javascript/audio.js
 *
 * Este módulo controla a reprodução de músicas do jogo.
 * Fornece funções para tocar e parar músicas de fundo por fase.
 */

let audioPlayer = null; // Variável global para armazenar o áudio atual
let musicaMutada = false;

/**
 * Alterna entre mutar e desmutar a música atual
 * @returns {boolean} - Estado atual do mute (true = mutado)
 */
export function toggleMute() {
    musicaMutada = !musicaMutada;

    if (audioPlayer) {
        audioPlayer.volume = musicaMutada ? 0 : 0.2;
    }

    return musicaMutada;
}

/**
 * Verifica se a música está mutada
 * @returns {boolean}
 */
export function estaMutada() {
    return musicaMutada;
}

/**
 * Função para tocar a música de fundo da fase
 * @param {string} src - Caminho do arquivo de áudio (ex.: '/audio/easy-theme/main_theme_01.wav')
 * @param {number} volume - Volume da música (0.0 a 1.0)
 */
export function tocarMusica(src = '/audio/easy-theme/main_theme_01.wav', volume = 0.2) {
    // Se já existir música tocando, para antes de iniciar a nova
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer = null;
    }

    // Cria o novo objeto de áudio com as configurações
    audioPlayer = new Audio(src);
    audioPlayer.loop = true;
    audioPlayer.volume = volume;

    // Por questões de permissão do navegador, toca após o primeiro clique do jogador
    const iniciarMusica = () => {
        audioPlayer.play();
        document.removeEventListener('click', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);
}

/**
 * Função para parar a música atual
 */
export function pararMusica() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer = null;
    }
}
