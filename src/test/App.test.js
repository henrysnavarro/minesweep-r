import React from 'react';
import ReactDOM from 'react-dom';
import MinesweeperGame from '../react/MinesweeperGame';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

const renderer = new ShallowRenderer();
renderer.render(<App/>);
const result = renderer.getRenderOutput();

test('The App component should be rendered with correct structure', () => {
  expect(result.props.children).toEqual([
        <header className="App-header">
          <div className="brandContainer">
            <div className="logoHolder">
              <img src="bomb.svg" className="logoMine" alt=""/>
              <img src="logo.svg" className="logoReact" alt="logo"/>
            </div>
            <div className="brandTextHolder">
              <p className="appTitle">MinesweepR</p>
              <p className="appDesc">Minesweeper in ReactJS</p>
            </div>
           </div>
        </header>
    ,
    <MinesweeperGame cols={9} mines={10} rows={9} openmode=""/>,
    <footer><p className="footer">by henry navarro</p></footer>
  ]);
});