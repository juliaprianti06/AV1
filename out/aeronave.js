"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Aeronave = /** @class */ (function () {
    function Aeronave(codigo, modelo, tipo, capacidade, alcance, pecas, etapas, teste) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = pecas;
        this.etapas = etapas;
        this.teste = teste;
    }
    Aeronave.prototype.exibirDetalhes = function () {
        console.log("Aeronave: ".concat(this.codigo, " | Modelo: ").concat(this.modelo, " | Tipo: ").concat(this.tipo, " | Capacidade: ").concat(this.capacidade, " | Alcance: ").concat(this.alcance));
    };
    return Aeronave;
}());
exports.default = Aeronave;
