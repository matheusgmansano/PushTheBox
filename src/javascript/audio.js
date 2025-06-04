export function configurarAudio(src = '/audio/easy-theme/main_theme_01.wav', volume = 0.2) {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;

    const iniciarMusica = () => {
        audio.play();
        document.removeEventListener('click', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);

    return audio;
}