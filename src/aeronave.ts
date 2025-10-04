import { TipoAeronave } from "./enum";
import Peca from "./peca";
import Etapa from "./etapa";
import Teste from "./teste";

export default class Aeronave {
    public codigo: string;
    public modelo: string;
    public tipo: TipoAeronave;
    public capacidade: number;
    public alcance: number;
    public pecas: Peca[];
    public etapas: Etapa[];
    public teste: Teste[];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number, pecas: Peca[], etapas: Etapa[], teste: Teste[]) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = pecas;
        this.etapas = etapas;
        this.teste = teste;
    }

  exibirDetalhes(): void {
    console.log(`Aeronave: ${this.codigo} | Modelo: ${this.modelo} | Tipo: ${this.tipo} | Capacidade: ${this.capacidade} | Alcance: ${this.alcance}`);
  }
}
