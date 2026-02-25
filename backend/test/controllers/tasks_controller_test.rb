require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  test "should return 404 when task not found" do
    get task_url(id: 999999) # ID que não existe
    assert_response :not_found
  end
end 

  # def index
  #   raise "Erro para teste"
  # end