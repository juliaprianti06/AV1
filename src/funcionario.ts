import { NivelPermissao } from "./enum";
export default class Funcionario{
    id:string
    nome:string
    telefone:string
    endereco:string
    usuario:string
    senha:string
    nivelPermissao:NivelPermissao

constructor(id:string, nome:string, telefone:string, endereco:string, usuario:string, senha:string, nivelPermissao: NivelPermissao){
    this.id = id
    this.nome = nome
    this.telefone = telefone
    this.endereco = endereco
    this.usuario = usuario
    this.senha = senha
    this.nivelPermissao = nivelPermissao
}
public autenticar(senha: string): boolean {
  return this.senha === senha
}
exibirDetalhes(): void {
    console.log(`Funcionário: ${this.id} | Nome: ${this.nome} | Telefone: ${this.telefone} | Endereço: ${this.endereco} | Nível: ${this.nivelPermissao}`);
  }
    }


