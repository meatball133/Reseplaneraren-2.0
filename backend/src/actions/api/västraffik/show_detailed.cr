require "http/client"
require "json"

KEY = "eyJ4NXQiOiJaV05sTURNNE56SmpZelZrT1dFNU16RTFNalF5TTJaaE5XSm1ORE0zWkRVMk9HRXdOVGxqWVRjNE1tWTNPRGcwWW1JeFlqSTFPVGMzTjJWallqZzRNdyIsImtpZCI6IlpXTmxNRE00TnpKall6VmtPV0U1TXpFMU1qUXlNMlpoTldKbU5ETTNaRFUyT0dFd05UbGpZVGM0TW1ZM09EZzBZbUl4WWpJMU9UYzNOMlZqWWpnNE13X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0NGRTOVNCblQwenBZVEd4NThiUk1xTHY2eEVhIiwiYXV0IjoiQVBQTElDQVRJT04iLCJiaW5kaW5nX3R5cGUiOiJyZXF1ZXN0IiwiaXNzIjoiaHR0cHM6XC9cL2V4dC1hcGkudmFzdHRyYWZpay5zZVwvdG9rZW4iLCJ0aWVySW5mbyI6eyJVbmxpbWl0ZWQiOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsImdyYXBoUUxNYXhDb21wbGV4aXR5IjowLCJncmFwaFFMTWF4RGVwdGgiOjAsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6ImFwaTAwMTMtcHIiLCJjb250ZXh0IjoiXC9wclwvdjQiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2NCIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiYXBpMDA1OS1nZW8iLCJjb250ZXh0IjoiXC9nZW9cL3YyIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoidjIiLCJzdWJzY3JpcHRpb25UaWVyIjoiVW5saW1pdGVkIn1dLCJhdWQiOiJodHRwczpcL1wvZXh0LWFwaS52YXN0dHJhZmlrLnNlIiwibmJmIjoxNzA4NDU1NjU5LCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InQ0ZFM5U0JuVDB6cFlUR3g1OGJSTXFMdjZ4RWEiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6IlJlc2VwbGFuZXJhcmVuXzIiLCJpZCI6MTkyOSwidXVpZCI6ImM0YmM5Y2ZkLWZiOWUtNDRmNC05ZjIyLTQ1MTQ3NzZjNGQyOCJ9LCJhenAiOiJ0NGRTOVNCblQwenBZVEd4NThiUk1xTHY2eEVhIiwic2NvcGUiOiJhcGltOnN1YnNjcmliZSIsImV4cCI6MTcwODU0MjA1OSwiaWF0IjoxNzA4NDU1NjU5LCJiaW5kaW5nX3JlZiI6ImNjOTgxZWJkZDYxMDA5MjViYTcyZDJiZTE4NWM1YTRhIiwianRpIjoiNWU1Mzg4MDgtNGMyMi00ZTAzLWI2Y2QtZmYyMGVjZGY4YWYwIn0.Dnbb6HsamQ0WGsaCIfzFdOSG3HYXWSQdo4K7vwCLe_d9tsX8dOHB5_GWOQfUh0CY8uU-EEcne2ISNnLDFaFR3wud-N2mM9BSAdUCYlChvWci9XDpCWjP8HB1JX_COy0bWz6Pa_CALx2Wa_m_ufGj27vDkGh5n5Lz6mlUFgCztB7hW2B6JVlqu-CZsOPymznMUUt_SpipVpNkaZDl8FiaTF1wX30HOxH222klzt0w-y2-bvn6C4DSfHycpWCqwkpVe17qte4Ab0-P9VbquxtJLi88zx-kO8AFRV3SeIuc707FvtK9aV8coQp91fpFpAhQLYsbyvstiH7IVI9-wQSHDg"

class Api::Västraffik::ShowDetailed < ApiAction
  @token : String = ""

  before token?

  include Api::Auth::SkipRequireAuthToken

  post "/api/vastraffik/route" do
    id = params.from_json["detailsReference"].as_s
    header = HTTP::Headers{"Authorization" => "Bearer #{@token}", "accept" => "application/json"} 
    uri = URI::Params.encode({"includes" => ["ticketsuggestions", "triplegcoordinates", "validzones", "servicejourneycalls", "servicejourneycoordinates", "links", "occupancy"] })
    route = URI.new("https", "ext-api.vasttrafik.se", path: "/pr/v4/journeys/#{id}/details", query: uri)
    response = HTTP::Client.get(route, header)
    get_new_token()
    raw_json response.body
  end
end