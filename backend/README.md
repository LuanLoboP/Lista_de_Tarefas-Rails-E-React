# Lista de Tarefas – Backend (Rails API)

API desenvolvida em Ruby on Rails para gerenciar uma lista de tarefas. A aplicação fornece endpoints REST para criar, listar e fazer a remoção de tarefas, a api é consumida por um frontend em React.

Projeto desenvolvido para estudo e muita prática de API com Rails.

---

## Tecnologias usadas no projeto

- **Ruby:** 3.4.8
- **Rails:** 8.1.2
- **Database:** MySQL
- **Servidor:** Puma
- **Gems principais:** `mysql2`, `rack-cors`, `bootsnap`

---

## A estrutura do Banco de Dados ficou

Banco de dados: _lista_de_tarefas_
Tabela principal: _tasks_

| Campo        | Tipo     | Descrição           |
| :----------- | :------- | :------------------ |
| `id`         | bigint   | Chave primária      |
| `title`      | string   | Título da tarefa    |
| `completed`  | boolean  | Status de conclusão |
| `created_at` | datetime | Data de criação     |
| `updated_at` | datetime | Data de atualização |

---

## Endpoints

| Ação           | Método     | Endpoint     |
| :------------- | :--------- | :----------- |
| Listar tarefas | **GET**    | `/tasks`     |
| Criar tarefa   | **POST**   | `/tasks`     |
| Apagar tarefa  | **DELETE** | `/tasks/:id` |

---

## Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone <>

   ```

2. **Entre na pasta do backend:**

   ```bash
   cd backend

   ```

3. **Instale as gems:**

   ```bash
   bundle install

   ```

4. **Configure o banco de dados:**

   ```bash
   rails db:create
   rails db:migrate

   ```

5. **Inicie o servidor:**
   ```bash
   rails server
   ```

A API vai estar no: _http://localhost:3000_

**CORS**
O projeto utiliza a gem rack-cors para permitir requisições vindas do frontend que esta rodando em outra porta a : localhost:3001

_Algumas observações de estudo:_

- O backend foi desenvolvido no modo API-only.
