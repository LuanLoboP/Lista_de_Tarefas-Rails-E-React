# App.tsx → Cérebro (Lógica + Estado + Backend)

Tudo que envolve:

- Estado global da lista

- Comunicação com backend

- Regras de negócio

- Atualização da lista

- Validação principal

App.tsx é :

Dados

Regras

Backend

Atualização

# TodoItem.tsx → Interface (Visual + Interação)

TodoItem.tsx é responsável por:

Visual

Disparar eventos

Mostrar estado

Tudo que envolve:

🔹 Layout da tarefa

🔹 Botões

🔹 Checkbox

🔹 Input de edição

🔹 Disparar eventos

---

# 1 Lista => 2 vizualizações de estado da tarefas (Task => 12)

Quando marcado o checkbox:

completed vira true

A lista re-renderiza

A tarefa some de Pendentes

Ela aparece em Realizadas

E aparece primeiro (por causa do reverse)
