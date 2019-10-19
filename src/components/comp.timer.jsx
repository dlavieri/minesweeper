import React from 'react';

export default function Timer (props) {
  const min = Math.floor(props.time/60);
  const sec = props.time%60;
  const minutes = min < 10 ? "0" + min : min;
  const seconds = sec < 10 ? "0" + sec : sec;

  return (
    <div className='timer'>
      <span data-test='timer-min'>{minutes} : </span> <span data-test='timer-sec'>{seconds}</span>
    </div>
  )
}
