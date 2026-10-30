type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.8;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
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

function mensagemBandeira(bandeira: Bandeira): string {
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

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const selectTipo = document.getElementById('tipo') as HTMLSelectElement;
const selectBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botaoCalcular = document.getElementById('calcular') as HTMLButtonElement;
const elementoResultado = document.getElementById('resultado') as HTMLElement;

botaoCalcular.addEventListener('click', (): void => {
  const consumo: number = campoConsumo.valueAsNumber;

  if (isNaN(consumo) || consumo <= 0) {
    elementoResultado.className = 'erro';
    elementoResultado.textContent = 'Informe um consumo válido';
    return;
  }

  const tipo: TipoCliente = selectTipo.value as TipoCliente;
  const bandeira: Bandeira = selectBandeira.value as Bandeira;

  const tarifa: number = tarifaPorKwh(tipo);
  const valorEnergia: number = consumo * tarifa;
  const valorAdicional: number = adicionalBandeira(consumo, bandeira);
  const total: number = valorEnergia + valorAdicional;
  const mensagem: string = mensagemBandeira(bandeira);

  elementoResultado.className = bandeira !== 'verde' ? 'alerta' : '';
  elementoResultado.textContent =
    `Energia: R$ ${valorEnergia.toFixed(2)}\n` +
    `Bandeira ${bandeira}: R$ ${valorAdicional.toFixed(2)}\n` +
    `Total: R$ ${total.toFixed(2)}\n` +
    `${mensagem}`;
});
