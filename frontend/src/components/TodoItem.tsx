type Props = {
  texto: string;
  onRemove: () => void;
};

export function TodoItem({ texto, onRemove }: Props) {
  return (
    <li className="todo-item">
      <span>{texto}</span>
      <button onClick={onRemove}>❌</button>
    </li>
  );
}
