import { useEffect, useState, type KeyboardEvent } from "react";
import { TodoItem } from "./components/TodoItem";
import { Sidebar } from "./components/layout/AppSideBar";

import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState<Task[]>([]);
  const pendentes = lista.filter((task) => !task.completed);
  const realizadas = lista.filter((task) => task.completed).reverse();

  function teclaEnter(evento: KeyboardEvent<HTMLInputElement>) {
    if (evento.key === "Enter") {
      adicionarTarefa();
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setLista(data));
  }, []);

  function adicionarTarefa() {
    if (tarefa.trim() === "" || tarefa.length > 30) return;

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

  function editarTarefa(id: number, novoTexto: string) {
    if (novoTexto.trim() === "" || novoTexto.length > 30) return;

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
        const listaAtualizada = lista.map((item) =>
          item.id === id ? tarefaAtualizada : item,
        );
        setLista(listaAtualizada);
      });
  }

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

  function completarTarefa(id: number, statusAtual: boolean) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: { completed: !statusAtual },
      }),
    })
      .then((res) => res.json())
      .then((statusAtualAtualizado) => {
        const listaAtualizada = lista.map((item) =>
          item.id === id ? statusAtualAtualizado : item,
        );
        setLista(listaAtualizada);
      });
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 container p-6">
        <h1 className="text-3xl font-black text-indigo-900 drop-shadow-sm bg-indigo-50 px-4 py-2 rounded-lg inline-block mb-6">
          Lista de Tarefas
        </h1>

        <div className="input-area">
          <input
            onKeyDown={teclaEnter}
            type="text"
            value={tarefa}
            maxLength={30}
            onChange={(e) => setTarefa(e.target.value)}
            placeholder="Digite uma tarefa"
            className="text-lg"
          />
          <button
            onClick={adicionarTarefa}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg 
            shadow-md transition-all duration-300 
            hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            Adicionar
          </button>
        </div>

        <ul>
          {lista.length === 0 && (
            <p className="text-center font-semibold text-blue-500 text-xl">
              Nenhuma tarefa cadastrada
            </p>
          )}

          {pendentes.length > 0 && (
            <>
              <h2 className="text-lg text-red-500 mt-4 mb-2 font-bold">
                Tarefas Pendentes
              </h2>

              {pendentes.map((task) => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  texto={task.title}
                  completed={task.completed}
                  onRemove={() => removerTarefa(task.id, task.title)}
                  onEdit={(id, novoTexto) => editarTarefa(id, novoTexto)}
                  onToggle={() => completarTarefa(task.id, task.completed)}
                />
              ))}
            </>
          )}

          {realizadas.length > 0 && (
            <>
              <hr className="my-4 border-slate-300" />

              <h2 className="text-lg text-green-800 mt-4 mb-2 font-bold">
                Tarefas Realizadas
              </h2>

              {realizadas.map((task) => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  texto={task.title}
                  completed={task.completed}
                  onRemove={() => removerTarefa(task.id, task.title)}
                  onEdit={(id, novoTexto) => editarTarefa(id, novoTexto)}
                  onToggle={() => completarTarefa(task.id, task.completed)}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
