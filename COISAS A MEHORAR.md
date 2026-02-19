# 1. Status de Conclusão um (Checkbox) ✅

Uma lista de tarefas sem o "check" de concluído é apenas uma lista de notas.

O que falta: Um campo para marcar a tarefa como feita.

Dica Pro: Quando marcada, o texto pode ganhar um efeito de line-through (riscado) e uma opacidade menor usando Tailwind: className={concluida ? "line-through text-slate-400" : ""}.

# 2. Filtros e Categorias para as tarefas

À medida que a lista cresce, o usuário precisa organizar a visualização.

O que falta: Botões para filtrar entre "Todas", "Pendentes" e "Concluídas".

O que falta: A capacidade de arrastar uma tarefa para cima ou para baixo.

Dica: Use a biblioteca dnd-kit ou react-beautiful-dnd para isso.

# 4. Datas e Prazos, chamado => (Deadlines)

Tarefa sem data costuma ser esquecida.

O que falta: Um pequeno indicador de data (ex: "Vence hoje" ou "15/02").

MUI: Use o componente DatePicker do Material UI para selecionar a data ao criar a tarefa.

# 5. Feedback Visual de Estado Vazio (Empty State) ✅

Se o usuário deletar tudo, a tela não deve ficar um "branco" sem graça.

- Passo que vou seguir:
  - Criar uma verificação se a lista no caso o array, tem tamanho maior que 0
    -> lista.lenght > 0
  - Se tiver maior que zero continua com o map
  - Se não, ver uma maneira de criar o fluxo para exibir a mensagem personalizada para lista vazia

O que falta: Uma ilustração ou frase amigável como "Nada para fazer hoje! Aproveite o sol ☀️" quando a lista estiver vazia.

# 6. Persistência e Sincronização da lista

O que falta: Um pequeno ícone de "nuvem" ou "check" indicando que a alteração foi salva no banco de dados com sucesso. Se o seu fetch demorar, um Spinner (carregamento) no botão é essencial para o User saber como esta o fluxo do programa

# 7. Scroll na barra de rolagem ✅

Crie um scroll na barra de rolagem das listas para ser mais moderno

# 8. Ao usuário clicar enter, a tarefa é adicionada ✅

Ao clicar em adicionar tarefa, tanto o Enter quanto o botão de Adicionar devem inserir a tarefa na lista

# 9. Criar uma lixeira

Se excluir uma tarefa, que não queria, eu posso através de menu lateral, restauar ela e seu estado, concluida ou pendente

# 10. Criar um limitador de caracteres ✅

Ao criar ou editar um campo, o usuário não pode ultrapassar de 30 caracteres

# 11. Criar um menu lateral ✏️

O menu lateral terá acesso a lixeira, ao dashboard e ao admin (mais para frente)

# 12. Criar uma coluna no final da lista ✅

Uma linha que separa as tarefas prontas, das tarefas pendentes - Quando a pessoa clicar no checkbox, a tarefa vai para essa lista - E cada tarefa feita, ela será a primeira em ordem de precedência na coluna "Tarefas Realizadas"
