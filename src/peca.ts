import { TipoPeca, StatusPeca } from "./enum";

export default class Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;

  constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca = StatusPeca.EM_PRODUCAO) {
    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
  }

  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
    console.log(`Status da peça "${this.nome}" atualizado para: ${this.status}`);
  }

 
}
