require_relative 'config/environment.rb'
require_relative 'services/nasa_service.rb'

# Configuração do CORS
# Em produção só o frontend publicado pode chamar a API; em desenvolvimento
# aceitamos qualquer porta de localhost/127.0.0.1, porque o Vite muda de
# porta sozinho (5173, 5174, ...) quando a porta padrão está ocupada.
use Rack::Cors do
  allow do
    if ENV['RACK_ENV'] == 'production'
      origins(*ENV.fetch('ALLOWED_ORIGIN', 'https://helder-maneco.github.io').split(','))
    else
      origins(/\Ahttps?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\z/)
    end
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
  status response.code
  response.body
rescue NasaService::InvalidDateError => e
  status 400
  { error: e.message }.to_json
rescue NasaService::UpstreamError => e
  status 502
  { error: 'nasa_api_unreachable', message: e.message }.to_json
end

get '/api/apod' do
  content_type :json
  date = params[:date]

  response = NasaService.fetch_apod(date)
  status response.code
  response.body
rescue NasaService::InvalidDateError => e
  status 400
  { error: e.message }.to_json
rescue NasaService::UpstreamError => e
  status 502
  { error: 'nasa_api_unreachable', message: e.message }.to_json
end

# Bundler.require (chamado via config/environment.rb) carrega o Sinatra
# "por baixo" — isso faz o app_file que o Sinatra deteta automaticamente
# apontar para config/environment.rb em vez de app.rb, então o arranque
# automático do Sinatra nunca dispara. Arrancamos explicitamente aqui,
# só quando este ficheiro é executado diretamente (não quando é
# `require`do por rackup/Puma via config.ru).
Sinatra::Application.run! if __FILE__ == $0
