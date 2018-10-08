import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Tile from './tile.jsx'

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

    let gameOverTag = this.state.gameOver ? <div style={{marginLeft: "11%"}}><h3>Game Over! The winner is {winningPlayer}!</h3></div> : null;
    let returnButton = this.state.gameOver ? <button onClick={this.onClickReturnButton}>Return to Lobby</button> : null;
    return (
      <div className="row">
        <div className="column">
          <div className="row">
            <Tile
              index={0}
              letterDisplayed={this.state.tileLetters[0]}
              showLetter={this.state.showLetters[0]}
              matchFound={this.state.matchFound[0]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={1}
              letterDisplayed={this.state.tileLetters[1]}
              showLetter={this.state.showLetters[1]}
              matchFound={this.state.matchFound[1]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={2}
              letterDisplayed={this.state.tileLetters[2]}
              showLetter={this.state.showLetters[2]}
              matchFound={this.state.matchFound[2]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={3}
              letterDisplayed={this.state.tileLetters[3]}
              showLetter={this.state.showLetters[3]}
              matchFound={this.state.matchFound[3]}
              handleOnClick={this.onTileClick}
            />
          </div>
          <div className="row">
            <Tile
              index={4}
              letterDisplayed={this.state.tileLetters[4]}
              showLetter={this.state.showLetters[4]}
              matchFound={this.state.matchFound[4]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={5}
              letterDisplayed={this.state.tileLetters[5]}
              showLetter={this.state.showLetters[5]}
              matchFound={this.state.matchFound[5]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={6}
              letterDisplayed={this.state.tileLetters[6]}
              showLetter={this.state.showLetters[6]}
              matchFound={this.state.matchFound[6]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={7}
              letterDisplayed={this.state.tileLetters[7]}
              showLetter={this.state.showLetters[7]}
              matchFound={this.state.matchFound[7]}
              handleOnClick={this.onTileClick}
            />
          </div>
          <div className="row">
            <Tile
              index={8}
              letterDisplayed={this.state.tileLetters[8]}
              showLetter={this.state.showLetters[8]}
              matchFound={this.state.matchFound[8]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={9}
              letterDisplayed={this.state.tileLetters[9]}
              showLetter={this.state.showLetters[9]}
              matchFound={this.state.matchFound[9]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={10}
              letterDisplayed={this.state.tileLetters[10]}
              showLetter={this.state.showLetters[10]}
              matchFound={this.state.matchFound[10]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={11}
              letterDisplayed={this.state.tileLetters[11]}
              showLetter={this.state.showLetters[11]}
              matchFound={this.state.matchFound[11]}
              handleOnClick={this.onTileClick}
            />
          </div>
          <div className="row">
            <Tile
              index={12}
              letterDisplayed={this.state.tileLetters[12]}
              showLetter={this.state.showLetters[12]}
              matchFound={this.state.matchFound[12]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={13}
              letterDisplayed={this.state.tileLetters[13]}
              showLetter={this.state.showLetters[13]}
              matchFound={this.state.matchFound[13]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={14}
              letterDisplayed={this.state.tileLetters[14]}
              showLetter={this.state.showLetters[14]}
              matchFound={this.state.matchFound[14]}
              handleOnClick={this.onTileClick}
            />
            <Tile
              index={15}
              letterDisplayed={this.state.tileLetters[15]}
              showLetter={this.state.showLetters[15]}
              matchFound={this.state.matchFound[15]}
              handleOnClick={this.onTileClick}
            />
          </div>
          <div className="row">
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>
        <div className="column">
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

