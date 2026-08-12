class NasaService
  BASE_URL = 'https://api.nasa.gov'.freeze

  def self.fetch_asteroids(start_date, end_date)
    api_key = ENV.fetch('NASA_API_KEY', 'DEMO_KEY')
    url = "#{BASE_URL}/neo/rest/v1/feed?start_date=#{start_date}&end_date=#{end_date}&api_key=#{api_key}"
    HTTParty.get(url)
  end

  def self.fetch_apod(date = nil)
    api_key = ENV.fetch('NASA_API_KEY', 'DEMO_KEY')
    url = "#{BASE_URL}/planetary/apod?api_key=#{api_key}"
    url += "&date=#{date}" if date
    HTTParty.get(url)
  end
end
