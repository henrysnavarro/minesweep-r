import React, { Component } from 'react';
import MinesweeperScore from '../react/MinesweeperScore';
import MinesweeperCell from '../react/MinesweeperCell';

/* 
 * MinesweeperGame: main game component
 * This component contains the score (MinesweeperScore) and board (MinesweeperBoard)
 * components.  This holds the state of the game.
 * It handles clicks on cells as well as the cells' own click handlers by passing 
 * its handler methods down the property hierarchy.
 * It calls methods on the cells and score components, at specific times, instead
 * of relying on the data flow.
 */
class MinesweeperGame extends Component {
  constructor(props) {
  	super(props);
  	// correctly bind handler functions to this game instance
  	this.handleFlag = this.handleFlag.bind(this);
  	this.handleOpen = this.handleOpen.bind(this);
  	// mineMap is a JavaScript Map that will hold the cells that have mines 
  	this.mineMap = new Map();
  	// nonMineMap is a JavaScript Map that will hold the cells that do not have mines
  	// and have not been opened; hence, 
  	// each time a cell without a mine is opened, it is deleted from this map.
    // Game completion is determined when the nonMineMap is empty
  	this.nonMineMap = new Map();
  	
  	var totalCells = this.props.rows * this.props.cols,
  	    cellArray = [],
  	    cellMap = new Map(),
  	    cellCount = 0;
  	
  	// place mines randomly on the cells
  	// A random position, one in the total number of cells (rows * columns),
  	// is uniquely generated as many times as the specified number of mines
  	// A "mined" cell is entered in the 'mineMap' and marked with the property 'isMined'
  	// being true
  	for (let i=0, m=this.props.mines; i < m; i++) {
  	  let randomPos;
  	  do {
  	  	randomPos = Math.ceil(Math.random()*totalCells);
  	  	if (randomPos > totalCells) { randomPos = totalCells; }
  	  } while (this.mineMap.has(randomPos));
      this.mineMap.set(randomPos, {isMined: true, rowNum: undefined, colNum: undefined});  	  	
  	}
  	
  	// create 2-dim array of cells (rows by columns) representing the board
  	// This array is needed for the functionality of getting the adjacent cells
  	// of a specified cell; this routine of creating the array also addes the 
  	// created cells in the cell Map
  	for (let r = this.props.rows, i = 1; i <= r; i++) {
  	  let row = [];
  	  for (let c = this.props.cols, j = 1; j <= c; j++) {
  	  	let ref = React.createRef(), 
  	  	    isMined = this.mineMap.has(cellCount+1);

  	  	let cell = {
  	  		isMined: isMined, 
  	  	    opened: false,
  	  	    flagged: false,
  	  	    adjacentCount: 0, 
  	  	    rowNum: i,  // 1-indexed row number 
  	  	    colNum: j,  // 1-indexed col number
  	  	    cellID: ++cellCount,  // 1-indexed cell ID
  	  	    ref: ref,
  	  	};

  	  	if (isMined) {
  	  	  this.mineMap.set(cellCount, cell);
  	  	}
  	  	else {
  	  	  this.nonMineMap.set(cellCount, cell);
  	  	}
  	  	row.push(cell);
  	  	cellMap.set(cellCount, cell);
  	  }
  	  cellArray.push(row);
  	}
  	 
  	// count and assign the number of adjacent mines for non-mined cells in the board
  	for (let i=0, r=this.props.rows; i < r; i++) {
  	  let lowerRowBound = Math.max(0, i-1),
  	      upperRowBound = Math.min(i+1, this.props.rows-1);
  	  for (let j=0, c=this.props.cols; j < c; j++) {
  	    let leftColBound = Math.max(0, j-1),
  	        rightColBound = Math.min(j+1, this.props.cols-1),
  	        cell = cellArray[i][j];
  	    if (cell.isMined) {
  	      for (let row=lowerRowBound; row <= upperRowBound; row++) {
  	      	for (let col=leftColBound; col <= rightColBound; col++) {
  	      	  if (!(row===i && col===j)) {
  	      	  	cellArray[row][col].adjacentCount++;
  	      	  }
  	      	}
  	      }
  	    }
  	  }
  	}
  	  	
  	// assign the initial state for the game
  	this.state = {
  	  completed: false,
  	  terminated: false,
  	  minesLeft: this.props.mines,
  	  cellBoard: cellArray,
  	  cellMap: cellMap,
  	  mineMap: this.mineMap,
  	  nonMineMap: this.nonMineMap,
  	  scoreRef: React.createRef()
  	};
  }
  
