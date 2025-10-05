import * as fs from "fs";
import Aeronave from "./aeronave";
import Peca from "./peca";
import Funcionario from "./funcionario";
import Etapa from "./etapa";

export class Relatorio {
 
  public static gerarRelatorioEntrega(aeronave: Aeronave, cliente: string, dataEntrega: Date): string {
    let conteudo = `=== RELATÓRIO DE ENTREGA DE AERONAVE ===\n\n`;
    conteudo += `Cliente: ${cliente}\n`;
    conteudo += `Data de Entrega: ${dataEntrega.toLocaleDateString("pt-BR")}\n`;
    conteudo += `----------------------------------------\n\n`;

    conteudo += `=== Ficha Técnica da Aeronave: ${aeronave.modelo} ===\n`;
    conteudo += `Código: ${aeronave.codigo}\n`;
    conteudo += `Tipo: ${aeronave.tipo}\n`;
    conteudo += `Capacidade: ${aeronave.capacidade} passageiros\n`;
    conteudo += `Alcance: ${aeronave.alcance} km\n`;

    conteudo += `\n=== Etapas de Produção (${aeronave.etapas.length}) ===\n`;
    aeronave.etapas.forEach(etapa => {
      conteudo += `- ${etapa.nome} (Status: ${etapa.status})\n`;
    });

    conteudo += `\n=== Peças Associadas (${aeronave.pecas.length}) ===\n`;
    aeronave.pecas.forEach(peca => {
      conteudo += `- ${peca.nome} (Fornecedor: ${peca.fornecedor}, Status: ${peca.status})\n`;
    });

    conteudo += `\n=== Testes Realizados (${aeronave.teste.length}) ===\n`;
    aeronave.teste.forEach(teste => {
      conteudo += `- Teste ${teste.tipo}: ${teste.resultado}\n`;
    });

    conteudo += `\n----------------------------------------\n`;
    conteudo += `Relatório gerado em: ${new Date().toLocaleString("pt-BR")}\n`;

    return conteudo;
  }

  
  public static gerarRelatorio(
    aeronaves: Aeronave[],
    pecas: Peca[],
    funcionarios: Funcionario[],
    etapas: Etapa[]
  ): string {
    let conteudo = "=== RELATÓRIO GERAL DO SISTEMA ===\n";
    conteudo += `Total de aeronaves: ${aeronaves.length}\n`;
    conteudo += `Total de peças: ${pecas.length}\n`;
    conteudo += `Total de funcionários: ${funcionarios.length}\n`;
    conteudo += `Total de etapas: ${etapas.length}\n`;
    return conteudo;
  }

  public static salvarRelatorio(conteudo: string, nomeArquivo: string): void {
  const pasta = "relatorios"

  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta)
  }

  const caminhoCompleto = `${pasta}/${nomeArquivo}`
  fs.writeFileSync(caminhoCompleto, conteudo, "utf-8")
  console.log(`\nRelatorio salvo com sucesso em: ${caminhoCompleto}`)
}
}

