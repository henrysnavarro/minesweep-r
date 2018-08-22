import React, { Component } from 'react';
import MinesweeperGame from './react/MinesweeperGame';
import queryString from 'query-string';
import logo from './media/logo.svg';
import bomb from './media/bomb.svg';
import './css/App.css';

class App extends Component {
  constructor(props) {
  	super(props);
  	this.DEFAULT_ROWS = 9;
  	this.DEFAULT_COLS = 9;
  	this.DEFAULT_MINES = 10;
  }
  render() {
  	// Read the URL query params for any specified number of rows, columns and/or mines
  	const parsed = queryString.parse(window.location.search);
  	// For unspecified rows, columns or mines, use default values (9, 9 and 10 respectively)
  	let rowsParam = parseInt(parsed.rows, 10), 
  	    colsParam = parseInt(parsed.cols, 10),
  	    minesParam = parseInt(parsed.mines, 10),
  	    openMode = parsed.openmode ? parsed.openmode : '';
    let rows = rowsParam ? rowsParam : this.DEFAULT_ROWS, 
        cols = colsParam ? colsParam : this.DEFAULT_COLS,
        mines = minesParam ? minesParam : this.DEFAULT_MINES;
    return (
      <div className="App">
        <header className="App-header">
          <div className="brandContainer">
            <div className="logoHolder">
              <img src={bomb} className="logoMine" alt=""/>
              <img src={logo} className="logoReact" alt="logo"/>
            </div>
            <div className="brandTextHolder">
              <p className="appTitle">MinesweepR</p>
              <p className="appDesc">Minesweeper in ReactJS</p>
            </div>
           </div>
        </header>
        { /* instantiate main Minesweeper game custom component */ }
        <MinesweeperGame rows={rows} cols={cols} mines={mines} openmode={openMode}/>
        <footer><p className="footer">by henry navarro</p></footer>
      </div>
    );
  }
}

export default App;
