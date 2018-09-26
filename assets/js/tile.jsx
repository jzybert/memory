import React from 'react';

const Tile = ({index, matchFound, showLetter, letterDisplayed, handleOnClick}) => {
  const revealLetter = () => {
    if (!matchFound) {
      handleOnClick(index);
    }
  };

  const render = () => {
    const fill = matchFound ? 'green' : (showLetter ? 'white' : 'lightgrey');
    const letterColor = matchFound ? 'white' : 'black';
    let letter = showLetter ? <div style={{color: letterColor}}>{letterDisplayed}</div> : null;

    return (
      <div onClick={revealLetter} style={{
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
  };

  return render();
};

export default Tile;
