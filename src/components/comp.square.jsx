import React from 'react';

export default function Square (props) {

  let bomb = 'fas fa-bomb';
  let flag = 'fas fa-flag';

  let color;

  switch (props.val) {
    case 1:
      color = 'one';
      break;
    case 2:
      color = 'two';
      break;
    case 3:
      color = 'three';
      break;
    case 4:
      color = 'four';
      break;
    case 5:
      color = 'five';
      break;
    case 6:
      color = 'six';
      break;
    case 7:
      color = 'seven';
      break;
    case 8:
      color = 'eight';
      break;
    default:
      color = '';
  }

  if (props.mine) color = 'mine';


  return (
    <div className='col square null' onClick={props.flag ? null : props.onClick} onDoubleClick={props.onDoubleClick} id={props.id}>
      {props.hidden ?
      <div className='hidden'  id={props.id}>
        {props.flag ? <i className={flag} id={props.id}/> : null}
      </div> :
      <div id={props.id} className={color}>
      {props.mine === true ? <i className={bomb}/> : <span id={props.id}>{props.val}</span>}
      </div>}
    </div>
  )
}
