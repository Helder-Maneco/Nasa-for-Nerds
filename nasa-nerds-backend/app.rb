require_relative 'config/environment.rb'
require_relative 'services/nasa_service.rb'

# Configuration do CORS
use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

get '/' do
  content_type :json
  { status: 'online', message: 'API Nasa for Nerds rodando com sucesso!' }.to_json
end

get '/api/asteroids' do
  content_type :json
  start_date = params[:start_date] || Time.now.strftime('%Y-%m-%d')
  end_date = params[:end_date] || Time.now.strftime('%Y-%m-%d')

  response = NasaService.fetch_asteroids(start_date, end_date)
  response.body
end

get '/api/apod' do
  content_type :json
  date = params[:date]

  response = NasaService.fetch_apod(date)
  response.body
end

# FORÇA O SERVIDOR A ESCUTAR NA PORTA DO RENDER E MANTER O PROCESSO ATIVO
port = ENV['PORT'] || 4567
Rack::Handler::Puma.run(Sinatra::Application, Port: port, Host: '0.0.0.0')
