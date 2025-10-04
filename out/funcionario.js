"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Funcionario = /** @class */ (function () {
    function Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
    Funcionario.prototype.autenticar = function (senha) {
        return this.senha === senha;
    };
    Funcionario.prototype.exibirDetalhes = function () {
        console.log("Funcion\u00E1rio: ".concat(this.id, " | Nome: ").concat(this.nome, " | Telefone: ").concat(this.telefone, " | Endere\u00E7o: ").concat(this.endereco, " | N\u00EDvel: ").concat(this.nivelPermissao));
    };
    return Funcionario;
}());
exports.default = Funcionario;
