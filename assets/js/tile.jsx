import React, {Component} from 'react';

export default class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      matchFound: props.matchFound,
      showLetter: props.showLetter,
      letterDisplayed: props.letterDisplayed
    };

    this.toggleLetter = this.toggleLetter.bind(this);
    this.revealLetter = this.revealLetter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matchFound: nextProps.matchFound,
      showLetter: nextProps.showLetter,
      letterDisplayed: nextProps.letterDisplayed
    })
  }

  toggleLetter() {
    if (!this.state.matchFound) {
      this.revealLetter();
    }
  }

  revealLetter() {
    this.props.handleOnClick(this.props.index);
  };

  render() {
    const fill = this.state.matchFound ? 'green' : (this.state.showLetter ? 'white' : 'lightgrey');
    const letterColor = this.state.matchFound ? 'white' : 'black';
    let letter = this.state.showLetter ? <div style={{color: letterColor}}>{this.state.letterDisplayed}</div> : null;

    return (
      <div onClick={this.toggleLetter} style={{
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
