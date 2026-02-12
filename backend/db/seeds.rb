# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Criando dados iniciais no banco: 
# Olhei o db:seed, e se alguém rodar várias vezes este comando ?
# Os dados seriam duplicados, trilpicados e etc....
# Então destroy.all (que destroi multiplos registros de um banco de dados)
puts "Deletando dados"
Task.destroy_all 

puts "Criando os dados para popular" 
tasks = [
  { title: "Jogar bola", completed: false },
  { title: "Sair para o cinema", completed: false },
  { title: "Estudar Rails API", completed: false },
  { title: "Treinar React", completed: false },
  { title: "Fazer compras", completed: true }
]

tasks.each do |task|
    Task.create!(task)
end