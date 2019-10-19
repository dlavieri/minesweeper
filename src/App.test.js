import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './components/comp.gameboard';
import Square from './components/comp.square';
import Timer from './components/comp.timer';

Enzyme.configure({adapter: new EnzymeAdapter() });

test('renders without crashing', () => {
  const wrapper = shallow(<App />);
});

describe('Gameboard', () => {
  const gameSetup = (props={}, state=null) => {
    const wrapper = shallow(<Game {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
  };

  test('renders without crashing', () => {
    const wrapper = gameSetup();
    const board = wrapper.find({className: 'board'});
    expect(board.length).toBe(1);
  });

  test('renders proper number of rows and squares', () => {
    const wrapper = gameSetup();
    wrapper.setState({rows: 10, cols: 10});
    const rows = wrapper.find({className: 'row'});
    expect(rows.length).toBe(10);

    const squareComps = wrapper.find(Square);
    expect(squareComps.length).toBe(100);
  });

  test('renders correct number of mines', ()=> {
    const wrapper = gameSetup();
    wrapper.setState({mines: 10});
    const squareComps = wrapper.find(Square);
    const mines = squareComps.find({mine: true});
    expect(mines.length).toBe(10);
  })
})

describe('Timer', () => {

  const setupTimer = (props={}) => {
    const wrapper = shallow(<Timer {...props} />);
    return wrapper;
  };



  test('timer starts at zero', () => {
    const wrapper = setupTimer({time: 0});
    const timerSec = wrapper.find({"data-test": 'timer-sec'});
    const timerMin = wrapper.find({"data-test": "timer-min"});
    expect(timerSec.text()).toBe("00");
    expect(timerMin.text()).toBe("00 : ");
  });

  test('timer updates every second', ()=> {
    const wrapper = setupTimer({time: 1});
    const timerSec = wrapper.find({"data-test": 'timer-sec'});
    const timerMin = wrapper.find({"data-test": "timer-min"});
    expect(timerSec.text()).toBe("01");
    expect(timerMin.text()).toBe("00 : ");
  });

  test('timer properly displays mm:ss time', ()=> {
    const wrapper = setupTimer({time: 60});
    const timerSec = wrapper.find({"data-test": 'timer-sec'});
    const timerMin = wrapper.find({"data-test": "timer-min"});
    expect(timerSec.text()).toBe("00");
    expect(timerMin.text()).toBe("01 : ");
  });

  test('timer stops at game finish', () => {
    const wrapper = setupTimer({time: 50, gameOn: false});
    setTimeout(() => {
      const timerSec = wrapper.find({"data-test": "timer-sec"});
      expect(timerSec.text()).toBe("50");
    }, 1000)
  });
})
