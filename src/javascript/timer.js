export function iniciarCronometro(acaoFinal, tempoLimiteSegundos) {
    let cronometro = 0; // Contador de segundos passados.
    const intervalo = setInterval(() => {
        cronometro++; // Incrementa na variável cronometro a cada segundo.

        // Quando o cronômetro atingir ou ultrapassar o tempo limite, para o intervalo e executa a ação final.
        if (cronometro >= tempoLimiteSegundos) {
            clearInterval(intervalo);
            acaoFinal();
        }
    }, 1000); // 1000 ms = 1s.

    return { intervalo, cronometro };
}

// Função para parar o cronômetro com base no intervalo.
export function pararCronometro(intervalo) {
    if (intervalo) clearInterval(intervalo);
}