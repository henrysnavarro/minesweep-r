import React, { Component } from 'react';
import bomb from '../media/bomb.svg';
import stopwatch from '../media/stopwatch.svg';
import gameover from '../media/dead-iconmonstr.svg';
import gameon from '../media/flat-iconmonstr.svg';
import gamewon from '../media/smiley-iconmonstr.svg';

/* MinesweeperScore: component for showing the score details of a game,
 * including flags used, game state (ongoing, won or over) through an emoticon,
 * and the timer
 */
class MinesweeperScore extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  minesLeft: this.props.minesLeft,
  	  time: 0,
  	  gameState: 'gameon'
  	}
  }
  
  componentDidMount() {
  	// instantiate a timer only when the score is mounted to the DOM
  	this.timerID = setInterval(
  	  () => this.setState( (prevState, props) => ({time: prevState.time + 1}) )
  	  , 1000
  	);
  }
  
  terminateGame() {
  	this.setState({gameState: 'gameover'});
  	// stop the timer then the game is lost/terminated
  	clearInterval(this.timerID);
  }

  completeGame() {
  	this.setState({gameState: 'gamewon'});
  	// stop the timer when the game is won
  	clearInterval(this.timerID);
  }
  
  // updates the flag count (adds or subtracts from it), according to 
  // a cell being flagged/unflagged
  toggleFlag(add) {
  	if (add) {
  	  this.setState( prevState => ({minesLeft: prevState.minesLeft-1}));
  	}
  	else {
  	  this.setState( prevState => ({minesLeft: prevState.minesLeft+1}));
  	}
  }
  
  removeFlag() {
  	this.setState( prevState => ({minesLeft: prevState.minesLeft + 1}));
  }
  
  render() {
    return (
      <div className="score">
        <img src={bomb} className="icon" alt=""/>
        <div className="minesLeft">{this.state.minesLeft}</div>
        { this.state.gameState === 'gameon' &&
          <img src={gameon}  className="gameState gameon" alt=""/>
        }
        { this.state.gameState === 'gameover' &&
          <img src={gameover}  className="gameState gameover" alt=""/>
        }
        { this.state.gameState === 'gamewon' &&
          <img src={gamewon}  className="gameState gamewon" alt=""/>
        }
        <div className="time">{this.state.time}</div>
        <img src={stopwatch} className="icon" alt=""/>
      </div>
    )		
  }
}

export default MinesweeperScore;