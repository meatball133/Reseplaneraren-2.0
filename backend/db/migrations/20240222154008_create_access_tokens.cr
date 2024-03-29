class CreateAccessTokens::V20240222154008 < Avram::Migrator::Migration::V1
  def migrate
    # Read more on migrations
    # https://www.luckyframework.org/guides/database/migrations
    #
     create table_for(AccessToken) do
       primary_key id : Int64
       add_timestamps
    
       add access_token : String
       add time_of_expire : Time
    end

    # Run custom SQL with execute
    #
    # execute "CREATE UNIQUE INDEX things_title_index ON things (title);"
  end

  def rollback
    drop table_for(AccessToken)
  end
end

