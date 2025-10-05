# ✈️ Sistema de Gestão de Aeronaves

Este projeto é um sistema de **gerenciamento de produção de aeronaves** desenvolvido em **TypeScript (Node.js)** com persistência local em arquivo `JSON`.  
Permite o **cadastro, gerenciamento e relatório** de aeronaves, peças, etapas de produção, testes e funcionários.

---

## 🧭 Funcionalidades

### 👨‍💼 Funcionários
- Cadastro de funcionários com **ID único**
- Definição de **níveis de permissão**: `ADMINISTRADOR`, `ENGENHEIRO`, `OPERADOR`
- **Autenticação de login** antes de acessar o sistema

### ✈️ Aeronaves
- Cadastro de aeronaves com **código único**
- Tipos de aeronave: `COMERCIAL` ou `MILITAR`
- Exibição de detalhes técnicos (modelo, capacidade, alcance, etc.)

### ⚙️ Peças
- Associação de peças às aeronaves
- Tipos: `NACIONAL` ou `IMPORTADA`
- Controle de status: `EM PRODUCAO`, `EM TRANSPORTE`, `PRONTA`

### 🧩 Etapas de Produção
- Criação de etapas com **prazo definido**
- Associação de **um ou mais funcionários**
- Alteração de status: `PENDENTE`, `ANDAMENTO`, `CONCLUIDA`

### 🧪 Testes
- Registro de testes realizados em cada aeronave
- Tipos: `ELETRICO`, `HIDRAULICO`, `AERODINAMICO`
- Resultados: `APROVADO` ou `REPROVADO`

### 🧾 Relatórios
- Geração automática de relatório de entrega (`.txt`)
- Informações completas da aeronave, peças, etapas e testes

### 💾 Persistência de Dados
- Todos os dados são salvos automaticamente em `database.json`
- Ao iniciar, o sistema **carrega os dados anteriores**

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **readline-sync** (entrada de dados no terminal)
- **fs (File System)** do Node para salvar e carregar dados

---
### 🧑‍💻 Fluxo do Sistema

O programa inicia com o login

É necessário possuir um funcionário cadastrado no arquivo database.json

Caso não haja, crie um manualmente pela função Cadastrar novo funcionario

Após o login:

O menu principal oferece opções de cadastro, listagem, gerenciamento e relatórios

Todas as ações (cadastro, atualização, conclusão etc.) são salvas automaticamente.
  
