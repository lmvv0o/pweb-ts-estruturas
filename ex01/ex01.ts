function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return (
    !isNaN(n1) &&
    !isNaN(n2) &&
    !isNaN(frequencia) &&
    n1 >= 0 &&
    n1 <= 10 &&
    n2 >= 0 &&
    n2 <= 10 &&
    frequencia >= 0 &&
    frequencia <= 100
  );
}

function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    const notaExame: number = 10 - media;
    return `Exame final (precisa tirar ${notaExame.toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botaoCalcular = document.getElementById('calcular') as HTMLButtonElement;
const elementoResultado = document.getElementById('resultado') as HTMLElement;

botaoCalcular.addEventListener('click', (): void => {
  const nome: string = campoNome.value.trim();
  const n1: number = campoN1.valueAsNumber;
  const n2: number = campoN2.valueAsNumber;
  const freq: number = campoFrequencia.valueAsNumber;

  if (!dadosValidos(n1, n2, freq) || nome === '') {
    elementoResultado.className = 'erro';
    elementoResultado.textContent = 'Dados inválidos';
    return;
  }

  const media: number = calcularMedia(n1, n2);
  const sit: string = situacao(media, freq);

  elementoResultado.className = sit === 'Aprovado' ? 'sucesso' : 'erro';
  elementoResultado.textContent = `${nome}: média ${media.toFixed(1)}. ${sit}`;
});
