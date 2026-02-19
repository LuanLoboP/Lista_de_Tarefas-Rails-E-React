export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <nav className="flex flex-col gap-3">
        <button className="text-left hover:bg-gray-700 p-2 rounded transition">
          📝 Tarefas
        </button>

        <button className="text-left hover:bg-gray-700 p-2 rounded transition">
          ⚙️ Configurações
        </button>
      </nav>
    </aside>
  );
}
