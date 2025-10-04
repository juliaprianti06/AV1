import Aeronave from "./aeronave";
import Teste from "./teste";
import Etapa from "./etapa";
import Funcionario from "./funcionario";
import Peca from "./peca";
import { TipoAeronave, NivelPermissao, TipoPeca, TipoTeste, StatusPeca, ResultadoTeste } from "./enum";
import * as readline from "readline-sync";
import { Relatorio } from "./relatorio";
import * as fs from "fs";

let aeronaves: Aeronave[] = []
let funcionarios: Funcionario[] = []
let pecas: Peca[] = []


function cadastrarAeronave() {
  console.log("\n=== Cadastro de Aeronave ===")
  const codigo = readline.question("Codigo da aeronave: ")

  const existente = aeronaves.find(a => a.codigo === codigo)
  if (existente) {
    console.log(`Ja existe uma aeronave com o código ${codigo}`)
    return
  }
  const modelo = readline.question("Modelo escolhido: ")

  let tipo: TipoAeronave
  while (true) {
    const tipoInput = readline.question("Digite o tipo (1 para COMERCIAL, 2 para MILITAR): ")
    if (tipoInput === "1") {
      tipo = TipoAeronave.COMERCIAL
      break
    } else if (tipoInput === "2") {
      tipo = TipoAeronave.MILITAR
      break
    } else {
      console.log("Opção invalida!")
    }
  }

  const capacidade = readline.questionInt("Numero de passageiros: ")
  const alcance = readline.questionInt("Alcance: ")

  const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance, [], [], [])
  aeronaves.push(aeronave)
  console.log("Aeronave cadastrada com sucesso!")

salvandoDados();
}
function listarAeronaves() {
  console.log("\n=== Lista de Aeronaves ===")
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada")
  } else {
    aeronaves.forEach((a) => a.exibirDetalhes())
  }
}
function login(): Funcionario | null {
  console.log("\n=== LOGIN ===")
  const usuario = readline.question("Usuario: ")
  const senha = readline.question("Senha: ")
  const funcionario = funcionarios.find(f => f.usuario === usuario)

  if (funcionario && funcionario.autenticar(senha)) {
    console.log(`Usuário '${funcionario.usuario}' autenticado com sucesso!`)
    return funcionario
  } else {
    console.log("Usuario ou senha invalidos")
    return null
  }
}
function cadastrarFuncionario() {
  console.log("\n=== Cadastro de Funcionario ===")
  const id = readline.question("ID do funcionario: ")
  const existe = funcionarios.find(f => f.id === id)
  if (existe) {
    console.log(`Ja existe um funcionario com o ID ${id}`)
    return
  }
  const nome = readline.question("Nome Completo: ")
  const telefone = readline.question("Telefone: ")
  const endereco = readline.question("Endereco: ")
  const usuario = readline.question("Usuario cadastrado: ")
  const senha = readline.question("Senha: ")

  let nivel: NivelPermissao
  while (true) {
    console.log("\nSelecione o nivel de permissao:")
    console.log("1. Administrador")
    console.log("2. Engenheiro")
    console.log("3. Operador")
    const nivelInput = readline.question("Escolha: ")

    if (nivelInput === "1") {
      nivel = NivelPermissao.ADMINISTRADOR
      break
    } else if (nivelInput === "2") {
      nivel = NivelPermissao.ENGENHEIRO
      break
    } else if (nivelInput === "3") {
      nivel = NivelPermissao.OPERADOR
      break
    } else {
      console.log("Opcao invalida, tente novamente")
    }
  }

  const func = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel)
  funcionarios.push(func)
  console.log(`Funcionario ${func.nome} cadastrado com sucesso como ${func.nivelPermissao}!`)
  salvandoDados();
}



function listarFuncionarios() {
  console.log("\n=== Lista de Funcionarios ===")
  if (funcionarios.length === 0) {
   console.log("Nenhum funcionario cadastrado.")
  } else {
    funcionarios.forEach((f) => f.exibirDetalhes())
  }
}

function adicionarPeca(aeronave: Aeronave) {
  console.log(`\n=== ADICIONAR NOVA PECA AO ${aeronave.modelo.toUpperCase()} ===`)

  const nome = readline.question("Digite o nome da peca: ")
  const fornecedor = readline.question("Digite o nome do fornecedor: ")

  let tipo: TipoPeca
  while (true) {
    const tipoInput = readline.question("Digite o tipo da peca (1 para NACIONAL, 2 para IMPORTADA): ")
    if (tipoInput === "1") {
      tipo = TipoPeca.NACIONAL
      break
    } else if (tipoInput === "2") {
      tipo = TipoPeca.IMPORTADA
      break
    } else {
      console.log("Opcao invalida. Por favor, digite 1 ou 2")
    }
  }

  const novaPeca = new Peca(nome, tipo, fornecedor, StatusPeca.EM_PRODUCAO)
  aeronave.pecas.push(novaPeca)

  console.log(`Peca "${novaPeca.nome}" adicionada a aeronave ${aeronave.modelo}`)

  salvandoDados()
}

