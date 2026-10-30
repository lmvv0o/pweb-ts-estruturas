type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

const formatarMeses = (meses: number): string => {
  const anos: number = Math.floor(meses / 12);
  const restoMeses: number = meses % 12;

  const textoAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses: string = `${restoMeses} ${restoMeses === 1 ? 'mês' : 'meses'}`;

  if (anos > 0 && restoMeses > 0) {
    return `${textoAnos} e ${textoMeses}`;
  } else if (anos > 0) {
    return textoAnos;
  } else {
    return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  }
};

function calcularMeses(
  meta: number,
  deposito: number,
  taxa: number = 0.5
): { meses: number; saldo: number; depositado: number } {
  let saldo: number = 0;
  let depositado: number = 0;
  let meses: number = 0;

  while (saldo < meta) {
    meses++;
    saldo = saldo * (1 + taxa / 100);
    const depositoMes: number = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo += depositoMes;
    depositado += depositoMes;

    if (meses >= 600) {
      break;
    }
  }

  return { meses, saldo, depositado };
}

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botaoCalcular = document.getElementById('calcular') as HTMLButtonElement;
const elementoResultado = document.getElementById('resultado') as HTMLElement;

botaoCalcular.addEventListener('click', (): void => {
  const meta: number = campoMeta.valueAsNumber;
  const deposito: number = campoDeposito.valueAsNumber;
  const textoTaxa: string = campoTaxa.value.trim();

  if (isNaN(meta) || isNaN(deposito) || meta <= 0 || deposito <= 0) {
    elementoResultado.className = 'erro';
    elementoResultado.textContent = 'Informe valores positivos';
    return;
  }

  let resultadoCalculo: { meses: number; saldo: number; depositado: number };

  if (textoTaxa === '') {
    resultadoCalculo = calcularMeses(meta, deposito);
  } else {
    const taxa: number = campoTaxa.valueAsNumber;
    if (isNaN(taxa) || taxa < 0) {
      elementoResultado.className = 'erro';
      elementoResultado.textContent = 'Informe valores positivos';
      return;
    }
    resultadoCalculo = calcularMeses(meta, deposito, taxa);
  }

  if (resultadoCalculo.saldo >= meta) {
    elementoResultado.className = 'sucesso';
    const tempoFormatado: string = formatarMeses(resultadoCalculo.meses);
    const rendimento: number = resultadoCalculo.saldo - resultadoCalculo.depositado;

    elementoResultado.textContent =
      `Você atinge a meta em ${resultadoCalculo.meses} meses (${tempoFormatado}).\n` +
      `${exibirValor('Saldo final', resultadoCalculo.saldo, formatarReal)}\n` +
      `${exibirValor('Total depositado', resultadoCalculo.depositado, formatarReal)}\n` +
      `${exibirValor('Rendimento', rendimento, formatarReal)}`;
  } else {
    elementoResultado.className = 'erro';
    elementoResultado.textContent =
      `Meta inalcançável em 50 anos. Saldo após 600 meses: ${formatarReal(resultadoCalculo.saldo)}`;
  }
});
