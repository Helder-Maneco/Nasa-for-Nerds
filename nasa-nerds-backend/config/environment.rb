require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'] || :development)

Dotenv.load
