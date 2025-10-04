"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
var fs = __importStar(require("fs"));
var Relatorio = /** @class */ (function () {
    function Relatorio() {
    }
    Relatorio.gerarRelatorioEntrega = function (aeronave, cliente, dataEntrega) {
        var conteudo = "=== RELAT\u00D3RIO DE ENTREGA DE AERONAVE ===\n\n";
        conteudo += "Cliente: ".concat(cliente, "\n");
        conteudo += "Data de Entrega: ".concat(dataEntrega.toLocaleDateString("pt-BR"), "\n");
        conteudo += "----------------------------------------\n\n";
        conteudo += "=== Ficha T\u00E9cnica da Aeronave: ".concat(aeronave.modelo, " ===\n");
        conteudo += "C\u00F3digo: ".concat(aeronave.codigo, "\n");
        conteudo += "Tipo: ".concat(aeronave.tipo, "\n");
        conteudo += "Capacidade: ".concat(aeronave.capacidade, " passageiros\n");
        conteudo += "Alcance: ".concat(aeronave.alcance, " km\n");
        conteudo += "\n=== Etapas de Produ\u00E7\u00E3o (".concat(aeronave.etapas.length, ") ===\n");
        aeronave.etapas.forEach(function (etapa) {
            conteudo += "- ".concat(etapa.nome, " (Status: ").concat(etapa.status, ")\n");
        });
        conteudo += "\n=== Pe\u00E7as Associadas (".concat(aeronave.pecas.length, ") ===\n");
        aeronave.pecas.forEach(function (peca) {
            conteudo += "- ".concat(peca.nome, " (Fornecedor: ").concat(peca.fornecedor, ", Status: ").concat(peca.status, ")\n");
        });
        conteudo += "\n=== Testes Realizados (".concat(aeronave.teste.length, ") ===\n");
        aeronave.teste.forEach(function (teste) {
            conteudo += "- Teste ".concat(teste.tipo, ": ").concat(teste.resultado, "\n");
        });
        conteudo += "\n----------------------------------------\n";
        conteudo += "Relat\u00F3rio gerado em: ".concat(new Date().toLocaleString("pt-BR"), "\n");
        return conteudo;
    };
    Relatorio.gerarRelatorio = function (aeronaves, pecas, funcionarios, etapas) {
        var conteudo = "=== RELATÓRIO GERAL DO SISTEMA ===\n";
        conteudo += "Total de aeronaves: ".concat(aeronaves.length, "\n");
        conteudo += "Total de pe\u00E7as: ".concat(pecas.length, "\n");
        conteudo += "Total de funcion\u00E1rios: ".concat(funcionarios.length, "\n");
        conteudo += "Total de etapas: ".concat(etapas.length, "\n");
        return conteudo;
    };
    Relatorio.salvarRelatorio = function (conteudo, nomeArquivo) {
        fs.writeFileSync(nomeArquivo, conteudo, "utf-8");
        console.log("\nRelat\u00F3rio salvo com sucesso no arquivo: ".concat(nomeArquivo));
    };
    return Relatorio;
}());
exports.Relatorio = Relatorio;
