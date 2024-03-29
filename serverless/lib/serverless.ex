Mix.install([:bandit, :websock_adapter])

defmodule MyWebSocketClient do
  @host "https://ext-api.vasttrafik.se/pr/v4/positions"  # Replace with your WebSocket server's host
  @port 80             # Replace with your WebSocket server's port

  def start_link() do
    Task.start_link(fn -> connect() end)
  end

  defp connect() do
    case :gun.open(:gun, {:url, {:http, @host, @port}, :websocket_client}) do
      {:ok, conn} ->
        send_message(conn)
      {:error, reason} ->
        IO.puts("Error connecting to WebSocket server: #{reason}")
    end
  end

  defp send_message(conn) do
    # Implement your message sending logic here
    message = "Hello, WebSocket!"
    :gun.ws_send(conn, message)
    # You can receive messages using :gun.ws_recv(conn) and handle them accordingly
  end
end
require Logger
webserver = {Bandit, plug: Serverless, scheme: :http, port: 4000}
{:ok, _} = Supervisor.start_link([webserver], strategy: :one_for_one)
Logger.info("Plug now running on localhost:4000")
Process.sleep(:infinity)
