import React from 'react';

export default function Square (props) {

  let bomb = 'fas fa-bomb';
  let flag = 'fas fa-flag';


  return (
    <div className='col square null' onClick={props.onClick} onDoubleClick={props.onDoubleClick} id={props.id}>
      {props.hidden ?
      <div className='hidden'  id={props.id}>
        {props.flag ? <i className={flag} /> : null}
      </div> :
      <div id={props.id}>
      {props.mine === true ? <i className={bomb}/> : <span>{props.val}</span>}
      </div>}
    </div>
  )
}
