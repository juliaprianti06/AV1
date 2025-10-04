"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Teste = /** @class */ (function () {
    function Teste(tipo, resultado) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
    Teste.prototype.resultTeste = function (novoResultado) {
        this.resultado = novoResultado;
        console.log("Resultado do teste \"".concat(this.tipo, "\" atualizado para: ").concat(this.resultado));
    };
    Teste.prototype.exibirDetalhes = function () {
        return "Teste: ".concat(this.tipo, " | Resultado: ").concat(this.resultado);
    };
    Teste.prototype.salvar = function () {
        console.log(this.exibirDetalhes());
    };
    return Teste;
}());
exports.default = Teste;
