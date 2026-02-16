Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :options, :delete]
  end
end

# GET (busca dados), 
# POST (cria dados), 
# PUT (atualiza totalmente), 
# PATCH (atualiza parcialmente) 
# DELETE (remove)