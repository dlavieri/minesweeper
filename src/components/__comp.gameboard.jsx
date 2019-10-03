import React, { Component } from 'react';
import Square from './comp.square';

export default class Game extends Component {

  state = {
    row: 10,
    col: 10,
    mines: 10,
    board: [],
  }

  componentWillMount = () => {
    let rows = this.state.row;
    let cols = this.state.col;
    let game = [];
    let chance = this.state.mines/(rows*cols);

    let mineCount = 0;

    while (game.length < rows) {
      let row = [];
      for (let i =0; i < cols; i++) {
        if (mineCount < this.state.mines && Math.random() <= chance) {
          row.push({row: game.length, col: i, val: 'x', hidden: false});
          mineCount++;
        } else row.push({row: game.length, col: i, val: null, hidden: false});
      }
      game.push(row);
      row = [];
    }

    console.log(game);
    this.setState({
      board: game,
    })
  }


  handleGameOver = () => {
    console.log('game over, loser');
  }

  handleClick = (e) => {
    let i = parseInt(e.target.id);
    this.handleMove(i);
}

  makeBoard = (arr) => {

    const game = arr.map(arr => {
      return <div className='row'> {arr.map(sq => {
        return <Square
          val={sq.val}
          col={sq.col}
          row={sq.row}
          hidden={sq.hidden} />
      })} </div>
    });

    return game;

  }




  render () {
    return (
      <div className='board'>
        {this.makeBoard(this.state.board)}
      </div>
    )
  }
}
