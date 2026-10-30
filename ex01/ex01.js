function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
function dadosValidos(n1, n2, frequencia) {
    return (!isNaN(n1) &&
        !isNaN(n2) &&
        !isNaN(frequencia) &&
        n1 >= 0 &&
        n1 <= 10 &&
        n2 >= 0 &&
        n2 <= 10 &&
        frequencia >= 0 &&
        frequencia <= 100);
}
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        const notaExame = 10 - media;
        return `Exame final (precisa tirar ${notaExame.toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botaoCalcular = document.getElementById('calcular');
const elementoResultado = document.getElementById('resultado');
botaoCalcular.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const freq = campoFrequencia.valueAsNumber;
    if (!dadosValidos(n1, n2, freq) || nome === '') {
        elementoResultado.className = 'erro';
        elementoResultado.textContent = 'Dados inválidos';
        return;
    }
    const media = calcularMedia(n1, n2);
    const sit = situacao(media, freq);
    elementoResultado.className = sit === 'Aprovado' ? 'sucesso' : 'erro';
    elementoResultado.textContent = `${nome}: média ${media.toFixed(1)}. ${sit}`;
});
export {};
//# sourceMappingURL=ex01.js.map