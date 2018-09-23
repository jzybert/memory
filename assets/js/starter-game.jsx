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
      availableLetters: [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
      ]
    }
  }

  randLetter() {
    let availableLetters = this.state.availableLetters;
    let index = Math.floor(Math.random() * availableLetters.length);
    return availableLetters.splice(index, 1);
  }

  render() {
    return (
      <div className="column">
        <div className="row">
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
        </div>
        <div className="row">
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
        </div>
        <div className="row">
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
        </div>
        <div className="row">
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
          <Tile letterDisplayed={this.randLetter()}/>
        </div>
      </div>
    );
  }
}

