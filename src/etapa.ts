import Funcionario from "./funcionario"
import { StatusEtapa } from "./enum"

export default class Etapa {
  nome: string
  prazo: string
  status: StatusEtapa = StatusEtapa.PENDENTE
  funcionarios: Funcionario[] = []

  constructor(nome: string, prazo: string, funcionarios: Funcionario[], status?: StatusEtapa) {
    this.nome = nome
    this.prazo = prazo
    this.funcionarios = funcionarios
    if (status) {
      this.status = status
    }
  }

  public associarFuncionario(funcionario: Funcionario) {
    this.funcionarios.push(funcionario)
    console.log(`Funcionario '${funcionario.nome}' associado a etapa '${this.nome}'`)
  }

  public listarFuncionarios() {
    console.log(`\n=== Funcionarios da Etapa: ${this.nome} ===`)
    this.funcionarios.forEach(func => {
      console.log(`- ID: ${func.id}, Nome: ${func.nome}`)
    })
    console.log(`----------------------------------------`)
  }

  iniciarEtapa(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO
      console.log(`Etapa "${this.nome}" iniciada`)
    } else {
      console.log(`Nao e possivel iniciar, status atual: ${this.status}`)
    }
  }

  finalizarEtapa(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA
      console.log(`Etapa "${this.nome}" concluida`)
    } else {
      console.log(`Nao e possivel finalizar, status atual: ${this.status}`)
    }
  }

  exibirDetalhes(): void {
    console.log(`Etapa salva: ${this.nome} | Prazo: ${this.prazo} | Status: ${this.status}`)
  }
}
