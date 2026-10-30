type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas: string[] = texto.split('\n');
  const precos: number[] = [];
  let ignorados: number = 0;

  for (let i: number = 0; i < linhas.length; i++) {
    const linha: string = linhas[i].trim();
    if (linha === '') {
      continue;
    }

    const valorNormalizado: string = linha.replace(',', '.');
    const preco: number = Number(valorNormalizado);

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

function somarItens(...precos: number[]): number {
  let soma: number = 0;
  for (let i: number = 0; i < precos.length; i++) {
    soma += precos[i];
  }
  return soma;
}

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, arg2: number | string): number {
  if (typeof arg2 === 'number') {
    return (total * arg2) / 100;
  } else {
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

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const checkboxFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botaoFechar = document.getElementById('fechar') as HTMLButtonElement;
const elementoResultado = document.getElementById('resultado') as HTMLElement;

botaoFechar.addEventListener('click', (): void => {
  const { precos, ignorados } = lerPrecos(campoItens.value);

  if (precos.length === 0) {
    elementoResultado.className = 'erro';
    elementoResultado.textContent = 'Nenhum item válido';
    return;
  }

  const subtotal: number = somarItens(...precos);
  const textoCupom: string = campoCupom.value.trim();
  let descontoCupom: number = 0;
  let mensagemCupom: string = '';

  if (textoCupom !== '') {
    const cupomUpper: string = textoCupom.toUpperCase();
    if (cupomUpper === 'BEMVINDO' || cupomUpper === 'PROMO20') {
      descontoCupom = calcularDesconto(subtotal, cupomUpper);
      mensagemCupom = `Cupom ${cupomUpper}: - ${formatarReal(descontoCupom)}`;
    } else if (cupomUpper === 'MENOS15') {
      if (subtotal >= 100) {
        descontoCupom = calcularDesconto(subtotal, cupomUpper);
        mensagemCupom = `Cupom ${cupomUpper}: - ${formatarReal(descontoCupom)}`;
      } else {
        mensagemCupom = 'Cupom inválido ou não aplicável';
      }
    } else {
      mensagemCupom = 'Cupom inválido ou não aplicável';
    }
  }

  const valorComCupom: number = Math.max(0, subtotal - descontoCupom);
  let descontoFidelidade: number = 0;
  let mensagemFidelidade: string = '';

  if (checkboxFidelidade.checked) {
    descontoFidelidade = calcularDesconto(valorComCupom, 5);
    mensagemFidelidade = `Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`;
  }

  const totalAPagar: number = Math.max(0, valorComCupom - descontoFidelidade);

  const textoItens: string = `${precos.length} ${precos.length === 1 ? 'item' : 'itens'}`;
  const textoIgnorados: string =
    ignorados > 0
      ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
      : '';

  let saida: string = `Itens: ${textoItens}${textoIgnorados}\n`;
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
