require "http/client"
require "json"

class Api::Västraffik::Show < ApiAction
  @token : String = ""

  before token?

  include Api::Auth::SkipRequireAuthToken
  post "/api/vastraffik" do
    header = HTTP::Headers{"Authorization" => "Bearer #{@token}", "accept" => "application/json"} 
    departure_place, arrival_place = params.from_json["orginName"]["value"].to_s, params.from_json["destinationName"]["value"].to_s
    departure_place_name, arrival_place_name = params.from_json["orginName"]["label"].to_s, params.from_json["destinationName"]["label"].to_s
    via_gid = params.from_json["viaGid"]["value"].to_s
    time = params.from_json["time"].to_s
    date_time = params.from_json["dateTime"].to_s
    transport_modes = params.from_json["transportModes"].as_a.map(&.to_s)
    onlyDirectConnections = params.from_json["onlyDirectConnections"].to_s
    
    transport_modes << "walk"


    uri = URI::Params.encode({"originGid" => departure_place, "onlyDirectConnections" => onlyDirectConnections, "viaGid" => via_gid, "destinationGid" => arrival_place, "orginName" => departure_place_name, "destinationName" => arrival_place_name, "transportModes" => transport_modes, "Authorization" => KEY})
    if time != "now"
      time_uri = URI::Params.encode({"dateTimeRelatesTo" => time, "dateTime" => date_time})
      uri += "&#{time_uri}"

    end
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/pr/v4/journeys", query: uri)
    response = HTTP::Client.get(route, header)
    raw_json response.body
  end
end