const etapas: Etapa[] = []
function cadastrarEtapa() {
  console.log("\n=== Cadastro de Etapa ===")
  const nome = readline.question("Nome da etapa: ")
  const prazoStr = readline.question("Prazo de entrega (DD/MM/AAAA): ")

  let funcionariosSelecionados: Funcionario[] = []

  if (funcionarios.length > 0) {
    console.log("\nFuncionarios disponiveis:")
    funcionarios.forEach((f, i) => {
      console.log(`${i + 1}. ${f.nome} (ID: ${f.id}, Nivel: ${f.nivelPermissao})`)
    })

    const escolha = readline.question("Digite os numeros dos funcionarios separados por virgula: ")
    const indices = escolha.split(",").map(num => parseInt(num.trim()) - 1)

    funcionariosSelecionados = indices
      .filter(i => i >= 0 && i < funcionarios.length)
      .map(i => funcionarios[i])
  }

  const etapa = new Etapa(nome, prazoStr, funcionariosSelecionados)
  etapas.push(etapa)

  console.log("Etapa cadastrada com sucesso!")
  etapa.exibirDetalhes()
  etapa.listarFuncionarios()
  salvandoDados()
}



function listarEtapas() {
  console.log("\n=== Lista de Etapas ===")
  if (etapas.length === 0) {
    console.log("Nenhuma etapa cadastrada.")
  } else {
    etapas.forEach(e => e.exibirDetalhes())
  }
}
function adicionarTeste(aeronave: Aeronave) {
  console.log(`\n=== ADICIONAR NOVO TESTE AO ${aeronave.modelo.toUpperCase()} ===`)

  let tipo: TipoTeste
  while (true) {
    const tipoInput = readline.question("Digite o tipo do teste (1 = ELETRICO, 2 = HIDRAULICO, 3 = AERODINAMICO): ")
    if (tipoInput === '1') {
      tipo = TipoTeste.ELETRICO
      break
    } else if (tipoInput === '2') {
      tipo = TipoTeste.HIDRAULICO
      break
    } else if (tipoInput === '3') {
      tipo = TipoTeste.AERODINAMICO
      break
    } else {
      console.log("Opcao invalida. Por favor, digite 1, 2 ou 3.")
    }
     salvandoDados()
  }

  let resultado: ResultadoTeste
  while (true) {
      const resultadoInput = readline.question("Digite o resultado do teste (1=APROVADO, 2=REPROVADO): ")
      if (resultadoInput === '1') {
          resultado = ResultadoTeste.APROVADO
          break
      } else if (resultadoInput === '2') {
          resultado = ResultadoTeste.REPROVADO
          break
      } else {
          console.log("Opção invalida. Por favor, digite 1 ou 2.")
      }
  }

    const novoTeste = new Teste(tipo, resultado)
    aeronave.teste.push(novoTeste)

    console.log(`\nTeste do tipo '${tipo}' adicionado com sucesso à aeronave '${aeronave.modelo}'!`)
     salvandoDados()
}
function gerenciarPecas(aeronave: Aeronave) {
  console.log(`\n==== GERENCIAR PEÇAS DE ${aeronave.modelo.toUpperCase()} ====`)

  if (aeronave.pecas.length === 0) {
    console.log("Nenhuma peca cadastrada.")
    return
  }

  let lista = "\nSelecione uma peca:\n"
  aeronave.pecas.forEach((peca, i) => {
    lista += `${i + 1}. ${peca.nome} (Status: ${peca.status})\n`
  })
  console.log(lista)

  const escolha = parseInt(readline.question("Digite o numero da peca: "))
  if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.pecas.length) {
    console.log("Seleção inválida.")
    return
  }

  const peca = aeronave.pecas[escolha - 1]
  console.log(`\n1. ${StatusPeca.EM_PRODUCAO}\n2. ${StatusPeca.EM_TRANSPORTE}\n3. ${StatusPeca.PRONTA}`)
  const acao = readline.question("Novo status: ")

  if (acao === "1") peca.atualizarStatus(StatusPeca.EM_PRODUCAO)
  else if (acao === "2") peca.atualizarStatus(StatusPeca.EM_TRANSPORTE)
  else if (acao === "3") peca.atualizarStatus(StatusPeca.PRONTA)
  else console.log("Opcao invalida.")
 salvandoDados()
}
function gerenciarEtapas(aeronave: Aeronave) {
  console.log(`\n==== GERENCIAR ETAPAS DE ${aeronave.modelo.toUpperCase()} ====`)

  if (aeronave.etapas.length === 0) {
    console.log("Nenhuma etapa cadastrada.")
    return
  }

  let lista = "\nSelecione uma etapa:\n"
  aeronave.etapas.forEach((etapa, i) => {
    lista += `${i + 1}. ${etapa.nome} (Status: ${etapa.status})\n`
  })
  console.log(lista)

  const escolha = parseInt(readline.question("Digite o numero da etapa: "))
  if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.etapas.length) {
    console.log("Seleção inválida.")
    return
  }

  const etapa = aeronave.etapas[escolha - 1]
  console.log(`\n1. Iniciar trabalho\n2. Finalizar trabalho`)
  const acao = readline.question("Escolha: ")

  if (acao === "1") etapa.iniciarEtapa()
  else if (acao === "2") etapa.finalizarEtapa()
  else console.log("Ação inválida.")
    salvandoDados()
}
function gerenciarTestes(aeronave: Aeronave) {
  console.log(`\n==== GERENCIAR TESTES DE ${aeronave.modelo.toUpperCase()} ====`)

  if (aeronave.teste.length === 0) {
    console.log("Nenhum teste cadastrado.")
    return
  }

  let lista = "\nSelecione um teste:\n"
  aeronave.teste.forEach((teste, i) => {
    lista += `${i + 1}. ${teste.tipo} (Resultado: ${teste.resultado})\n`
  })
  console.log(lista)

  const escolha = parseInt(readline.question("Digite o numero do teste: "))
  if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.teste.length) {
    console.log("Seleção inválida.")
    return
  }
  const teste = aeronave.teste[escolha - 1]
  console.log(`\n1. ${ResultadoTeste.APROVADO}\n2. ${ResultadoTeste.REPROVADO}`)
  const acao = readline.question("Novo resultado: ")

  if (acao === "1") teste.resultTeste(ResultadoTeste.APROVADO)
  else if (acao === "2") teste.resultTeste(ResultadoTeste.REPROVADO)
  else console.log("Opcao invalida.")
   salvandoDados()
}
  
