class CreateTarefas < ActiveRecord::Migration[8.1]
  def change
    create_table :tarefas do |t|
      t.string :titulo
      t.boolean :concluida

      t.timestamps
    end
  end
end
