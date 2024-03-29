class AccessToken < BaseModel
  table do
    column access_token : String
    column time_of_expire : Time
  end
end
