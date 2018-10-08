defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game
  alias Memory.GameServer

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      socket = assign(socket, :game, name)
      game = GameServer.add_user(name, socket.assigns[:user])
      {:ok, %{"join" => name, "game" => game}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("click_tile", %{"index" => index}, socket) do
    view = GameServer.click_tile(socket.assigns[:game], socket.assigns[:user], index)
    MemoryWeb.Endpoint.broadcast("games:#{socket.assigns[:game]}", "change", view)
    {:reply, {:ok, %{"game" => view}}, socket}
  end

  def handle_in("check_match", payload, socket) do
    view = GameServer.check_match(socket.assigns[:game], socket.assigns[:user])
    MemoryWeb.Endpoint.broadcast("games:#{socket.assigns[:game]}", "change", view)
    {:reply, {:ok, %{"game" => view}}, socket}
  end

  def handle_in("check_finish", payload, socket) do
    view = GameServer.check_finish(socket.assigns[:game], socket.assigns[:user])
    MemoryWeb.Endpoint.broadcast("games:#{socket.assigns[:game]}", "change", view)
    {:reply, {:ok, %{"game" => view}}, socket}
  end

  def handle_in("reset", paylod, socket) do
    view = GameServer.reset(socket.assigns[:game], socket.assigns[:user])
    MemoryWeb.Endpoint.broadcast("games:#{socket.assigns[:game]}", "change", view)
    {:reply, {:ok, %{"game" => view}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
