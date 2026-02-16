# => Configuração das rotas da aplicação Rails
# => O Rails precisa de um mapa de URLs para saber qual controller e ação ele deve chamar
Rails.application.routes.draw do 
  # Cria rotas REST para o recurso tasks => (tarefas)
  # only => ele limita às rotas que realmente vamos usar, evitando rotas desnecessárias na aplicação
  # bom com o only cada rota tem um significado :
  #   GET    /tasks        -> TasksController#index    (listar todas as tarefas)
  #   POST   /tasks        -> TasksController#create   (criar nova tarefa)
  #   PATCH  /tasks/:id    -> TasksController#update   (editar uma tarefa existente)
  #   DELETE /tasks/:id    -> TasksController#destroy  (deletar uma tarefa)
  resources :tasks, only: [:index, :create, :update, :destroy] 

  # antes meu código estava usando (Rails.application.draw) do, então eu enfrentei um problema
  # O PROBLEMA FOI (ERROR 404-NOT FOUND), por conta da rota não ser encontrada
  # Então pesquisei e é obrigatório usar Rails.application.routes.draw do ( .routes )
  # assim foi possível registrar corretamente as rotas na aplicação
end
