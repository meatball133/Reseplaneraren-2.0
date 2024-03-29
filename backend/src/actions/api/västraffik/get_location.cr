require "http/client"
require "json"

class Api::Västraffik::GetLocation < ApiAction
  @token : String = ""

  before token?

  include Api::Auth::SkipRequireAuthToken

  post "/api/vastraffik/get_location" do
    name = params.from_json["name"].as_s
    header = HTTP::Headers{"Authorization" => "Bearer #{@token}", "accept" => "application/json"} 
    uri = URI::Params.encode({"limit" => "5", "q" => name, "types" => ["stoparea"] })
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/pr/v4/locations/by-text", query: uri)
    response = HTTP::Client.get(route, header)
    get_new_token()
    raw_json response.body
  end
end