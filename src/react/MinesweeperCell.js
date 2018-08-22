import React, { Component } from 'react';
import bomb from '../media/bomb.svg';
import flag from '../media/flag-red.svg';

/* MinesweeperCell: custom component for the cell
 * handles the clicks (left-click to open, right-click to flag/unflag)
 * as well as calls handlers for the same events passed on to it from 
 * the board, and the game components.
 * Renders the number of adjacent mined cells in a color- and size-coded
 * manner
 */
class MinesweeperCell extends Component {
  // expected properties:
  // { isMined: boolean, // if the cell has a mine
  //   opened: boolean, // cell is open
  //   flagged: boolean, // cell is flagged,
  //   rowNum: int,  // 1-indexed row number of cell
  //   colNum: int,  // 1-indexed column number of cell
  //   ref: React ref // React DOM/element ref for the cell
  //   cellID: int, // 1-indexed sequential ID of the cell
  //   adjacentCount: int // number of adjacent mined cells
  //   onOpen: handler function for opening cell, passed from parent
  //   onFlag: handler function for flagging cell, passed from parent
  // }
  constructor(props) {
  	super(props);
  	this.state = {
  	  isMined: this.props.isMined,
  	  flagged: false,
  	  opened: false,
  	  mineRevealed: false
  	}
  	this.handleClick = this.handleClick.bind(this);
  	this.handleRightClick = this.handleRightClick.bind(this);
  	this.adjacentCountColors = [
  	  {color: 'white', fontSize: '10px'}, 
  	  {color: 'blue', fontSize: '12px'}, 
  	  {color: 'green', fontSize: '14px'},
  	  {color: 'red', fontSize: '16px'}, 
  	  {color: 'purple', fontSize: '18px'}, 
  	  {color: 'brown', fontSize: '20px'},
  	  {color: 'orange', fontSize: '22px'}, 
  	  {color: 'cyan', fontSize: '14px'}, 
  	  {color: 'black', fontSize: '26px'},
  	];
  }
  
  handleClick(e) {
  	if (!this.state.opened && !this.state.gameFinished) {
  	  this.open();
  	  this.setState({steppedOn: this.state.isMined});
  	  this.props.onOpen(this.props.cellID);
    }
  }
  
  handleRightClick(e) {
  	e.preventDefault();
    if (!this.state.opened && !this.state.gameFinished) {
      this.props.onFlag(this.props.cellID);
  	  this.setState( prevState => ({flagged: !prevState.flagged}));
    }
  }
  
  open() {
  	this.setState({opened: true, flagged: false});
  }
  
  revealMine() {
  	this.setState({opened: true, flagged: false, mineRevealed: true});
  }
  
  render() {
  	return (
  	  <div className="cell"   
  	       id={this.props.cellId}
  	       onClick={this.handleClick}
  	       onContextMenu={this.handleRightClick}
  	  >
  	    { this.props.isMined &&
  	    <div className={"mineShell" + 
  	      ( this.state.steppedOn ? " steppedOn" : (this.state.mineRevealed ? " mineRevealed" : "") )}>
          <img src={bomb} className="icon" alt=""/>
  	    </div>
  	    }
  	    { !this.props.isMined && (this.props.adjacentCount > 0) &&
  	    <div className="adjacentCount" 
  	         style={this.adjacentCountColors[this.props.adjacentCount]}>{this.props.adjacentCount}
  	    </div>
  	    }
  	    <div className={ "cellCover " + 
  	      ( this.state.opened || this.state.mineRevealed ? "cellOpened" + this.props.openmode : "" ) }></div>
  	    { !this.state.opened && this.state.flagged &&
  	    <div className="cellFlag">
          <img src={flag} className="icon flag" alt=""/>
  	    </div>
  	    }
  	  </div>
  	)
  }
}

export default MinesweeperCell;
