require "http/client"
require "json"

class Api::Västraffik::ShowMore < ApiAction
  @token : String = ""

  before token?

  include Api::Auth::SkipRequireAuthToken

  post "/api/vastraffik/more_routes" do
    route = params.from_json["ref"].as_s
    header = HTTP::Headers{"Authorization" => "Bearer #{@token}", "accept" => "application/json"} 
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/pr/v4/#{route}")
    response = HTTP::Client.get(route, header)
    get_new_token()
    raw_json response.body
  end
end