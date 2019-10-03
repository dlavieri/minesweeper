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
          row.push({row: game.length, col: i, val: 'x', hidden: true});
          mineCount++;
        } else row.push({row: game.length, col: i, val: null, hidden: true});
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

  handleMove = (row, col) => {
    let game = this.state.board;
    let sq = game[row][col];

    sq.hidden = false;

    if (sq.val === 'x') {
      this.handleGameOver();
    } else if (sq.val === null) {
      if (game[row-1][col].val === null && game[row-1][col].hidden === true) {
        this.handleMove(row-1, col);
      }
    }

    this.setState({
      board: game
    });
  }

  handleClick = (e) => {
    let i = e.target.id.split(',');
    let row = parseInt(i[0]);
    let col = parseInt(i[1]);
    this.handleMove(row , col);
}

  makeBoard = (arr) => {

    const game = arr.map(arr => {
      return <div className='row'> {arr.map(sq => {
        return <Square
          val={sq.val}
          id={sq.row.toString() + ',' + sq.col.toString()}
          hidden={sq.hidden}
          onClick={this.handleClick} />
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
