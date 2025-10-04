"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var Etapa = /** @class */ (function () {
    function Etapa(nome, prazo, funcionarios, status) {
        this.status = enum_1.StatusEtapa.PENDENTE;
        this.funcionarios = [];
        this.nome = nome;
        this.prazo = prazo;
        this.funcionarios = funcionarios;
        if (status) {
            this.status = status;
        }
    }
    Etapa.prototype.associarFuncionario = function (funcionario) {
        this.funcionarios.push(funcionario);
        console.log("Funcionario '".concat(funcionario.nome, "' associado a etapa '").concat(this.nome, "'"));
    };
    Etapa.prototype.listarFuncionarios = function () {
        console.log("\n=== Funcionarios da Etapa: ".concat(this.nome, " ==="));
        this.funcionarios.forEach(function (func) {
            console.log("- ID: ".concat(func.id, ", Nome: ").concat(func.nome));
        });
        console.log("----------------------------------------");
    };
    Etapa.prototype.iniciarEtapa = function () {
        if (this.status === enum_1.StatusEtapa.PENDENTE) {
            this.status = enum_1.StatusEtapa.ANDAMENTO;
            console.log("Etapa \"".concat(this.nome, "\" iniciada"));
        }
        else {
            console.log("Nao e possivel iniciar, status atual: ".concat(this.status));
        }
    };
    Etapa.prototype.finalizarEtapa = function () {
        if (this.status === enum_1.StatusEtapa.ANDAMENTO) {
            this.status = enum_1.StatusEtapa.CONCLUIDA;
            console.log("Etapa \"".concat(this.nome, "\" concluida"));
        }
        else {
            console.log("Nao e possivel finalizar, status atual: ".concat(this.status));
        }
    };
    Etapa.prototype.exibirDetalhes = function () {
        console.log("Etapa salva: ".concat(this.nome, " | Prazo: ").concat(this.prazo, " | Status: ").concat(this.status));
    };
    return Etapa;
}());
exports.default = Etapa;
