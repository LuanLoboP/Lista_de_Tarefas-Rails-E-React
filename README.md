# Guia Rápido: Como Rodar o Projeto

Este guia contém os passos essenciais para colocar a aplicação de pé sem erros, respeitando a ordem de dependências entre o banco de dados, o servidor Rails e o frontend React.

## 1. Preparação do Banco de Dados

Antes de ligar os servidores, o MySQL precisa estar pronto. Você tem duas opções:

Opção A: Passo a passo (Recomendado para entender o processo)
Bash

### Cria o banco de dados definido no database.yml

rails db:create

### Cria as tabelas (tasks, etc.) com base nas migrations

rails db:migrate

### Popula o banco com os dados iniciais do arquivo db/seeds.rb

rails db:seed
Opção B: Atalho "Tudo em Um"
Bash

### Executa o create, migrate e seed em um único comando

rails db:setup

## 2. Ordem de Execução

Para que o frontend não exiba erros de conexão, siga esta ordem:

Passo 1: Iniciar o Backend (API)
Abra um terminal na raiz do projeto:

Bash
cd backend
rails server # Ou apenas 'rails s'
A API estará rodando em: http://localhost:3000

Passo 2: Iniciar o Frontend (Interface)
Abra um novo terminal:

Bash
cd frontend
npm start
O site abrirá em: http://localhost:3001

## Pontos de Atenção sobre subir o projeto

Conflito de Portas: O Rails usa a porta 3000. Se o React perguntar se deseja usar outra porta, aceite (geralmente a 3001), pois dois serviços não podem usar a mesma porta simultaneamente.

MySQL Ativo: Verifique se o serviço do MySQL está rodando no seu computador (via Windows Services ou Docker), caso contrário, o Rails dará erro de conexão.

CORS: Se o frontend carregar mas não mostrar as tarefas, verifique se a gem rack-cors no backend está configurada para aceitar requisições de localhost:3001.

Pasta db/: Nunca delete os arquivos dentro de db/migrate ou o arquivo schema.rb, pois eles são o histórico que permite recriar o banco em outras máquinas.
