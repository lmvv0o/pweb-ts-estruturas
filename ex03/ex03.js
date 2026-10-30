function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * (1.02 ** parcelas);
}
function simularParcelamento(preco, entrada) {
    let financiado = preco;
    if (typeof entrada !== 'undefined') {
        financiado = preco - entrada;
    }
    let linhasHtml = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < 50.0) {
            break;
        }
        const jurosTexto = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhasHtml +=
            `<tr>` +
                `<td>${parcelas}x</td>` +
                `<td>R$ ${valorParcela.toFixed(2)}</td>` +
                `<td>R$ ${total.toFixed(2)}</td>` +
                `<td>${jurosTexto}</td>` +
                `</tr>`;
    }
    return linhasHtml;
}
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botaoSimular = document.getElementById('simular');
const elementoResultado = document.getElementById('resultado');
const tabelaParcelas = document.getElementById('parcelas');
botaoSimular.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    const textoEntrada = campoEntrada.value.trim();
    if (isNaN(preco) || preco <= 0) {
        elementoResultado.className = 'erro';
        elementoResultado.textContent = 'Informe um preço válido.';
        tabelaParcelas.innerHTML = '';
        return;
    }
    elementoResultado.className = '';
    if (textoEntrada !== '') {
        const entrada = campoEntrada.valueAsNumber;
        if (isNaN(entrada) || entrada < 0) {
            elementoResultado.className = 'erro';
            elementoResultado.textContent = 'Informe uma entrada válida.';
            tabelaParcelas.innerHTML = '';
            return;
        }
        if (entrada >= preco) {
            elementoResultado.className = 'alerta';
            elementoResultado.textContent = 'A entrada cobre o valor total. Não há parcelas.';
            tabelaParcelas.innerHTML = '';
            return;
        }
        const financiado = preco - entrada;
        elementoResultado.textContent = `Preço R$ ${preco.toFixed(2)} com entrada de R$ ${entrada.toFixed(2)} (valor financiado: R$ ${financiado.toFixed(2)}):`;
        tabelaParcelas.innerHTML = simularParcelamento(preco, entrada);
    }
    else {
        elementoResultado.textContent = `Preço R$ ${preco.toFixed(2)}, sem entrada (valor financiado: R$ ${preco.toFixed(2)}):`;
        tabelaParcelas.innerHTML = simularParcelamento(preco);
    }
});
export {};
//# sourceMappingURL=ex03.js.map