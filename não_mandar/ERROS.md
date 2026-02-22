# Fiz este arquivo para falar sobre erro que enfrentei e como solucionei os mesmo

## ERRO AO TROCAR O MÉTODO HTTP (POST => PATCH)

-> O uso do POST esta normal na aplicação, porém estou atualizando uma lista, e o método POST não é recomendado nestes casos, pois ele envia dados novos, enquanto PATCH altera os existentes na aplicação RESTful.

fetch("http://localhost:3000/tasks", {
method: "POST", // método POST
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

-> POST estava resolvendo, mas prefiro seguir o padrão
-> PATCH acaba disparando o preflight
-> Preflight exige CORS configurado, configurei, mas o erro persisti

-> Código no backend para editar:
def update
task = Task.find(params[:id]) # aqui ele procura no banco o id passado pelo react
if task.update(task_params) # se a tarefa existir, então retorna o true para o react, ai ele atualiza
render json: task
else # se não ele devolve uma mensagem de erro de validação
render json: task.errors, status: :unprocessable_entity # código http 422
end
end

Essa função faz 3 coisas:

🔎 Procura a tarefa pelo ID

✏️ Tenta atualizar com os novos dados

📤 Responde para o React dizendo se deu certo ou errado

🔹 Analogia

Imagine:

Você quer entregar uma carta (PATCH)

O porteiro (navegador) exige ver se o prédio permite entrega antes (OPTIONS)

Se o prédio não aceita OPTIONS, nem sua carta chega.

Por isso, você precisa liberar OPTIONS no “controle do prédio” (CORS)

Fluxo completo: React → Rails → Controller → Banco de dados
[React Frontend]
|
| fetch("http://localhost:3000/tasks") ← GET /tasks
v
[Rails Router - routes.rb]
|
| resources :tasks → mapeia GET /tasks → TasksController#index
v
[TasksController#index]
|
| Task.all → consulta todas as tarefas no banco
v
[Banco de dados (SQLite/Postgres)]
|
| retorna array JSON de tarefas
v
[TasksController#index]
|
| render json: Task.all
v
[React Frontend]
|
| setLista(data) → lista.map() renderiza a lista de tarefas

🔹 Explicação do fluxo

React Frontend

Usuário abre a página ou clica em “Atualizar lista”.

React faz fetch("http://localhost:3000/tasks").

Rails Router (routes.rb)

O request chega ao Rails, mas Rails precisa de um mapa para saber quem atende cada URL.

resources :tasks, only: [:index, :create, :update, :destroy] → cria as rotas:

Método URL Controller#Action
GET /tasks TasksController#index
POST /tasks TasksController#create
PATCH /tasks/:id TasksController#update
DELETE /tasks/:id TasksController#destroy

Sem isso, Rails não sabe que /tasks existe → retorna 404.

Controller (TasksController)

A ação index é chamada.

Executa Task.all → pega todas as tarefas do banco.

Banco de dados

SQLite, Postgres ou outro banco retorna os dados.

Rails transforma isso em JSON.

Resposta para React

Rails envia o array JSON de tarefas.

React recebe e atualiza o estado: setLista(data).

.map() percorre lista e renderiza cada tarefa.

🔹 Analogia visual simplificada
React (usuario) --> faz fetch --> Rails (mapa: routes.rb)
Rails (routes.rb) --> chama controller correto --> TasksController#index
TasksController#index --> consulta banco --> retorna JSON
JSON --> React atualiza lista --> renderiza na tela

Se routes.rb não existir ou estiver errado → Rails não sabe qual controller chamar → 404

Se controller não existir → Rails retorna 500

Se estado React não for array → .map() quebra
