interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  telaAtiva: "lista" | "lixeira";
  setTelaAtiva: (tela: "lista" | "lixeira") => void;
}

export function Sidebar({
  open,
  setOpen,
  telaAtiva,
  setTelaAtiva,
}: SidebarProps) {
  return (
    <aside
      className={`bg-gray-900 text-white min-h-screen transition-all duration-300 overflow-y-auto ${open ? "w-64 p-6" : "w-0 overflow-hidden"}`}
    >
      {open && (
        <>
          <div className="flex justify-end">
            <button onClick={() => setOpen(false)} className="text-3xl">
              ☰
            </button>
          </div>

          <h2 className="text-xl font-bold mt-4 mb-6">Menu</h2>

          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setTelaAtiva("lista")}
                className={`w-full text-left px-4 py-2 rounded ${telaAtiva === "lista" ? "bg-gray-700" : ""}`}
              >
                Lista de Tarefas
              </button>
            </li>
            <li>
              <button
                onClick={() => setTelaAtiva("lixeira")}
                className={`w-full text-left px-4 py-2 rounded ${telaAtiva === "lixeira" ? "bg-gray-700" : ""}`}
              >
                Lixeira
              </button>
            </li>
          </ul>
        </>
      )}
    </aside>
  );
}
