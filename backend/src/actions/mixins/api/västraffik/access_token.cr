require "http/client"
require "json"

SECRET_AUTH_KEY = "dDRkUzlTQm5UMHpwWVRHeDU4YlJNcUx2NnhFYTpRY1hadEZmQ3pzQ0Z6U0FyZFdHdTIzTGF0YUlh"

module Api::Västraffik::AccessToken

  HEADER = HTTP::Headers{"Authorization" => "Basic #{SECRET_AUTH_KEY}", "accept" => "application/json"} 

  private def get_new_token
    uri = URI::Params.encode({"grant_type" => "client_credentials"})
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/token", query: uri)
    response = HTTP::Client.post(route, HEADER)
    json = JSON.parse(response.body)

    SaveAcessToken.create!(access_token: json["access_token"].as_s, time_of_expire: Time.utc + json["expires_in"].as_i.seconds)
    json["access_token"].as_s
  end

  private def token?
    begin
      @token = AcessTokenQuery.new.time_of_expire.gte(Time.utc).first.access_token
    rescue
      @token = get_new_token["access_token"]
    end
    continue 
  end
end