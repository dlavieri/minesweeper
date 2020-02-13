import React from 'react';

export default function Square (props) {

  let bomb = 'fas fa-bomb';
  let flag = 'fas fa-flag';

  let color;

  switch (props.val) {
    case 1:
      color = 'one square';
      break;
    case 2:
      color = 'two square';
      break;
    case 3:
      color = 'three square';
      break;
    case 4:
      color = 'four square';
      break;
    case 5:
      color = 'five square';
      break;
    case 6:
      color = 'six square';
      break;
    case 7:
      color = 'seven square';
      break;
    case 8:
      color = 'eight square';
      break;
    default:
      color = '';
  }

  if (props.mine) color = 'mine square';


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
