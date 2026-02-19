class TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create #cria
    task = Task.create(task_params) 

    if task.save
      render json: task, status: :created
    else 
      render json: {errors: task.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id]) # aqui ele procura no banco o id passado pelo react
    if task.update(task_params) # se a tarefa existir, então retorna o true para o react, ai ele atualiza
      render json: task
    else # se não ele devolve uma mensagem de erro de validação 
      render json: task.errors, status: :unprocessable_entity # código http 422 
    end
  end

  def destroy #deleta
    Task.find(params[:id]).destroy #procura o id no banco, achando ele destroi
    head :no_content
  end

  private # Só pode ser chamada aqui!

  def task_params
    params.require(:task).permit(:title, :completed)
  end
end
