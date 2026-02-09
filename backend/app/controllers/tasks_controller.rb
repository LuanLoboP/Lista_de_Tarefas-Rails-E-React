class TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create #cria
    task = Task.create(task_params)
    render json: task
  end

  def destroy #deleta
    Task.find(params[:id]).destroy
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:title, :completed)
  end
end
