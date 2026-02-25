class Task < ApplicationRecord
    # Validates impede dados incompletos, como campo vazio ou campo que ultrapassem 30 caracteres
    validates :title, presence: true, length: {maximum: 30}
    # presence: true: => O título é obrigatório passar
    # length: {maximum: 30} => E o título pode ter, no máximo, 30 caracteres
end