function menuPrincipal(aeronaves: Aeronave[]) {
  while (true) {
    let listaParaEscolha = "\n=== MENU PRINCIPAL ===\n"
    listaParaEscolha += "0. Sair\n"
    aeronaves.forEach((aeronave, index) => {
      listaParaEscolha += `${index + 1}. Código: ${aeronave.codigo}, Modelo: ${aeronave.modelo}\n`
    })
    console.log(listaParaEscolha)

    const escolhaInput = readline.question("Digite o numero da aeronave que deseja acessar (ou 0 para sair): ")
    const escolhaNum = parseInt(escolhaInput)

    if (escolhaNum === 0) {
      console.log("Encerrando o programa...")
      break
    }

    if (!isNaN(escolhaNum) && escolhaNum > 0 && escolhaNum <= aeronaves.length) {
      const aeronaveSelecionada = aeronaves[escolhaNum - 1]
      gerenciarAeronave(aeronaveSelecionada);
    } else {
      console.log("Opção inválida. Tente novamente")
    }
  }
}
function gerenciarAeronave(aeronave: Aeronave) {
  while (true) {
    console.log(`\n=== GERENCIAR AERONAVE ${aeronave.modelo.toUpperCase()} ===`)
    console.log("1. Adicionar Etapa")
    console.log("2. Gerenciar Etapas")
    console.log("3. Adicionar Peça")
    console.log("4. Gerenciar Peças")
    console.log("5. Adicionar Teste")
    console.log("6. Gerenciar Testes")
    console.log("0. Voltar")

    const opcao = readline.question("Escolha uma opcao: ")

    switch (opcao) {
      case "1":
        cadastrarEtapa()
        const etapaRecente = etapas[etapas.length - 1]
        if (etapaRecente) aeronave.etapas.push(etapaRecente)
        break
      case "2":
        gerenciarEtapas(aeronave)
        break
      case "3":
        adicionarPeca(aeronave)
        break
      case "4":
        gerenciarPecas(aeronave)
        break
      case "5":
        adicionarTeste(aeronave)
        break
      case "6":
        gerenciarTestes(aeronave)
        break
      case "0":
        return
      default:
        console.log("Opção inválida.")
    }
  }
}