  // get the (maximum of 8) adjacent cells for the specified cell
  // A cell in the middle of the board will have 8 adjacent cells,
  // while each cell in each corner will only have 3.
  getAdjacents(cell) {
  	var lowerRowBound = Math.max(0, cell.rowNum-1-1),
  	    upperRowBound = Math.min(cell.rowNum-1+1, this.props.rows-1),
  	    leftColBound = Math.max(0, cell.colNum-1-1),
  	    rightColBound = Math.min(cell.colNum-1+1, this.props.cols-1),
  	    adjacents = [];
  	for (let row=lowerRowBound; row <= upperRowBound; row++) {
  	  for (let col=leftColBound; col <= rightColBound; col++) {
  	    if (!(row===cell.rowNum-1 && col===cell.colNum-1)) {
  	      adjacents.push(this.state.cellBoard[row][col]);
  	      // Another way to get the adjacent cell from the cellMap instead of the cell board:
  	      // (Needs further debugging)
  	      // adjacents.push(this.state.cellMap.get((row+1)*this.props.cols + col + 1));
  	    }
  	  }
  	}
  	return adjacents;
  }
  
  // open each adjacent, non-mined, non-flagged, empty cell that is not adjacent
  // to a mined cell, for the given cell.  Recursively do this for each adjacent cell
  // NOTE: instead of recursion, the adjacent cells are determined iteratively instead,
  // with the use of a JavaScript array used as a queue data structure through its push()
  // and shift() methods
  openCellSpan(cell) {
  	var visitedCells = new Map(), queue = [], adjacents;
  	if (!cell.isMined && (cell.adjacentCount === 0)) {
  	  queue.push(cell);
  	  while (queue.length > 0) {
  	  	let nextCell = queue.shift();
  	  	nextCell.opened = true;
  	  	if (nextCell.flagged) {
  	  	  this.state.scoreRef.current.removeFlag();
  	  	}
  	  	nextCell.flagged = false;
  	  	nextCell.ref.current.open();
  	  	this.state.nonMineMap.delete(nextCell.cellID);
        if (this.state.nonMineMap.size === 0) {
  	  	  this.completeGame();
  	  	  return;
  	    }
  	  	visitedCells.set(nextCell.cellID, nextCell);
  	    adjacents = this.getAdjacents(nextCell);
  	    adjacents.forEach((adjacent) => {
  	      if (!adjacent.isMined && !adjacent.flagged && !adjacent.opened) {
  	      	adjacent.opened = true;
  	      	adjacent.ref.current.open();
  	      	this.state.nonMineMap.delete(adjacent.cellID);
  	      	// each time a cell is opened, determine if the game is completed
        	if (this.state.nonMineMap.size === 0) {
  	  	      this.completeGame();
  	        }
  	        else {
  	          if ((adjacent.adjacentCount === 0) && !visitedCells.has(adjacent.cellID) ) {
  	      	    queue.push(adjacent);
  	          }
  	        }
  	      }
  	    });
  	  }
  	}
  	else {
  	  cell.opened = true;
  	  if (cell.flagged) {
  	  	this.state.scoreRef.current.removeFlag();
  	  }
  	  cell.flagged = false;
  	  this.state.nonMineMap.delete(cell.cellID);
  	  // each time a cell is opened, determine if the game is completed
  	  if (this.state.nonMineMap.size === 0) {
  	  	this.completeGame();
  	  }
  	}
  }
  
