import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Tile from './tile.jsx'

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tileLetters: this.getLetters(),
      showLetters: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      matchFound: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      numberOfClicks: 0
    };
    this.resetGame = this.resetGame.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
    this.checkForMatching = this.checkForMatching.bind(this);
  }

  resetGame() {
    this.setState({
      tileLetters: this.getLetters(),
      showLetters: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      matchFound: [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ],
      numberOfClicks: 0
    });
  };

  getLetters() {
    let availableLetters = [
      'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
      'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];
    let letters = [];
    for (let ii = 0; ii < 16; ii++) {
      let index = Math.floor(Math.random() * availableLetters.length);
      letters.push(availableLetters.splice(index, 1)[0]);
    }
    return letters;
  }

  onTileClick(index) {
    this.setState(state => {
      state.numberOfClicks = state.numberOfClicks + 1;
      state.showLetters[index] = !state.showLetters[index];
      return {
        showLetters: state.showLetters,
        numberOfClicks: state.numberOfClicks
      }
    });
    this.checkForMatching();
  }

  checkForMatching() {
    console.log(this.state);
    let indices = [];
    this.state.showLetters.forEach((letter, index) => {
      if (letter && !this.state.matchFound[index]) {
        indices.push(index);
      }
    });

    if (indices.length === 2) {
      if (this.state.tileLetters[indices[0]] === this.state.tileLetters[indices[1]]) {
        this.setState(state => {
          let matches = state.matchFound;
          matches[indices[0]] = true;
          matches[indices[1]] = true;
          return {matchFound: matches};
        });
      } else {
        this.setState(state => {
          let show = state.showLetters;
          show[indices[0]] = false;
          show[indices[1]] = false;
          return {showLetters: show};
        });
      }
    }
  }

  render() {
    return (
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
          <span className="score">0</span>
        </div>
      </div>
    );
  }
}

