defmodule Memory.Game do
  def new do
    %{
      tileLetters: get_letters(),
      showLetters: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      matchFound: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      gameOver: false,
      players: %{},
      observers: %{}
    }
  end

  def new(players) do
    resetPlayers = Enum.reduce players, %{}, fn pair, acc ->
      {key, val} = pair
      value = Map.put(val, :score, 0)
      Map.put(acc, key, value)
    end
    Map.put(new(), :players, resetPlayers)
  end

  def default_player() do
    %{
      score: 0,
      isYourTurn: false
    }
  end

  def client_view(game, user) do
    %{
      tileLetters: game.tileLetters,
      showLetters: game.showLetters,
      matchFound: game.matchFound,
      gameOver: game.gameOver,
      players: %{"names" => Map.keys(game.players), "info" => Map.values(game.players)}
    }
  end

  def add_user(game, user) do
    numOfPlayers = map_size(Map.get(game, :players, %{}))
    cond do
      numOfPlayers == 0 ->
        player = default_player()
        |> Map.put(:isYourTurn, true)
        updatedGame = game
        |> Map.update(:players, %{}, &(Map.put(&1, user, player)))
        updatedGame
      numOfPlayers == 1 ->
        player = default_player()
        updatedGame = game
        |> Map.update(:players, %{}, &(Map.put(&1, user, player)))
        updatedGame
      true ->
        obv = default_player()
        updatedGame = game
        |> Map.update(:observers, %{}, &(Map.put(&1, user, obv)))
        updatedGame
    end
  end

  def click_tile(game, user, index) do
    ## Check that its the user's turn to go
    allPlayers = Map.get(game, :players, %{})
    playerInfo = Map.get(allPlayers, user, default_player())
    if playerInfo.isYourTurn do
      indices = get_indices(game.showLetters, game.matchFound)
      if length(indices) < 2 do
        newGame = game
        |> Map.put(:showLetters, List.replace_at(game.showLetters, index, true))
        newGame
      else
        game
      end
    else
      game
    end
  end

  def check_match(game, user) do
    playerInfo = Map.get(game.players, user, default_player())

    if playerInfo.isYourTurn do
      indices = get_indices(game.showLetters, game.matchFound)

      if length(indices) == 2 do
        index1 = Enum.at(indices, 0)
        index2 = Enum.at(indices, 1)

        if Enum.at(game.tileLetters, index1) == Enum.at(game.tileLetters, index2) do # They got a match
          # Update player score
          playerInfo
          |> Map.update(:score, 50, &(&1 + 50))
          # Update matches
          changeLetter = List.replace_at(game.matchFound, index1, true)
          |> List.replace_at(index2, true)
          # Compose new game map
          updatedMatch = Map.put(game, :matchFound, changeLetter)
          |> Map.update(:players, %{}, &(Map.put(&1, user, playerInfo)))
          # Swap turns
          allPlayers = Enum.reduce Map.get(updatedMatch, :players), %{}, fn pair, acc ->
            {key, val} = pair
            Map.put(acc, key, Map.update(val, :isYourTurn, false, &(!&1)))
          end
          Map.put(updatedMatch, :players, allPlayers)
        else
          # Update showing
          changeShow = List.replace_at(game.showLetters, index1, false)
          |> List.replace_at(index2, false)
          updatedShow = Map.put(game, :showLetters, changeShow)
          # Swap turns
          allPlayers = Enum.reduce Map.get(updatedShow, :players), %{}, fn pair, acc ->
            {key, val} = pair
            Map.put(acc, key, Map.update(val, :isYourTurn, false, &(!&1)))
          end
          Map.put(updatedShow, :players, allPlayers)
        end
      else
        game
      end
    else
      game
    end
  end

  defp get_indices(letters, matches) do
    get_indices(letters, matches, [], 0)
  end

  defp get_indices([head | tail], matches, acc, ii) do
    if head && !(hd matches) do
      get_indices(tail, (tl matches), (acc ++ [ii]), (ii + 1))
    else
      get_indices(tail, (tl matches), (acc), (ii + 1))
    end
  end

  defp get_indices([], _, acc, _) do
    acc
  end

  def check_finish(game, user) do
    all_matched = Enum.all?(game.matchFound, fn(match) -> match end)
    if all_matched do
      Map.put(game, :gameOver, true)
    else
      game
    end
  end

  def get_letters() do
    letters = [
      "A", "A", "B", "B", "C", "C", "D", "D",
      "E", "E", "F", "F", "G", "G", "H", "H"
    ]
    Enum.shuffle(letters)
  end

  def reset(game, user) do
    playerInfo = Map.get(game.players, user, false)
    if playerInfo do
      new(game.players)
    else
      game
    end
  end
end
