import React, {Component} from 'react';

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchFound: false,
      showLetter: false,
      letterDisplayed: props.letterDisplayed
    };
    this.revealLetter = this.revealLetter.bind(this);
  }

  revealLetter() {
    this.setState(state => {
      let flag = state.showLetter ? true : true;
      return {showLetter: flag}
    });
  }

  render() {
    const fill = this.state.matchFound ? 'green' : (this.state.showLetter ? 'white' : 'lightgrey');

    let letter = this.state.showLetter ? <div>{this.props.letterDisplayed}</div> : <div />;

    return (
      <div onClick={this.revealLetter} style={{
        backgroundColor: fill,
        width: '100px',
        height: '100px',
        border: '2px solid black',
        cursor: 'pointer',
        margin: '20px'
       }}>
        <div style={{
          textAlign: 'center',
          width: '100%',
          height: '100%',
          paddingTop: '35px'
        }}>
          {letter}
        </div>
      </div>
    );
  }
}
