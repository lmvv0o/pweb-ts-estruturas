const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const restoMeses = meses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const textoMeses = `${restoMeses} ${restoMeses === 1 ? 'mês' : 'meses'}`;
    if (anos > 0 && restoMeses > 0) {
        return `${textoAnos} e ${textoMeses}`;
    }
    else if (anos > 0) {
        return textoAnos;
    }
    else {
        return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    }
};
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        saldo = saldo * (1 + taxa / 100);
        const depositoMes = meses % 12 === 0 ? deposito * 2 : deposito;
        saldo += depositoMes;
        depositado += depositoMes;
        if (meses >= 600) {
            break;
        }
    }
    return { meses, saldo, depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botaoCalcular = document.getElementById('calcular');
const elementoResultado = document.getElementById('resultado');
botaoCalcular.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    const textoTaxa = campoTaxa.value.trim();
    if (isNaN(meta) || isNaN(deposito) || meta <= 0 || deposito <= 0) {
        elementoResultado.className = 'erro';
        elementoResultado.textContent = 'Informe valores positivos';
        return;
    }
    let resultadoCalculo;
    if (textoTaxa === '') {
        resultadoCalculo = calcularMeses(meta, deposito);
    }
    else {
        const taxa = campoTaxa.valueAsNumber;
        if (isNaN(taxa) || taxa < 0) {
            elementoResultado.className = 'erro';
            elementoResultado.textContent = 'Informe valores positivos';
            return;
        }
        resultadoCalculo = calcularMeses(meta, deposito, taxa);
    }
    if (resultadoCalculo.saldo >= meta) {
        elementoResultado.className = 'sucesso';
        const tempoFormatado = formatarMeses(resultadoCalculo.meses);
        const rendimento = resultadoCalculo.saldo - resultadoCalculo.depositado;
        elementoResultado.textContent =
            `Você atinge a meta em ${resultadoCalculo.meses} meses (${tempoFormatado}).\n` +
                `${exibirValor('Saldo final', resultadoCalculo.saldo, formatarReal)}\n` +
                `${exibirValor('Total depositado', resultadoCalculo.depositado, formatarReal)}\n` +
                `${exibirValor('Rendimento', rendimento, formatarReal)}`;
    }
    else {
        elementoResultado.className = 'erro';
        elementoResultado.textContent =
            `Meta inalcançável em 50 anos. Saldo após 600 meses: ${formatarReal(resultadoCalculo.saldo)}`;
    }
});
export {};
//# sourceMappingURL=ex04.js.map