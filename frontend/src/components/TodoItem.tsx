import { useState } from "react";

type Props = {
  id: number;
  texto: string;
  completed: boolean;
  onRemove: () => void;
  onEdit: (id: number, editado: string) => void;
  onToggle: (id: number, completar: boolean) => void;
};

export function TodoItem({ id, texto, completed, onRemove, onEdit, onToggle }: Props) {
  const [editando, setEditando] = useState(false);
  const [valor, setValor] = useState(texto);

  return (
    <li className="flex items-center justify-between p-3 mb-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {editando ? (
        <div className="flex w-full items-center gap-2">
          <input
            className="flex-1 px-2 py-1 border-2 border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            value={valor}
            maxLength={30}
            onChange={(e) => setValor(e.target.value)}
            autoFocus
          />
          <button
            className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
            onClick={() => {
              onEdit(id, valor);
              setEditando(false);
            }}
          >
            Salvar
          </button>
          <button
            className="px-3 py-1 text-sm font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200"
            onClick={() => setEditando(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle(id, completed)}
              className="w-5 h-5 cursor-pointer"
            />

            <span
              className={`font-medium ${
                completed ? "line-through text-gray-400" : "text-slate-700"
              }`}
            >
              {texto}
            </span>
          </div>

          <div className="flex gap-1">
            <button
              className="p-2 text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
              onClick={() => setEditando(true)}
              title="Editar"
            >
              ✏️
            </button>
            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              onClick={onRemove}
              title="Remover"
            >
              ❌
            </button>
          </div>
        </>
      )}
    </li>
  );
}
