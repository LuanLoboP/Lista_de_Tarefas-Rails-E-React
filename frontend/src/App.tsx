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

  // 🔹 Buscar tarefas do backend
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setLista(data));
  }, []);

  // 🔹 Criar tarefa
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

  // 🔹 Remover tarefa
  function removerTarefa(id: number) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLista(lista.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="container">
      <h1>Minha Lista de Tarefas</h1>

      <div className="input-area">
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul>
        {lista.map((task) => (
          <TodoItem
            key={task.id}
            texto={task.title}
            onRemove={() => removerTarefa(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
