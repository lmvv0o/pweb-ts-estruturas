const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha === '') {
            continue;
        }
        const valorNormalizado = linha.replace(',', '.');
        const preco = Number(valorNormalizado);
        if (isNaN(preco) || preco <= 0) {
            ignorados++;
            continue;
        }
        precos.push(preco);
        if (precos.length === 20) {
            break;
        }
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    let soma = 0;
    for (let i = 0; i < precos.length; i++) {
        soma += precos[i];
    }
    return soma;
}
function calcularDesconto(total, arg2) {
    if (typeof arg2 === 'number') {
        return (total * arg2) / 100;
    }
    else {
        switch (arg2.toUpperCase()) {
            case 'BEMVINDO':
                return total * 0.1;
            case 'PROMO20':
                return total * 0.2;
            case 'MENOS15':
                return total >= 100 ? 15 : 0;
            default:
                return 0;
        }
    }
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const checkboxFidelidade = document.getElementById('fidelidade');
const botaoFechar = document.getElementById('fechar');
const elementoResultado = document.getElementById('resultado');
botaoFechar.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        elementoResultado.className = 'erro';
        elementoResultado.textContent = 'Nenhum item válido';
        return;
    }
    const subtotal = somarItens(...precos);
    const textoCupom = campoCupom.value.trim();
    let descontoCupom = 0;
    let mensagemCupom = '';
    if (textoCupom !== '') {
        const cupomUpper = textoCupom.toUpperCase();
        if (cupomUpper === 'BEMVINDO' || cupomUpper === 'PROMO20') {
            descontoCupom = calcularDesconto(subtotal, cupomUpper);
            mensagemCupom = `Cupom ${cupomUpper}: - ${formatarReal(descontoCupom)}`;
        }
        else if (cupomUpper === 'MENOS15') {
            if (subtotal >= 100) {
                descontoCupom = calcularDesconto(subtotal, cupomUpper);
                mensagemCupom = `Cupom ${cupomUpper}: - ${formatarReal(descontoCupom)}`;
            }
            else {
                mensagemCupom = 'Cupom inválido ou não aplicável';
            }
        }
        else {
            mensagemCupom = 'Cupom inválido ou não aplicável';
        }
    }
    const valorComCupom = Math.max(0, subtotal - descontoCupom);
    let descontoFidelidade = 0;
    let mensagemFidelidade = '';
    if (checkboxFidelidade.checked) {
        descontoFidelidade = calcularDesconto(valorComCupom, 5);
        mensagemFidelidade = `Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`;
    }
    const totalAPagar = Math.max(0, valorComCupom - descontoFidelidade);
    const textoItens = `${precos.length} ${precos.length === 1 ? 'item' : 'itens'}`;
    const textoIgnorados = ignorados > 0
        ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
        : '';
    let saida = `Itens: ${textoItens}${textoIgnorados}\n`;
    saida += `Subtotal: ${formatarReal(subtotal)}\n`;
    if (mensagemCupom !== '') {
        saida += `${mensagemCupom}\n`;
    }
    if (mensagemFidelidade !== '') {
        saida += `${mensagemFidelidade}\n`;
    }
    saida += `Total a pagar: ${formatarReal(totalAPagar)}`;
    elementoResultado.className = 'sucesso';
    elementoResultado.textContent = saida;
});
export {};
//# sourceMappingURL=ex05.js.map