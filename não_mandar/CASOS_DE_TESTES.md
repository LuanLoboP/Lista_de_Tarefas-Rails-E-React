# 01 Bugs de Frontend (React)

## Estado e renderização

- Adicionar tarefa vazia

- Adicionar tarefa só com espaços " "

- Adicionar tarefa muito longa (500+ caracteres)

- Adicionar tarefa com emoji 😅🔥

- Adicionar tarefa com HTML <script>alert(1)</script>

- Adicionar tarefa duplicada

- Marcar tarefa como concluída e rapidamente desmarcar várias vezes

- Restaurar tudo e rapidamente clicar várias vezes

- Excluir tudo e clicar novamente

- Trocar entre "lista" e "lixeira" muito rápido

## Estado inconsistente

- Limpar lista → voltar para lista → estado continua correto?

- Atualizar página → tarefas continuam?

- Atualizar página na lixeira → permanece na tela correta?

## Responsividade

- Testar em 320px (iPhone SE)

- Testar botão quebrando linha

- Texto longo quebrando layout

- Sidebar abrindo em tela pequena

- Botões sobrepondo conteúdo

# 02 Bugs de Integração API

## API fora do ar

- Backend desligado → app quebra?

- API retorna 500

- API retorna 404

- API demora 10 segundos para responder

- API retorna array vazio

## Dados inesperados

- API retorna tarefa sem id

- API retorna completed: null

- API retorna string no lugar de boolean

- API retorna duplicadas

- API retorna objeto diferente do esperado

# 03 Bugs de Backend (Rails ou Node)

## Validação

- Criar tarefa sem título

- Criar tarefa com título gigante

- Criar tarefa com caracteres especiais

- Criar tarefa com SQL Injection:
  **DROP TABLE tasks;**

## Exclusão

- Restaurar tarefa que já foi deletada no banco

- Deletar tarefa inexistente

- Atualizar tarefa inexistente

# 04 Persistência

- Atualizar página após adicionar tarefa

- Atualizar após restaurar

- Abrir app em outra aba

- Abrir em outro navegador

- LocalStorage cheio

- Dados corrompidos no localStorage

# 05 Performance

- 100 tarefas

- 500 tarefas

- 1000 tarefas

- Restaurar tudo com 1000 tarefas

# 06 Segurança

- Inserir <script> como tarefa

- Inserir <img src=x onerror=alert(1)>

- Tentar manipular ID manualmente via DevTools

- Tentar alterar requisição no Network Tab

# 07 UX e comportamento

- Confirm dialog cancelado → realmente não executa?

- Duplo clique em excluir

- Enter pressionado várias vezes

- Pressionar Enter com campo vazio

- Digitar e trocar de tela sem salvar

- Botão desabilitado realmente bloqueia ação?

# 08 Casos extremos

- Internet cai no meio da requisição

- Backend responde parcialmente

- Timeout

- JSON malformado

- Usuário abre 2 abas e altera simultaneamente

# 09 Testes de regressão

- Depois de implementar algo novo, verifique:

- Restaurar tudo ainda funciona

- Limpar lista ainda manda para lixeira

- Exportar CSV continua correto

- Sidebar ainda troca tela

- Estado não duplicou itens

# Teste Profissional (fluxo real)

## Simule:

- Criar 10 tarefas

- Concluir 3

- Limpar lista

- Restaurar 2

- Excluir 1 permanentemente

- Exportar

- Atualizar página
