import React from 'react';

export default function Square (props) {

  let bomb = 'fas fa-bomb';
  let flag = 'fas fa-flag';

  const classList = 'col square null';


  return (
    <div className={classList} id={props.sq} onClick={props.onClick}>
      {props.hidden ? <div className='hidden' id={props.key}>
      </div> :
      <div>
      {props.val === 'x' ? <i className={bomb}/> : <span>{props.val}</span>}
      </div>}
    </div>
  )
}
