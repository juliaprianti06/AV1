"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var Peca = /** @class */ (function () {
    function Peca(nome, tipo, fornecedor, status) {
        if (status === void 0) { status = enum_1.StatusPeca.EM_PRODUCAO; }
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    Peca.prototype.atualizarStatus = function (novoStatus) {
        this.status = novoStatus;
        console.log("Status da pe\u00E7a \"".concat(this.nome, "\" atualizado para: ").concat(this.status));
    };
    return Peca;
}());
exports.default = Peca;
