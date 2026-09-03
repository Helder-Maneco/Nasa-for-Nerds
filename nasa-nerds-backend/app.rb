require_relative 'config/environment.rb'
require_relative 'services/nasa_service.rb'

# Configuração do CORS
# Em produção só o frontend publicado pode chamar a API; em desenvolvimento
# libertamos localhost para não travar o `npm run dev`.
ALLOWED_ORIGINS = if ENV['RACK_ENV'] == 'production'
                    ENV.fetch('ALLOWED_ORIGIN', 'https://helder-maneco.github.io').split(',')
                  else
                    ['http://localhost:5173', 'http://127.0.0.1:5173']
                  end

use Rack::Cors do
  allow do
    origins(*ALLOWED_ORIGINS)
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
