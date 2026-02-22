import { useEffect, useState, type KeyboardEvent } from "react";
import { TodoItem } from "./components/TodoItem";
import { Sidebar } from "./components/layout/AppSideBar";
import "./App.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type Tela = "lista" | "lixeira";

function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState<Task[]>([]);
  const [lixeira, setLixeira] = useState<Task[]>([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState<Tela>("lista");

  const pendentes = lista.filter((task) => !task.completed);
  const realizadas = lista.filter((task) => task.completed).reverse();

  function teclaEnter(evento: KeyboardEvent<HTMLInputElement>) {
    if (evento.key === "Enter") adicionarTarefa();
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { title: tarefa, completed: false } }),
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { title: novoTexto } }),
    })
      .then((res) => res.json())
      .then((tarefaAtualizada) => {
        setLista(
          lista.map((item) => (item.id === id ? tarefaAtualizada : item)),
        );
      });
  }

  function removerTarefa(id: number, titulo: string) {
    if (!window.confirm(`Você tem certeza que deseja excluir "${titulo}"?`))
      return;

    const tarefaRemovida = lista.find((item) => item.id === id);
    if (tarefaRemovida) setLixeira([...lixeira, tarefaRemovida]);

    setLista(lista.filter((item) => item.id !== id));
  }

  function deletarDaLixeira(id: number) {
    if (
      !window.confirm("Deseja excluir permanentemente esta tarefa da lixeira?")
    )
      return;

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLixeira(lixeira.filter((item) => item.id !== id));
    });
  }

  function limparLista() {
    if (!window.confirm("Você deseja mover todas as tarefas para a lixeira?"))
      return;

    setLixeira([...lixeira, ...lista]);
    setLista([]);
  }

  function esvaziarLixeira() {
    if (
      !window.confirm(
        "Deseja excluir todas as tarefas da lixeira? Esta ação não pode ser restaurada!",
      )
    )
      return;

    Promise.all(
      lixeira.map((t) =>
        fetch(`http://localhost:3000/tasks/${t.id}`, {
          method: "DELETE",
        }),
      ),
    ).then(() => {
      setLixeira([]);
    });
  }

  function restaurarTudo() {
    if (lixeira.length === 0) return;

    if (!window.confirm("Deseja restaurar todas as tarefas?")) return;

    setLista([...lista, ...lixeira]);
    setLixeira([]);
  }

  function restaurarTarefa(id: number) {
    const tarefaRestaurada = lixeira.find((t) => t.id === id);
    if (!tarefaRestaurada) return;
    setLista([...lista, tarefaRestaurada]);
    setLixeira(lixeira.filter((t) => t.id !== id));
  }

  function completarTarefa(id: number, statusAtual: boolean) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: { completed: !statusAtual } }),
    })
      .then((res) => res.json())
      .then((statusAtualizado) => {
        setLista(
          lista.map((item) => (item.id === id ? statusAtualizado : item)),
        );
      });
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      <Sidebar
        open={menuAberto}
        setOpen={setMenuAberto}
        setTelaAtiva={setTelaAtiva}
        telaAtiva={telaAtiva}
      />

      {/* CONTEÚDO PRINCIPAL AQUI*/}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          {!menuAberto && (
            <button
              onClick={() => setMenuAberto(true)}
              className="text-3xl p-2 rounded-md hover:bg-gray-200 transition"
            >
              ☰
            </button>
          )}
          <h1 className="text-3xl font-black text-indigo-900">
            {telaAtiva === "lista" ? "Lista de Tarefas" : "Lixeira"}
          </h1>
        </div>

        {telaAtiva === "lista" && (
          <>
            <div className="flex gap-3 mb-6 flex-wrap">
              <input
                onKeyDown={teclaEnter}
                type="text"
                value={tarefa}
                maxLength={30}
                onChange={(e) => setTarefa(e.target.value)}
                placeholder="Digite uma tarefa"
                className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 text-lg"
              />
              <button
                onClick={adicionarTarefa}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
              >
                Adicionar
              </button>
              <button
                onClick={limparLista}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Limpar Lista
              </button>
            </div>

            <div className="max-w-3xl">
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
                        onToggle={() =>
                          completarTarefa(task.id, task.completed)
                        }
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
                        onToggle={() =>
                          completarTarefa(task.id, task.completed)
                        }
                      />
                    ))}
                  </>
                )}
              </ul>
            </div>
          </>
        )}

        {/* Tela Lixeira */}
        {telaAtiva === "lixeira" && (
          <div className="max-w-3xl">
            {lixeira.length === 0 ? (
              <p className="text-gray-400 text-red-400">
                Nenhuma tarefa na lixeira
              </p>
            ) : (
              <>
                <div className="mb-4 flex gap-3 flex-wrap">
                  <button
                    onClick={restaurarTudo}
                    disabled={lixeira.length === 0}
                    className={`px-4 py-2 rounded-lg font-bold transition 
                    ${
                      lixeira.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }
                  `}
                  >
                    Restaurar Tudo
                  </button>

                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
                    onClick={esvaziarLixeira}
                  >
                    Excluir Tudo
                  </button>
                </div>

                <ul className="space-y-2">
                  {lixeira.map((task) => (
                    <li
                      key={task.id}
                      className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                    >
                      <span>
                        {task.title} (
                        {task.completed ? "Concluída" : "Pendente"})
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="text-green-600 font-bold"
                          onClick={() => restaurarTarefa(task.id)}
                        >
                          Restaurar
                        </button>
                        <button
                          className="text-red-600 font-bold"
                          onClick={() => deletarDaLixeira(task.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