function gerarRelatorioAeronave() {
  if (aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada.")
    return
  }

  console.log("\n=== SELECIONE UMA AERONAVE ===")
  aeronaves.forEach((a, i) =>
    console.log(`${i + 1}. ${a.modelo} (${a.codigo})`)
  );

  const escolha = readline.questionInt("Digite o numero da aeronave: ")
  if (escolha <= 0 || escolha > aeronaves.length) {
    console.log("Seleção inválida.")
    return
  }

  const aeronaveSelecionada = aeronaves[escolha - 1]
  const cliente = readline.question("Nome do cliente: ")
  const dataEntregaStr = readline.question("Data de entrega (dd/mm/aaaa): ")
  const [dia, mes, ano] = dataEntregaStr.split("/").map(Number)
  const dataEntrega = new Date(ano, mes - 1, dia)

  const conteudo = Relatorio.gerarRelatorioEntrega(
    aeronaveSelecionada,
    cliente,
    dataEntrega
  );

  console.log("\n=== RELATÓRIO ===\n")
  console.log(conteudo)

  const nomeArquivo = `relatorio_entrega_${aeronaveSelecionada.codigo}.txt`
  Relatorio.salvarRelatorio(conteudo, nomeArquivo)
}
function salvandoDados() {
  const data = {
    aeronaves,
    funcionarios,
    pecas,
    etapas
  };
  fs.writeFileSync("database.json", JSON.stringify(data, null, 2), "utf-8");
  console.log("Dados salvos");
}
function carregarDados() {
  console.log("Carregando dados do arquivo...");

  if (fs.existsSync("database.json")) {
    const dataString = fs.readFileSync("database.json", "utf-8");
    const data = JSON.parse(dataString);
    if (data.aeronaves) {
      data.aeronaves.forEach((aeronaveData: any) => {
        const novaAeronave = new Aeronave(
          aeronaveData.codigo,
          aeronaveData.modelo,
          aeronaveData.tipo,
          aeronaveData.capacidade,
          aeronaveData.alcance,
          [], 
          [], 
          []  
        )

        if (aeronaveData.pecas) {
          novaAeronave.pecas = aeronaveData.pecas.map((pecaData: any) =>
            new Peca(pecaData.nome, pecaData.tipo, pecaData.fornecedor, pecaData.status)
          )
        }

        if (aeronaveData.etapas) {
          novaAeronave.etapas = aeronaveData.etapas.map((etapaData: any) => {
            return new Etapa(etapaData.nome, etapaData.prazo, etapaData.status)
          })
        }

        if (aeronaveData.testes) {
          novaAeronave.teste = aeronaveData.testes.map((testeData: any) =>
            new Teste(testeData.tipo, testeData.resultado)
          )
        }

        aeronaves.push(novaAeronave)
      })
    }

    if (data.funcionarios) {
      data.funcionarios.forEach((funcData: any) => {
        const novoFuncionario = new Funcionario(
          funcData.id,
          funcData.nome,
          funcData.telefone,
          funcData.endereco,
          funcData.usuario,
          funcData.senha,
          funcData.nivelPermissao
        );
        funcionarios.push(novoFuncionario)
      });
    }

    console.log("Dados carregados com sucesso!")
  } else {
    console.log("Nenhum banco de dados encontrado")
  }
}
function inicio(): Funcionario | null {
  while (true) {
    console.log("\n=== BEM-VINDO AO SISTEMA ===")
    console.log("1. Fazer login")
    console.log("2. Cadastrar novo funcionario")
    console.log("0. Sair")

    const escolha = readline.question("Escolha uma opcao: ")

    if (escolha === "1") {
      if (funcionarios.length === 0) {
        console.log("Nao ha funcionarios cadastrados. Cadastre um primeiro.")
      } else {
        const user = login()
        if (user) return user
      }
    } 
    else if (escolha === "2") {
      cadastrarFuncionario()
    } 
    else if (escolha === "0") {
      return null
    } 
    else {
      console.log("Opcao invalida.")
    }
  }
}


function main() {
  carregarDados(); 
  const usuarioLogin = inicio();  
  if (!usuarioLogin) {
    console.log("Saindo do sistema...")
    return
  }
  console.log(`\nBem-vindo, ${usuarioLogin.nome}! | Nivel: ${usuarioLogin.nivelPermissao}`)
  let sair = false;
  while (!sair) {
    console.log("\n=== MENU PRINCIPAL ===")
    console.log("1. Cadastrar aeronave")
    console.log("2. Listar aeronaves")
    console.log("3. Gerenciamento de aeronaves")
    console.log("4. Gerar relatório")
    console.log("5. Listar funcionarios")
    console.log("0. Sair")

    const opcao = readline.question("Escolha uma opcao: ")

    switch (opcao) {
      case "1":
        cadastrarAeronave()
        break
      case "2":
        listarAeronaves()
        break
      case "3":
        if (aeronaves.length === 0) {
          console.log("Nenhuma aeronave cadastrada")
        } else {
          menuPrincipal(aeronaves) 
        }
        break
      case "4":
        gerarRelatorioAeronave()
        break
      case "5":
        listarFuncionarios()
        break
      case "0":
        salvandoDados()
        sair = true
        console.log("Saindo do sistema...")
        break
      default:
        console.log("Opcao invalida")
    }
  }
}
main();
