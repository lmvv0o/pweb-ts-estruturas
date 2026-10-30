function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * (1.02 ** parcelas);
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado: number = preco;
  if (typeof entrada !== 'undefined') {
    financiado = preco - entrada;
  }

  let linhasHtml: string = '';

  for (let parcelas: number = 1; parcelas <= 12; parcelas++) {
    if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
      continue;
    }

    const total: number = calcularTotal(financiado, parcelas);
    const valorParcela: number = total / parcelas;

    if (valorParcela < 50.0) {
      break;
    }

    const jurosTexto: string = parcelas <= 3 ? 'sem juros' : '2% a.m.';

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

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botaoSimular = document.getElementById('simular') as HTMLButtonElement;
const elementoResultado = document.getElementById('resultado') as HTMLElement;
const tabelaParcelas = document.getElementById('parcelas') as HTMLElement;

botaoSimular.addEventListener('click', (): void => {
  const preco: number = campoPreco.valueAsNumber;
  const textoEntrada: string = campoEntrada.value.trim();

  if (isNaN(preco) || preco <= 0) {
    elementoResultado.className = 'erro';
    elementoResultado.textContent = 'Informe um preço válido.';
    tabelaParcelas.innerHTML = '';
    return;
  }

  elementoResultado.className = '';

  if (textoEntrada !== '') {
    const entrada: number = campoEntrada.valueAsNumber;
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

    const financiado: number = preco - entrada;
    elementoResultado.textContent = `Preço R$ ${preco.toFixed(2)} com entrada de R$ ${entrada.toFixed(2)} (valor financiado: R$ ${financiado.toFixed(2)}):`;
    tabelaParcelas.innerHTML = simularParcelamento(preco, entrada);
  } else {
    elementoResultado.textContent = `Preço R$ ${preco.toFixed(2)}, sem entrada (valor financiado: R$ ${preco.toFixed(2)}):`;
    tabelaParcelas.innerHTML = simularParcelamento(preco);
  }
});
