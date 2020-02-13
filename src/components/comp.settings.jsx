import React from 'react';
import Timer from './comp.timer';

export default function GameState (props) {

  let status = "gamestate " + props.gameResult;

  return (
    <div className={status}>
      
      <Timer
        timeStart={props.timeStart}
        time={props.time}
        gameState={props.gameState}/>
      <button id='gameStartBtn' onClick={props.newGame ? props.onNewGame : props.startGame}>
        Start
      </button>
    </div>
  )
}
