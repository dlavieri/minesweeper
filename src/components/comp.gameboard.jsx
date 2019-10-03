import React, { Component } from 'react';
import Square from './comp.square';

export default class Game extends Component {

  state = {
    size: 100,
    col: 10,
    row: 10,
    difficulty: 0.1,
    values: [],
    mask: [],
  }

  componentWillMount = () => {
    let values = Array(this.state.size);

    for (let i = 0; i < values.length; i++) {
      if (Math.random() < this.state.difficulty) {
        values[i] = 'x';
      } else values[i] = null;
    }

    for (let i = 0; i < values.length; i++) {

      if (values[i] !== 'x' && i%10 === 0) {
        let zone = [values[i-10], values[i-9], values[i+1], values[i+10], values[i+11]];
        let count = zone.filter((val)=> val === 'x').length;
        values[i] = count === 0 ? null : count;
      }
      else if (values[i] !== 'x' && i%10 === 9) {
        let zone = [values[i-10], values[i-11], values[i-1], values[i+10], values[i+9]];
        let count = zone.filter((val)=> val === 'x').length;
        values[i] = count === 0 ? null : count;
      }
      else if (values[i] !== 'x') {
        let zone = [values[i-11], values[i-10], values[i-9], values[i-1], values[i+1], values[i+9], values[i+10], values[i+11]];
        let count = zone.filter((val)=> val === 'x').length;
        values[i] = count === 0 ? null : count;
      }
    }

    const game = values.map(value => {
      return {value, index: 0, hidden: true};
    });

    for (let i = 0; i < game.length; i++) {
      game[i].index = i;
    };

    console.log(game);

    this.setState({
      values: game,
    });
  }

  handleGameOver = () => {
    console.log('game over, loser');
  }

  handleMove = (sq) => {
    let game = this.state.values;
    let current = game[sq];

    const reveal = new Set();

    if (current.value === 'x') {
      reveal.add(current);
      this.handleGameOver();
    } else if (typeof current.value === 'number') {
      reveal.add(current);
    } else {
      for (let i = current.index; i<

      }


    for (let square of reveal) {
      let i = square.index;
      game[i].hidden = false;
    };



    this.setState({
      values: game
    });
  }

  handleClick = (e) => {
    let i = parseInt(e.target.id);

    this.handleMove(i);


}

  makeBoard = (arr) => {
    const board = [];
    let row = [];

    for (let i = 0; i < arr.length; i++) {
      row.push(<Square sqValue={arr[i].value}
          hidden={arr[i].hidden}
          sq={i}
          onClick={this.handleClick}/>);

      if ((i+1)%10 === 0) {
        board.push(<div className='row'>{row}</div>);
        row = [];
    }
  }
    return board;
  }




  render () {
    return (
      <div className='board'>
        {this.makeBoard(this.state.values)}
      </div>
    )
  }
}
