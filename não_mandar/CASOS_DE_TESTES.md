# 01 Bugs de Frontend (React)

## Estado e renderização

- Adicionar tarefa vazia ✅

- Adicionar tarefa só com espaços " " ✅

- Adicionar tarefa muito longa (500+ caracteres) ✅

- Adicionar tarefa com emoji 😅🔥 ✅

- Adicionar tarefa com HTML <script>alert(1)</script> ❌

- Adicionar tarefa duplicada ❌

- Marcar tarefa como concluída e rapidamente desmarcar várias vezes ✅

- Restaurar tudo e rapidamente clicar várias vezes ✅

- Excluir tudo e clicar novamente ✅

- Trocar entre "lista" e "lixeira" muito rápido ✅

## Estado inconsistente

- Limpar lista → voltar para lista → estado continua correto? ✅

- Atualizar página → tarefas continuam? ❌

- Atualizar página na lixeira → permanece na tela correta? ❌

## Responsividade

- Testar em 320px (iPhone SE) ❌ => EM TELAS MENORES, AO ADICIONAR UMA TASK DE 30 CARACTERES, O TEXTO QUEBRA O LAYOUT DA LINHA!

- Testar botão quebrando linha ✅

- Texto longo quebrando layout ❌ => EM TELAS MENORES O LAYOUT QUEBRA

- Sidebar abrindo em tela pequena ✅

- Botões sobrepondo conteúdo ✅

# 02 Bugs de Integração API

## API fora do ar

- Backend desligado → app quebra? ✅

- API retorna 500 ❌

- API retorna 404 ❌

- API demora 10 segundos para responder ✅

- API retorna array vazio ✅

## Dados inesperados

- API retorna tarefa sem id ✅

- API retorna completed: null ✅

- API retorna string no lugar de boolean ✅

- API retorna duplicadas ✅

- API retorna objeto diferente do esperado ✅

# 03 Bugs de Backend (Rails ou Node)

## Validação

- Criar tarefa com caracteres especiais ✅ => CONSIGO, MAS, É MELHOR FAZER UMA VALIDAÇÃO PARA ISSO NÃO ACONTECER!

- Criar tarefa com SQL Injection: ✅
  **DROP TABLE tasks;**

## Exclusão

- Restaurar tarefa que já foi deletada no banco ✅

- Deletar tarefa inexistente ✅

- Atualizar tarefa inexistente ✅

# 04 Persistência

- Atualizar página após adicionar tarefa ✅

- Atualizar após restaurar ✅

- Abrir em outro navegador ❌ => AO LIMPAR LISTA DE TAREFAS, E ABRIR OUTRA PÁGINA AS TASKS AINDA PERMANECEM NA LISTA

- LocalStorage cheio

- Dados corrompidos no localStorage

# 05 Performance

- 100 tarefas ✅

- 500 tarefas ✅

- 1000 tarefas ✅

- Restaurar tudo com 1000 tarefas ✅

# 06 Segurança

- Inserir <script> como tarefa ✅

- Inserir <img src=x onerror=alert(1)> ✅

- Tentar manipular ID manualmente via DevTools ✅
  USEI ESSA FUNÇÃO PARA
  - ( fetch("http://localhost:3000/tasks/1", {
    "method": "DELETE",
    "headers": {
    "Content-Type": "application/json"
    }
    })
    .then(res => {
    if (res.status === 204 || res.status === 200) {
    console.log("⚠️ VULNERÁVEL: Você conseguiu deletar a tarefa 1!");
    } else if (res.status === 401 || res.status === 403 || res.status === 404) {
    console.log("✅ SEGURO: O sistema barrou a tentativa ou não achou a tarefa.");
    }
    }); )

- Tentar alterar requisição no Network Tab ✅

# 07 UX e comportamento

- Confirm dialog cancelado → realmente não executa? ✅

- Duplo clique em excluir ✅

- Enter pressionado várias vezes ✅

- Pressionar Enter com campo vazio ✅

- Digitar e trocar de tela sem salvar ✅

- Botão desabilitado realmente bloqueia ação?

# 08 Casos extremos

- Internet cai no meio da requisição ✅

- Backend responde parcialmente

- Timeout

- JSON malformado

- Usuário abre 2 abas e altera simultaneamente

# 09 Testes de regressão

- Depois de implementar algo novo, verifique:

- Restaurar tudo ainda funciona ✅

- Limpar lista ainda manda para lixeira ✅

- Sidebar ainda troca tela ✅

- Estado não duplicou itens ❌

# Teste Profissional (fluxo real)

## Simule:

- Criar 10 tarefas

- Concluir 3

- Limpar lista

- Restaurar 2

- Excluir 1 permanentemente

- Atualizar página
