import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Tile from './tile.jsx';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

class Memory extends Component {
  constructor(props) {
    super(props);

    this.channel = props.channel;
    this.state = {
      tileLetters: [],
      showLetters: [],
      matchFound: [],
      gameOver: false,
      players: {
        "info": [],
        "names": []
      }
    };

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("Unable to join", resp)});

    this.setWatchForBroadcast();

    this.resetGame = this.resetGame.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
    this.checkForMatching = this.checkForMatching.bind(this);
    this.checkForFinish = this.checkForFinish.bind(this);
    this.createTiles = this.createTiles.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let indices = [];
    this.state.showLetters.forEach((letter, index) => {
      if (letter && !this.state.matchFound[index]) {
        indices.push(index);
      }
    });

    if (indices.length === 2) {
      setTimeout(() => {
        this.checkForMatching();
        this.checkForFinish();
      }, 1000);
    }
  }

  gotView(view) {
    this.setState(view.game);
  }

  setWatchForBroadcast() {
    this.channel.on("change", view => {
      this.gotView({game: view});
    });
  }

  resetGame() {
    this.channel.push("reset")
      .receive("ok", this.gotView.bind(this));
  };

  onTileClick(index) {
    this.channel.push("click_tile", { index: index })
      .receive("ok", this.gotView.bind(this));
  }

  checkForMatching() {
    this.channel.push("check_match")
      .receive("ok", this.gotView.bind(this));
  }

  checkForFinish() {
    this.channel.push("check_finish")
      .receive("ok", this.gotView.bind(this));
  }

  onClickReturnButton() {
    window.location.href = "/";
  }

  createTiles() {
    let grid = [];
    let row = [];

    _.forEach(this.state.tileLetters, (tileLetter, ii) => {
      row.push(
          <Tile
            index={ii}
            letterDisplayed={tileLetter}
            showLetter={this.state.showLetters[ii]}
            matchFound={this.state.matchFound[ii]}
            handleOnClick={this.onTileClick}
          />
      );

      if ((ii + 1) % 4 === 0) {
        grid.push(
          <div className="row">
            {row}
          </div>
        );
        row = [];
      }
    });
    return grid;
  }

  render() {
    let names = this.state.players["names"];
    let playerInfo = this.state.players["info"];
    let maxScore = -1;
    let winningPlayer = "";
    names.forEach((name, ii) => {
      let score = playerInfo[ii]["score"];
      if (score > maxScore) {
        maxScore = score;
        winningPlayer = name;
      }
    });

    let player1 = this.state.players["names"].length >= 1 ? this.state.players["names"][0] : null;
    let player2 = this.state.players["names"].length >= 2 ? this.state.players["names"][1] : null;
    let gameOverTag = this.state.gameOver ? <div style={{marginLeft: "11%"}}><h3>Game Over! The winner is {winningPlayer}!</h3></div> : null;
    let returnButton = this.state.gameOver ? <button onClick={this.onClickReturnButton}>Return to Lobby</button> : null;

    return (
      <div className="row">
        <div className="column">
          <h3>{player1} Vs. {player2}</h3>
          {this.createTiles()}
        </div>
        <div className="column">
          <div className="row">
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
          <div className="row">
            {gameOverTag}
          </div>
          <div className="row">
            {returnButton}
          </div>
        </div>
      </div>
    );
  }
}

