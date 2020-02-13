import React from 'react';

export default function Instructions () {
  return (
    <div className='instruct'>
      <h5>How to Play</h5>
       <p className='instruct-item' >Click <span>start</span>, or any square, to begin the game.</p>
       <p className='instruct-item' >Clicking a square will reveal what is underneath - if there is a mine, game over!</p>
       <p className='instruct-item' >Double-clicking a square will mark that square with a flag</p>
       <p className='instruct-item' >Reveal all non-mine squares to win!</p>
    </div>

  )
}
