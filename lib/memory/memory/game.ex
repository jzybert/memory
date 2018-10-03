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
      numberOfClicks: 0,
      score: 0,
      gameOver: false
    }
  end

  def client_view(game) do
    %{
      tileLetters: game.tileLetters,
      showLetters: game.showLetters,
      matchFound: game.matchFound,
      numberOfClicks: game.numberOfClicks,
      score: game.score,
      gameOver: game.gameOver
    }
  end

  def click_tile(game, index) do
    indices = get_indices(game.showLetters, game.matchFound)
    if length(indices) < 2 do
      incClicks = game.numberOfClicks + 1
      newGame = game
      |> Map.put(:numberOfClicks, incClicks)
      |> Map.put(:showLetters, List.replace_at(game.showLetters, index, true))
      newGame
    else
      game
    end
  end

  def check_match(game) do
    indices = get_indices(game.showLetters, game.matchFound)
    if length(indices) == 2 do
      index1 = Enum.at(indices, 0)
      index2 = Enum.at(indices, 1)
      if Enum.at(game.tileLetters, index1) == Enum.at(game.tileLetters, index2) do
        changeLetter = List.replace_at(game.matchFound, index1, true)
        |> List.replace_at(index2, true)
        Map.put(game, :matchFound, changeLetter)
        |> Map.put(:score, game.score + 50)
      else
        changeShow = List.replace_at(game.showLetters, index1, false)
        |> List.replace_at(index2, false)
        Map.put(game, :showLetters, changeShow)
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

  def check_finish(game) do
    all_matched = Enum.all?(game.matchFound, fn(match) -> match end)
    if all_matched do
      newScore = game.score + Integer.floor_div(10000, game.numberOfClicks)
      Map.put(game, :score, newScore)
      |> Map.put(:gameOver, true)
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
end
