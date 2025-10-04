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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aeronave_1 = __importDefault(require("./aeronave"));
var teste_1 = __importDefault(require("./teste"));
var etapa_1 = __importDefault(require("./etapa"));
var funcionario_1 = __importDefault(require("./funcionario"));
var peca_1 = __importDefault(require("./peca"));
var enum_1 = require("./enum");
var readline = __importStar(require("readline-sync"));
var relatorio_1 = require("./relatorio");
var fs = __importStar(require("fs"));
var aeronaves = [];
var funcionarios = [];
var pecas = [];
function cadastrarAeronave() {
    console.log("\n=== Cadastro de Aeronave ===");
    var codigo = readline.question("Codigo da aeronave: ");
    var existente = aeronaves.find(function (a) { return a.codigo === codigo; });
    if (existente) {
        console.log("Ja existe uma aeronave com o c\u00F3digo ".concat(codigo));
        return;
    }
    var modelo = readline.question("Modelo escolhido: ");
    var tipo;
    while (true) {
        var tipoInput = readline.question("Digite o tipo (1 para COMERCIAL, 2 para MILITAR): ");
        if (tipoInput === "1") {
            tipo = enum_1.TipoAeronave.COMERCIAL;
            break;
        }
        else if (tipoInput === "2") {
            tipo = enum_1.TipoAeronave.MILITAR;
            break;
        }
        else {
            console.log("Opção invalida!");
        }
    }
    var capacidade = readline.questionInt("Numero de passageiros: ");
    var alcance = readline.questionInt("Alcance: ");
    var aeronave = new aeronave_1.default(codigo, modelo, tipo, capacidade, alcance, [], [], []);
    aeronaves.push(aeronave);
    console.log("Aeronave cadastrada com sucesso!");
    salvandoDados();
}
function listarAeronaves() {
    console.log("\n=== Lista de Aeronaves ===");
    if (aeronaves.length === 0) {
        console.log("Nenhuma aeronave cadastrada");
    }
    else {
        aeronaves.forEach(function (a) { return a.exibirDetalhes(); });
    }
}
function login() {
    console.log("\n=== LOGIN ===");
    var usuario = readline.question("Usuario: ");
    var senha = readline.question("Senha: ");
    var funcionario = funcionarios.find(function (f) { return f.usuario === usuario; });
    if (funcionario && funcionario.autenticar(senha)) {
        console.log("Usu\u00E1rio '".concat(funcionario.usuario, "' autenticado com sucesso!"));
        return funcionario;
    }
    else {
        console.log("Usuario ou senha invalidos");
        return null;
    }
}
function cadastrarFuncionario() {
    console.log("\n=== Cadastro de Funcionario ===");
    var id = readline.question("ID do funcionario: ");
    var existe = funcionarios.find(function (f) { return f.id === id; });
    if (existe) {
        console.log("Ja existe um funcionario com o ID ".concat(id));
        return;
    }
    var nome = readline.question("Nome Completo: ");
    var telefone = readline.question("Telefone: ");
    var endereco = readline.question("Endereco: ");
    var usuario = readline.question("Usuario cadastrado: ");
    var senha = readline.question("Senha: ");
    var nivel;
    while (true) {
        console.log("\nSelecione o nivel de permissao:");
        console.log("1. Administrador");
        console.log("2. Engenheiro");
        console.log("3. Operador");
        var nivelInput = readline.question("Escolha: ");
        if (nivelInput === "1") {
            nivel = enum_1.NivelPermissao.ADMINISTRADOR;
            break;
        }
        else if (nivelInput === "2") {
            nivel = enum_1.NivelPermissao.ENGENHEIRO;
            break;
        }
        else if (nivelInput === "3") {
            nivel = enum_1.NivelPermissao.OPERADOR;
            break;
        }
        else {
            console.log("Opcao invalida, tente novamente");
        }
    }
    var func = new funcionario_1.default(id, nome, telefone, endereco, usuario, senha, nivel);
    funcionarios.push(func);
    console.log("Funcionario ".concat(func.nome, " cadastrado com sucesso como ").concat(func.nivelPermissao, "!"));
    salvandoDados();
}
function listarFuncionarios() {
    console.log("\n=== Lista de Funcionarios ===");
    if (funcionarios.length === 0) {
        console.log("Nenhum funcionario cadastrado.");
    }
    else {
        funcionarios.forEach(function (f) { return f.exibirDetalhes(); });
    }
}
function adicionarPeca(aeronave) {
    console.log("\n=== ADICIONAR NOVA PECA AO ".concat(aeronave.modelo.toUpperCase(), " ==="));
    var nome = readline.question("Digite o nome da peca: ");
    var fornecedor = readline.question("Digite o nome do fornecedor: ");
    var tipo;
    while (true) {
        var tipoInput = readline.question("Digite o tipo da peca (1 para NACIONAL, 2 para IMPORTADA): ");
        if (tipoInput === "1") {
            tipo = enum_1.TipoPeca.NACIONAL;
            break;
        }
        else if (tipoInput === "2") {
            tipo = enum_1.TipoPeca.IMPORTADA;
            break;
        }
        else {
            console.log("Opcao invalida. Por favor, digite 1 ou 2");
        }
    }
    var novaPeca = new peca_1.default(nome, tipo, fornecedor, enum_1.StatusPeca.EM_PRODUCAO);
    aeronave.pecas.push(novaPeca);
    console.log("Peca \"".concat(novaPeca.nome, "\" adicionada a aeronave ").concat(aeronave.modelo));
    salvandoDados();
}
var etapas = [];
function cadastrarEtapa() {
    console.log("\n=== Cadastro de Etapa ===");
    var nome = readline.question("Nome da etapa: ");
    var prazoStr = readline.question("Prazo de entrega (DD/MM/AAAA): ");
    var funcionariosSelecionados = [];
    if (funcionarios.length > 0) {
        console.log("\nFuncionarios disponiveis:");
        funcionarios.forEach(function (f, i) {
            console.log("".concat(i + 1, ". ").concat(f.nome, " (ID: ").concat(f.id, ", Nivel: ").concat(f.nivelPermissao, ")"));
        });
        var escolha = readline.question("Digite os numeros dos funcionarios separados por virgula: ");
        var indices = escolha.split(",").map(function (num) { return parseInt(num.trim()) - 1; });
        funcionariosSelecionados = indices
            .filter(function (i) { return i >= 0 && i < funcionarios.length; })
            .map(function (i) { return funcionarios[i]; });
    }
    var etapa = new etapa_1.default(nome, prazoStr, funcionariosSelecionados);
    etapas.push(etapa);
    console.log("Etapa cadastrada com sucesso!");
    etapa.exibirDetalhes();
    etapa.listarFuncionarios();
    salvandoDados();
}
function listarEtapas() {
    console.log("\n=== Lista de Etapas ===");
    if (etapas.length === 0) {
        console.log("Nenhuma etapa cadastrada.");
    }
    else {
        etapas.forEach(function (e) { return e.exibirDetalhes(); });
    }
}
function adicionarTeste(aeronave) {
    console.log("\n=== ADICIONAR NOVO TESTE AO ".concat(aeronave.modelo.toUpperCase(), " ==="));
    var tipo;
    while (true) {
        var tipoInput = readline.question("Digite o tipo do teste (1 = ELETRICO, 2 = HIDRAULICO, 3 = AERODINAMICO): ");
        if (tipoInput === '1') {
            tipo = enum_1.TipoTeste.ELETRICO;
            break;
        }
        else if (tipoInput === '2') {
            tipo = enum_1.TipoTeste.HIDRAULICO;
            break;
        }
        else if (tipoInput === '3') {
            tipo = enum_1.TipoTeste.AERODINAMICO;
            break;
        }
        else {
            console.log("Opcao invalida. Por favor, digite 1, 2 ou 3.");
        }
        salvandoDados();
    }
    var resultado;
    while (true) {
        var resultadoInput = readline.question("Digite o resultado do teste (1=APROVADO, 2=REPROVADO): ");
        if (resultadoInput === '1') {
            resultado = enum_1.ResultadoTeste.APROVADO;
            break;
        }
        else if (resultadoInput === '2') {
            resultado = enum_1.ResultadoTeste.REPROVADO;
            break;
        }
        else {
            console.log("Opção invalida. Por favor, digite 1 ou 2.");
        }
    }
    var novoTeste = new teste_1.default(tipo, resultado);
    aeronave.teste.push(novoTeste);
    console.log("\nTeste do tipo '".concat(tipo, "' adicionado com sucesso \u00E0 aeronave '").concat(aeronave.modelo, "'!"));
    salvandoDados();
}
function gerenciarPecas(aeronave) {
    console.log("\n==== GERENCIAR PE\u00C7AS DE ".concat(aeronave.modelo.toUpperCase(), " ===="));
    if (aeronave.pecas.length === 0) {
        console.log("Nenhuma peca cadastrada.");
        return;
    }
    var lista = "\nSelecione uma peca:\n";
    aeronave.pecas.forEach(function (peca, i) {
        lista += "".concat(i + 1, ". ").concat(peca.nome, " (Status: ").concat(peca.status, ")\n");
    });
    console.log(lista);
    var escolha = parseInt(readline.question("Digite o numero da peca: "));
    if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.pecas.length) {
        console.log("Seleção inválida.");
        return;
    }
    var peca = aeronave.pecas[escolha - 1];
    console.log("\n1. ".concat(enum_1.StatusPeca.EM_PRODUCAO, "\n2. ").concat(enum_1.StatusPeca.EM_TRANSPORTE, "\n3. ").concat(enum_1.StatusPeca.PRONTA));
    var acao = readline.question("Novo status: ");
    if (acao === "1")
        peca.atualizarStatus(enum_1.StatusPeca.EM_PRODUCAO);
    else if (acao === "2")
        peca.atualizarStatus(enum_1.StatusPeca.EM_TRANSPORTE);
    else if (acao === "3")
        peca.atualizarStatus(enum_1.StatusPeca.PRONTA);
    else
        console.log("Opcao invalida.");
    salvandoDados();
}
function gerenciarEtapas(aeronave) {
    console.log("\n==== GERENCIAR ETAPAS DE ".concat(aeronave.modelo.toUpperCase(), " ===="));
    if (aeronave.etapas.length === 0) {
        console.log("Nenhuma etapa cadastrada.");
        return;
    }
    var lista = "\nSelecione uma etapa:\n";
    aeronave.etapas.forEach(function (etapa, i) {
        lista += "".concat(i + 1, ". ").concat(etapa.nome, " (Status: ").concat(etapa.status, ")\n");
    });
    console.log(lista);
    var escolha = parseInt(readline.question("Digite o numero da etapa: "));
    if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.etapas.length) {
        console.log("Seleção inválida.");
        return;
    }
    var etapa = aeronave.etapas[escolha - 1];
    console.log("\n1. Iniciar trabalho\n2. Finalizar trabalho");
    var acao = readline.question("Escolha: ");
    if (acao === "1")
        etapa.iniciarEtapa();
    else if (acao === "2")
        etapa.finalizarEtapa();
    else
        console.log("Ação inválida.");
    salvandoDados();
}
function gerenciarTestes(aeronave) {
    console.log("\n==== GERENCIAR TESTES DE ".concat(aeronave.modelo.toUpperCase(), " ===="));
    if (aeronave.teste.length === 0) {
        console.log("Nenhum teste cadastrado.");
        return;
    }
    var lista = "\nSelecione um teste:\n";
    aeronave.teste.forEach(function (teste, i) {
        lista += "".concat(i + 1, ". ").concat(teste.tipo, " (Resultado: ").concat(teste.resultado, ")\n");
    });
    console.log(lista);
    var escolha = parseInt(readline.question("Digite o numero do teste: "));
    if (isNaN(escolha) || escolha <= 0 || escolha > aeronave.teste.length) {
        console.log("Seleção inválida.");
        return;
    }
    var teste = aeronave.teste[escolha - 1];
    console.log("\n1. ".concat(enum_1.ResultadoTeste.APROVADO, "\n2. ").concat(enum_1.ResultadoTeste.REPROVADO));
    var acao = readline.question("Novo resultado: ");
    if (acao === "1")
        teste.resultTeste(enum_1.ResultadoTeste.APROVADO);
    else if (acao === "2")
        teste.resultTeste(enum_1.ResultadoTeste.REPROVADO);
    else
        console.log("Opcao invalida.");
    salvandoDados();
}
function menuPrincipal(aeronaves) {
    var _loop_1 = function () {
        var listaParaEscolha = "\n=== MENU PRINCIPAL ===\n";
        listaParaEscolha += "0. Sair\n";
        aeronaves.forEach(function (aeronave, index) {
            listaParaEscolha += "".concat(index + 1, ". C\u00F3digo: ").concat(aeronave.codigo, ", Modelo: ").concat(aeronave.modelo, "\n");
        });
        console.log(listaParaEscolha);
        var escolhaInput = readline.question("Digite o numero da aeronave que deseja acessar (ou 0 para sair): ");
        var escolhaNum = parseInt(escolhaInput);
        if (escolhaNum === 0) {
            console.log("Encerrando o programa...");
            return "break";
        }
        if (!isNaN(escolhaNum) && escolhaNum > 0 && escolhaNum <= aeronaves.length) {
            var aeronaveSelecionada = aeronaves[escolhaNum - 1];
            gerenciarAeronave(aeronaveSelecionada);
        }
        else {
            console.log("Opção inválida. Tente novamente");
        }
    };
    while (true) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
}
function gerenciarAeronave(aeronave) {
    while (true) {
        console.log("\n=== GERENCIAR AERONAVE ".concat(aeronave.modelo.toUpperCase(), " ==="));
        console.log("1. Adicionar Etapa");
        console.log("2. Gerenciar Etapas");
        console.log("3. Adicionar Peça");
        console.log("4. Gerenciar Peças");
        console.log("5. Adicionar Teste");
        console.log("6. Gerenciar Testes");
        console.log("0. Voltar");
        var opcao = readline.question("Escolha uma opcao: ");
        switch (opcao) {
            case "1":
                cadastrarEtapa();
                var etapaRecente = etapas[etapas.length - 1];
                if (etapaRecente)
                    aeronave.etapas.push(etapaRecente);
                break;
            case "2":
                gerenciarEtapas(aeronave);
                break;
            case "3":
                adicionarPeca(aeronave);
                break;
            case "4":
                gerenciarPecas(aeronave);
                break;
            case "5":
                adicionarTeste(aeronave);
                break;
            case "6":
                gerenciarTestes(aeronave);
                break;
            case "0":
                return;
            default:
                console.log("Opção inválida.");
        }
    }
}
function gerarRelatorioAeronave() {
    if (aeronaves.length === 0) {
        console.log("Nenhuma aeronave cadastrada.");
        return;
    }
    console.log("\n=== SELECIONE UMA AERONAVE ===");
    aeronaves.forEach(function (a, i) {
        return console.log("".concat(i + 1, ". ").concat(a.modelo, " (").concat(a.codigo, ")"));
    });
    var escolha = readline.questionInt("Digite o numero da aeronave: ");
    if (escolha <= 0 || escolha > aeronaves.length) {
        console.log("Seleção inválida.");
        return;
    }
    var aeronaveSelecionada = aeronaves[escolha - 1];
    var cliente = readline.question("Nome do cliente: ");
    var dataEntregaStr = readline.question("Data de entrega (dd/mm/aaaa): ");
    var _a = dataEntregaStr.split("/").map(Number), dia = _a[0], mes = _a[1], ano = _a[2];
    var dataEntrega = new Date(ano, mes - 1, dia);
    var conteudo = relatorio_1.Relatorio.gerarRelatorioEntrega(aeronaveSelecionada, cliente, dataEntrega);
    console.log("\n=== RELATÓRIO ===\n");
    console.log(conteudo);
    var nomeArquivo = "relatorio_entrega_".concat(aeronaveSelecionada.codigo, ".txt");
    relatorio_1.Relatorio.salvarRelatorio(conteudo, nomeArquivo);
}
function salvandoDados() {
    var data = {
        aeronaves: aeronaves,
        funcionarios: funcionarios,
        pecas: pecas,
        etapas: etapas
    };
    fs.writeFileSync("database.json", JSON.stringify(data, null, 2), "utf-8");
    console.log("Dados salvos");
}
function carregarDados() {
    console.log("Carregando dados do arquivo...");
    if (fs.existsSync("database.json")) {
        var dataString = fs.readFileSync("database.json", "utf-8");
        var data = JSON.parse(dataString);
        if (data.aeronaves) {
            data.aeronaves.forEach(function (aeronaveData) {
                var novaAeronave = new aeronave_1.default(aeronaveData.codigo, aeronaveData.modelo, aeronaveData.tipo, aeronaveData.capacidade, aeronaveData.alcance, [], [], []);
                if (aeronaveData.pecas) {
                    novaAeronave.pecas = aeronaveData.pecas.map(function (pecaData) {
                        return new peca_1.default(pecaData.nome, pecaData.tipo, pecaData.fornecedor, pecaData.status);
                    });
                }
                if (aeronaveData.etapas) {
                    novaAeronave.etapas = aeronaveData.etapas.map(function (etapaData) {
                        return new etapa_1.default(etapaData.nome, etapaData.prazo, etapaData.status);
                    });
                }
                if (aeronaveData.testes) {
                    novaAeronave.teste = aeronaveData.testes.map(function (testeData) {
                        return new teste_1.default(testeData.tipo, testeData.resultado);
                    });
                }
                aeronaves.push(novaAeronave);
            });
        }
        if (data.funcionarios) {
            data.funcionarios.forEach(function (funcData) {
                var novoFuncionario = new funcionario_1.default(funcData.id, funcData.nome, funcData.telefone, funcData.endereco, funcData.usuario, funcData.senha, funcData.nivelPermissao);
                funcionarios.push(novoFuncionario);
            });
        }
        console.log("Dados carregados com sucesso!");
    }
    else {
        console.log("Nenhum banco de dados encontrado");
    }
}
function inicio() {
    while (true) {
        console.log("\n=== BEM-VINDO AO SISTEMA ===");
        console.log("1. Fazer login");
        console.log("2. Cadastrar novo funcionario");
        console.log("0. Sair");
        var escolha = readline.question("Escolha uma opcao: ");
        if (escolha === "1") {
            if (funcionarios.length === 0) {
                console.log("Nao ha funcionarios cadastrados. Cadastre um primeiro.");
            }
            else {
                var user = login();
                if (user)
                    return user;
            }
        }
        else if (escolha === "2") {
            cadastrarFuncionario();
        }
        else if (escolha === "0") {
            return null;
        }
        else {
            console.log("Opcao invalida.");
        }
    }
}
function main() {
    carregarDados();
    var usuarioLogin = inicio();
    if (!usuarioLogin) {
        console.log("Saindo do sistema...");
        return;
    }
    console.log("\nBem-vindo, ".concat(usuarioLogin.nome, "! | Nivel: ").concat(usuarioLogin.nivelPermissao));
    var sair = false;
    while (!sair) {
        console.log("\n=== MENU PRINCIPAL ===");
        console.log("1. Cadastrar aeronave");
        console.log("2. Listar aeronaves");
        console.log("3. Gerenciamento de aeronaves");
        console.log("4. Gerar relatório");
        console.log("5. Listar funcionarios");
        console.log("0. Sair");
        var opcao = readline.question("Escolha uma opcao: ");
        switch (opcao) {
            case "1":
                cadastrarAeronave();
                break;
            case "2":
                listarAeronaves();
                break;
            case "3":
                if (aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada");
                }
                else {
                    menuPrincipal(aeronaves);
                }
                break;
            case "4":
                gerarRelatorioAeronave();
                break;
            case "5":
                listarFuncionarios();
                break;
            case "0":
                salvandoDados();
                sair = true;
                console.log("Saindo do sistema...");
                break;
            default:
                console.log("Opcao invalida");
        }
    }
}
main();
