import React from 'react';

export default function Square (props) {

  let bomb = 'fas fa-bomb';
  let flag = 'fas fa-flag';


  return (
    <div className='col square null' onClick={props.onClick}>
      {props.hidden ? <div className='hidden'  id={props.id}>
      </div> :
      <div id={props.id}>
      {props.val === 'x' ? <i className={bomb}/> : <span>{props.val}</span>}
      </div>}
    </div>
  )
}
