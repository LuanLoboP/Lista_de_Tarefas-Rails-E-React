# App.tsx

_map_
{/_ FUNÇÃO MAP PERCORRE A lista, E PEGA CADA TAREFA E IMPRIME ELAS _/}
{/_ Agora existe uma condicional para verificar se a lista esta vazia, se estiver aparece a mensagem " Nenhuma tarefa cadastrada." _/}
{/\_ <ul>
{lista.length > 0 ? (
lista.map((task) => (
<TodoItem
key={task.id}
id={task.id}
texto={task.title}
completed={task.completed}
onRemove={() => removerTarefa(task.id, task.title)}
onEdit={(id, novoTexto) => editarTarefa(id, novoTexto)}
onToggle={() => completarTarefa(task.id, task.completed)}
/>
))
) : (

<p className="text-center font-semibold text-blue-500 text-xl">
Nenhuma tarefa cadastrada.
</p>
)}
</ul> _/}

## FUNCTION LIMPAR LISTA

-> Limpa direto da lista, mas apaga do backend

function limparLista() {
if (!window.confirm("Deseja excluir TODAS as tarefas?")) return;

    Promise.all(
      lista.map((t) =>
        fetch(`http://localhost:3000/tasks/${t.id}`, {
          method: "DELETE",
        }),
      ),
    ).then(() => {
      setLista([]);
    });

}
