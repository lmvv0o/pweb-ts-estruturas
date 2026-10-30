function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return '';
    }
}
// Teste do parâmetro padrão (Tarefa 8):
// Chamada sem informar bandeira assume o valor padrão 'verde'.
// Resultado no console: 0. Motivo: bandeira 'verde' não possui adicional (R$ 0,00 por kWh).
console.log(adicionalBandeira(100));
const campoConsumo = document.getElementById('consumo');
const selectTipo = document.getElementById('tipo');
const selectBandeira = document.getElementById('bandeira');
const botaoCalcular = document.getElementById('calcular');
const elementoResultado = document.getElementById('resultado');
botaoCalcular.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    if (isNaN(consumo) || consumo <= 0) {
        elementoResultado.className = 'erro';
        elementoResultado.textContent = 'Informe um consumo válido';
        return;
    }
    const tipo = selectTipo.value;
    const bandeira = selectBandeira.value;
    const tarifa = tarifaPorKwh(tipo);
    const valorEnergia = consumo * tarifa;
    const valorAdicional = adicionalBandeira(consumo, bandeira);
    const total = valorEnergia + valorAdicional;
    const mensagem = mensagemBandeira(bandeira);
    elementoResultado.className = bandeira !== 'verde' ? 'alerta' : '';
    elementoResultado.textContent =
        `Energia: R$ ${valorEnergia.toFixed(2)}\n` +
            `Bandeira ${bandeira}: R$ ${valorAdicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            `${mensagem}`;
});
export {};
//# sourceMappingURL=ex02.js.map