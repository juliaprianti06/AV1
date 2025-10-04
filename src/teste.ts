import { TipoTeste } from "./enum";
import { ResultadoTeste } from "./enum";

export default class Teste{
    tipo:TipoTeste
    resultado:ResultadoTeste

constructor(tipo:TipoTeste, resultado: ResultadoTeste){
    this.tipo = tipo
    this.resultado = resultado

}
resultTeste(novoResultado: ResultadoTeste): void {
    this.resultado = novoResultado;
    console.log(`Resultado do teste "${this.tipo}" atualizado para: ${this.resultado}`);
  }

  exibirDetalhes(): string {
    return `Teste: ${this.tipo} | Resultado: ${this.resultado}`;
  }

  salvar(): void {
    console.log(this.exibirDetalhes());
  }
}

