import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState<Task[]>([]);

  // Buscar tarefas do backend <======
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setLista(data));
  }, []);

  // Criar tarefa
  function adicionarTarefa() {
    if (tarefa.trim() === "") return;

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: {
          title: tarefa,
          completed: false,
        },
      }),
    })
      .then((res) => res.json())
      .then((novaTarefa) => {
        setLista([...lista, novaTarefa]);
        setTarefa("");
      });
  }

  // Edita tarefa
  function editarTarefa(id: number, novoTexto: string) {
    // Validação básica
    if (novoTexto.trim() === "") return;

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: { title: novoTexto },
      }),
    })
      .then((res) => res.json())
      .then((tarefaAtualizada) => {
        // Atualiza o estado local da task mudada
        const listaAtualizada = lista.map((item) =>
          item.id === id ? tarefaAtualizada : item,
        );
        setLista(listaAtualizada);
      });
  }

  // Função que remove uma tarefa,
  // Adicionado o parâmetro titulo para mostrar no alert ao remover tarefa
  // Adicionado uma condicional, para a pessoa confirmar se quer remover a tarefa
  function removerTarefa(id: number, titulo: string) {
    const mensagemAlerta = window.confirm(
      `Você tem certeza que deseja excluir esta tarefa "${titulo}"?`,
    );
    if (!mensagemAlerta) return;
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLista(lista.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-black text-indigo-900 drop-shadow-sm bg-indigo-50 px-4 py-2 rounded-lg inline-block mb-6">
        {" "}
        Lista de Tarefas
      </h1>

      <div className="input-area">
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button
          onClick={adicionarTarefa}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg 
             shadow-md transition-all duration-300 
             hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
        >
          Adicionar
        </button>{" "}
        {/* Adiciona uma task */}
      </div>

      {/* FUNÇÃO MAP PERCORRE A lista, E PEGA CADA TAREFA E IMPRIME ELAS */}
      <ul>
        {lista.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            texto={task.title}
            onRemove={() => removerTarefa(task.id, task.title)} // task.title adiconado, assim a função remover aceita o parâmetro testo
            onEdit={(id, novoTexto) => editarTarefa(id, novoTexto)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
