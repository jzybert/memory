defmodule Memory.GameServer do
  use GenServer

  alias Memory.Game

  ## Client Interface
  def start_link(_args) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def view(game, user) do
    GenServer.call(__MODULE__, {:view, game, user})
  end

  def add_user(game, user) do
    GenServer.call(__MODULE__, {:add, game, user})
  end

  def click_tile(game, user, index) do
    GenServer.call(__MODULE__, {:click, game, user, index})
  end

  def check_match(game, user) do
    GenServer.call(__MODULE__, {:match, game, user})
  end

  def check_finish(game, user) do
    GenServer.call(__MODULE__, {:finish, game, user})
  end

  def reset(game, user) do
    GenServer.call(__MODULE__, {:reset, game, user})
  end

  # Implementation
  def init(state) do
    {:ok, state}
  end

  def handle_call({:view, game, user}, _from, state) do
    gg = Map.get(state, game, Game.new)
    {:reply, Game.client_view(gg, user), Map.put(state, game, gg)}
  end

  def handle_call({:add, game, user}, _from, state) do
    gg = Map.get(state, game, Game.new)
    |> Game.add_user(user)
    vv = Game.client_view(gg, user)
    {:reply, vv, Map.put(state, game, gg)}
  end

  def handle_call({:click, game, user, index}, _from, state) do
    gg = Map.get(state, game, Game.new)
    |> Game.click_tile(user, index)
    vv = Game.client_view(gg, user)
    {:reply, vv, Map.put(state, game, gg)}
  end

  def handle_call({:match, game, user}, _from, state) do
    gg = Map.get(state, game, Game.new)
    |> Game.check_match(user)
    vv = Game.client_view(gg, user)
    {:reply, vv, Map.put(state, game, gg)}
  end

  def handle_call({:finish, game, user}, _from, state) do
    gg = Map.get(state, game, Game.new)
    |> Game.check_finish(user)
    vv = Game.client_view(gg, user)
    {:reply, vv, Map.put(state, game, gg)}
  end

  def handle_call({:reset, game, user}, _from, state) do
    gg = Map.get(state, game, Game.new)
    |> Game.reset(user)
    vv = Game.client_view(gg, user)
    {:reply, vv, Map.put(state, game, gg)}
  end
end