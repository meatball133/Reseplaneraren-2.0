require "http/client"
require "json"


class Api::Västraffik::Show < ApiAction

  HEADER = HTTP::Headers{"Authorization" => "Bearer #{KEY}", "accept" => "application/json"} 

  include Api::Auth::SkipRequireAuthToken
  post "/api/vastraffik" do
    departure_place, arrival_place = params.from_json["orginName"].as_s, params.from_json["destinationName"].as_s
    uri_geo_start = URI::Params.encode({"name" => departure_place, "includeTariffZones" => "true", "includeMunicipality" => "true", "isRegularTraffic" => "true", "limit" => "10", "offset"=>"0", "includeGeometry" => "true"})
    uri_geo_end = URI::Params.encode({"name" => arrival_place, "includeTariffZones" => "true", "includeMunicipality" => "true", "isRegularTraffic" => "true", "limit" => "10", "offset"=>"0", "includeGeometry" => "true"})

    route_geo_start = URI.new("https", "ext-api.vasttrafik.se", path: "/geo/v2/StopPoints", query: uri_geo_start)
    route_geo_end = URI.new("https", "ext-api.vasttrafik.se", path: "/geo/v2/StopPoints", query: uri_geo_end)

    p HTTP::Client.get(route_geo_start, HEADER).body
    p HTTP::Client.get(route_geo_end, HEADER).body

    route_geo_start_response = JSON.parse(HTTP::Client.get(route_geo_start, HEADER).body)
    route_geo_end_response = JSON.parse(HTTP::Client.get(route_geo_end, HEADER).body)

    p route_geo_start_response
    p route_geo_end_response

    gid_start = route_geo_start_response["stopPoints"][0]["gid"].to_s
    gid_end = route_geo_end_response["stopPoints"][0]["gid"].to_s


    uri = URI::Params.encode({"originGid" => gid_start, "destinationGid" => gid_end, "orginName" => departure_place, "destinationName" => arrival_place, "Authorization" => KEY})
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/pr/v4/journeys", query: uri)
    response = HTTP::Client.get(route, HEADER)
    raw_json response.body
  end
end
