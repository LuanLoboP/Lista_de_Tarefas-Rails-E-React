# Frontend (React)

## Sobre o Projeto

Este é o frontend de uma aplicação de Lista de Tarefas (To-Do List). O projeto foi desenvolvido com o objetivo de praticar a integração entre uma interface em React e o backend em Ruby on Rails, consumindo uma API RESTful.

Uma API RESTful faz => Uma arquitetura de comunicação que utiliza métodos HTTP (GET, POST, etc.) para transferir dados de forma padronizada e eficiente entre um servidor e um cliente.

> Este projeto faz parte do meu portfólio pessoal e foca em conceitos de gerenciamento de estado, hooks e comunicação assíncrona.

---

## Tecnologias Usadas no projeto

- **React** (v18+)
- **TypeScript**
- **Fetch API**
- **Node.js** (v20.20.0)

---

## Para a integração com o Backend:

O frontend foi configurado para consumir uma API Rails que rodei localmente.

**URL Base:** `http://localhost:3000`

### Endpoints Principais:

| Método | Endpoint | Descrição |

| **GET** | `/tasks` | Retorna todas as tarefas do banco MySQL. |
| **POST** | `/tasks` | Envia uma nova tarefa para ser salva. |
| **DELETE** | `/tasks/:id` | Remove uma tarefa específica pelo ID. |

---

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) V20+
- [npm](https://www.npmjs.com/)

* configurado e rodando (Porta 3000)

---

## Como Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone <https://github.com/LuanLoboP/Lista_de_Tarefas-Rails-E-React.git>

   ```

2. **Entre na pasta do projeto:**

   ```bash
   cd frontend

   ```

3. **Instale as dependências:**

   ```bash
   npm install

   ```

4. **Inicie a aplicação:**
   ```bash
   npm start
   ```

O projeto vai pedir para rodar na porta 3001 (Só digitar Y, no terminal), pois o _Rails_ está rodando na porta 3000 http://localhost:3001

**Observações Importantes**

->>>> O backend (API) deve estar ativo para que as tarefas sejam carregadas.

->>>> Certifique-se de que o CORS está configurado no Rails para permitir as requisições da porta 3001. As vezes pode não ser nescessário, testei sem essa gem e consigui criar e deletar até o momento, mas para evitar é melhor usa-lá.
