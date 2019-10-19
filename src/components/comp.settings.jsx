import React from 'react';
import Timer from './comp.timer';

export default function GameState (props) {
  return (
    <div className='gamestate'>
      <button id='gameStartBtn' onClick={props.newGame ? props.onNewGame : props.startGame}>Start</button>
      <Timer
        timeStart={props.timeStart}
        time={props.time}
        gameState={props.gameState}/>
    </div>
  )
}
