import React, { Component } from 'react';
import Square from './comp.square';
import GameState from './comp.settings';
import Instructions from './comp.instructions';

export default class Game extends Component {

  state = {
    rows: 10,
    cols: 10,
    mines: 10,
    board: [],
    timeStart: null,
    time: 0,
    gameOn: false,
    newGame: false,
  }

// game state events
  handleNewGame = () => {
    this.setup();
    this.startGame();
  };

  startGame = () => {
    this.setState({
      timeStart: new Date() - this.state.time,
      time: 0,
      gameOn: true
    });

    this.timer = setInterval(()=> this.setState({
      time: this.state.time + 1
    }), 1000);
    document.getElementById('gameStartBtn').disabled = true;
  }

  handleGameWin = () => {
    this.setState({
      gameOn: false,
      newGame: true,
    });
    alert('you win!');

    clearInterval(this.timer);
    document.getElementById('gameStartBtn').disabled = false;
    document.getElementById('gameStartBtn').innerHTML = 'Play Again';
  }

  handleGameOver = () => {
    this.setState({
      gameOn: false,
      newGame: true
    });
    this.revealMines();
    alert('game over, loser');

    clearInterval(this.timer);
    document.getElementById('gameStartBtn').disabled = false;
    document.getElementById('gameStartBtn').innerHTML = 'Try Again?';
  }

  revealMines = () => {
    let game = this.state.board;
    game.forEach(sq => {
      if (sq.mine) sq.hidden = false;
    });

    this.setState({
      board: game,
    })
  }

// set-up functions

  getSurrounding = (sq) => {
    let area = [], row=Math.floor(sq/this.state.cols), col=sq%this.state.cols;
    let x = this.state.cols;

    if (row > 0) {
      area.push(sq-x);
      if (col > 0) {
        area.push(sq-x-1);
      }
      if (col < x-1) {
        area.push(sq-x+1);
      }
    }

    if (col > 0) {
      area.push(sq-1);
    }

    if (col < x-1) {
      area.push(sq+1);
    }

    if (row < this.state.rows-1) {
      area.push(sq+x);
      if (col > 0) {
        area.push(sq+x-1);
      }
      if (col < x-1) {
        area.push(sq+x+1);
      }
    }

    return area;
  }

  setup = () => {
    // generate blank board
    let size = this.state.rows * this.state.cols, game = [];

    while (game.length < size-1) {
      for (let i =0; i < size; i++) {
        let row = Math.floor(i/this.state.cols);
        let col = i%this.state.cols;
        game.push({id: i, val: null, hidden: true, mine: false, flag: false, row: row, col: col});
      }
    }


    // plant mines randomly
    let count = this.state.mines;

    while (count > 0) {
      let rand = Math.floor(Math.random() * size);
      if (game[rand].mine === false) {
        game[rand].mine = true;
        count--;}
      }

    // tally surrounding mines
    for (let sq of game) {
      if (sq.mine === true) {
        let area = this.getSurrounding(sq.id);
        for (let i = 0; i < area.length; i++) {
          let id = area[i];

          if (game[id].val === null) {
            game[id].val = 1
          } else game[id].val++;
        }
      }

    }


    this.setState({
      board: game,
    })
  }

  componentWillMount = () => {
    this.setup();
  }

// handle moves

  evaluateGame = () => {
    let game = this.state.board;
    let progress = 0;

    game.forEach(sq => {
      if (sq.mine === true || sq.hidden === false) {
        progress++;
      }
    });

    if (progress === game.length) {
      this.handleGameWin();
    }
  }

  handleMove = (sq) => {
    let game = this.state.board;
    let current = game[sq];
    // reveal clicked square
    current.hidden = false;

    // handle if you have clicked a mine
    if (current.mine === true) {
      this.handleGameOver();
    }
    // handle if expand
    else if (current.val === null) {
      let area = this.getSurrounding(sq);
      for (let i = 0; i < area.length; i++) {
        let id = area[i];
        if (game[id].mine === false && game[id].hidden === true) {
        this.handleMove(id);
      }
    }
  }

  this.setState({
    board: game
  });

  this.evaluateGame();
}

// handle click events


  handleClick = (e) => {
    if (!this.state.gameOn) {
      this.startGame();
    }
    e.stopPropagation();

    let i = parseInt(e.target.id);

    setTimeout(() => {
      if (!this.state.board[i].flag) {
        this.handleMove(i);
      }
    }, 200);

  }

  handleDoubleClick = (e) => {

    let i = parseInt(e.target.id);
    let game = this.state.board;

    game[i].flag = !game[i].flag;

    this.setState({
      board: game
    })
  }

// display function for Game

  makeBoard = (arr) => {
    let board = [], row = [];
    for (let i = 0; i < arr.length; i++) {
      row.push(<Square
          val={arr[i].val}
          hidden={arr[i].hidden}
          mine={arr[i].mine}
          flag={arr[i].flag}
          id={arr[i].id}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          gameOn={this.state.gameOn}/>);

      if ((i+1)%10 === 0) {
        board.push(<div className='row'>{row}</div>);
        row = [];
    }
  }
    return board;
  }




  render () {
    return (
      <div className='App'>
        <GameState
          time={this.state.time}
          startGame={this.startGame}
          newGame={this.state.newGame}
          onNewGame={this.handleNewGame} />
        <div className='board'>
          {this.makeBoard(this.state.board)}
        </div>
        <Instructions />
      </div>
    )
  }
}
