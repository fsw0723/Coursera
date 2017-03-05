class Recipe < ActiveRecord::Base
  include HTTParty

  hostport = ENV['FOOD2FORK_SERVER_AND_PORT'] || 'www.food2fork.com'
  base_uri "http://#{hostport}/api"
  format :json


  def self.for (keyword)
    key_value = ENV['FOOD2FORK_KEY'] || '28eeb1afe115d7b3f46c12400d5c680f'

    get("/search", query: {q: keyword, key: key_value})["recipes"]
  end
end
