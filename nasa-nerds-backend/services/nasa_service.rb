require 'date'

class NasaService
  BASE_URL = 'https://api.nasa.gov'.freeze
  DATE_FORMAT = /\A\d{4}-\d{2}-\d{2}\z/.freeze
  TIMEOUT_SECONDS = 10

  class InvalidDateError < StandardError; end
  class UpstreamError < StandardError; end

  def self.fetch_asteroids(start_date, end_date)
    validate_date!(start_date)
    validate_date!(end_date)

    request do
      HTTParty.get(
        "#{BASE_URL}/neo/rest/v1/feed",
        query: {
          start_date: start_date,
          end_date: end_date,
          api_key: api_key
        },
        timeout: TIMEOUT_SECONDS
      )
    end
  end

  def self.fetch_apod(date = nil)
    validate_date!(date) if date

    query = { api_key: api_key }
    query[:date] = date if date

    request do
      HTTParty.get("#{BASE_URL}/planetary/apod", query: query, timeout: TIMEOUT_SECONDS)
    end
  end

  def self.api_key
    ENV.fetch('NASA_API_KEY', 'DEMO_KEY')
  end
  private_class_method :api_key

  def self.validate_date!(date)
    return if date.is_a?(String) && date.match?(DATE_FORMAT) && Date.valid_date?(*date.split('-').map(&:to_i))

    raise InvalidDateError, "Invalid date format: #{date.inspect}. Expected YYYY-MM-DD."
  end
  private_class_method :validate_date!

  # Wraps the actual HTTP call: HTTParty raises plain Ruby/network exceptions
  # (timeouts, DNS failures, connection refused) instead of returning a
  # response object for those cases, so we normalize them into one error type
  # the app layer can rescue.
  def self.request
    yield
  rescue Net::OpenTimeout, Net::ReadTimeout, Timeout::Error => e
    raise UpstreamError, "NASA API request timed out: #{e.message}"
  rescue SocketError, Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
    raise UpstreamError, "Could not reach NASA API: #{e.message}"
  end
  private_class_method :request
end