  // Terminates the game by setting the overall terminated state to true,
  // setting a boolean flag (gameFinished) for each cell, which will prevent
  // response to further clicks, and notifies the score component to act accordingly
  // (which includes stopping the timer)
  terminateGame() {
  	this.setState({
  	  terminated: true
  	});
    this.state.cellMap.forEach(cell => { cell.ref.current.setState({gameFinished: true}); } );
  	this.state.mineMap.forEach(cell => { cell.ref.current.open(); } );
  	this.state.scoreRef.current.terminateGame();
  }

  // Completes the game by setting the overall completed state to true,
  // setting a boolean flag (gameFinished) for each cell, which will prevent
  // response to further clicks, and notifies the score component to act accordingly
  // (which includes stopping the timer).  Also reveals the mined cells, with visual 
  // indication that highlights each such cell.
  completeGame() {
  	this.setState({
  	  completed: true
  	});
    this.state.cellMap.forEach(cell => { cell.ref.current.setState({gameFinished: true}); } );
  	this.state.mineMap.forEach(cell => { cell.ref.current.revealMine(); } );
  	this.state.scoreRef.current.completeGame();
  }
  
  // Handler for the right-click on (flagging of) a cell;
  // This event needs to be lifted from the cell to the main game component
  // so it can notify the score component as well
  handleFlag(cellID) {
  	if (!this.state.completed && !this.state.terminated) {
  	  let cell = this.state.cellMap.get(cellID);
      cell.flagged = !cell.flagged;
  	  this.state.scoreRef.current.toggleFlag(cell.flagged);
  	}
  }

  // Handler for the click on (opening of) a cell;
  // This event needs to be lifted from the cell to the main game component
  // so it can determine game completion or termination
  handleOpen(cellID) {
  	var cell = this.state.cellMap.get(cellID);
  	// if cell is mined, terminate game
  	if (cell.isMined) {
  	  this.terminateGame(); 
  	}
  	// else open cell and others in the span accordingly;
  	else {
  	  this.openCellSpan(cell);
  	}
  }
  
  render() {
  	return (
  	  <div className="game">
  	    <MinesweeperScore minesLeft={this.state.minesLeft} ref={this.state.scoreRef}/>
  	    <MinesweeperBoard
  	      cellBoard={this.state.cellBoard}
  	      mines={this.props.mines} 
  	      rows={this.props.rows} 
  	      cols={this.props.cols}
  	      onFlag={this.handleFlag}
  	      onOpen={this.handleOpen}
  	      openmode={this.props.openmode}/>
  	  </div>
  	);
  }
}

/* MinesweeperBoard: container for the cells, and renders
 * the cells in a 2-dimensional form according the the specified
 * rows and columns.  Uses map() function in 2 levels
 */
function MinesweeperBoard(props) {
  	return (
  	  <div className="board">
  	  {
  	  	props.cellBoard.map( (row) => {
  	  	  return (
  	  	  <div key={row[0].rowNum} className="boardRow">
  	  	  {
  	  	  	row.map( (cell) => {
  	  	  	  return (
  	  	  	  <MinesweeperCell
  	  	  	    rowNum={cell.rowNum}
  	  	  	    colNum={cell.colNum}
  	  	  	    isMined={cell.isMined}
  	  	  	    adjacentCount={cell.adjacentCount}
  	  	  	    ref={cell.ref}
  	  	  	    cellID={cell.cellID}
  	  	  	    onOpen={props.onOpen}
  	  	  	    onFlag={props.onFlag}
  	  	  	    key={cell.cellID}
  	  	  	    openmode={props.openmode ? props.openmode : ""}
  	  	  	  ></MinesweeperCell>
  	  	  	  )
  	  	  	})
  	  	  }
  	  	  </div>
  	  	  )
  	  	})
  	  }
  	  </div>
  	)
}

export default MinesweeperGame;