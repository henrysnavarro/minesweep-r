![](minesweepR-screenshot.png =300)

## OVERVIEW

This project is an implementationof the Minesweeper Game using ReactJS, and the [Create React App](https://github.com/facebookincubator/create-react-app) application starter kit.

Minesweeper is a classic game that was popularized as part of the entertainment pack for the Microsoft Windows desktop operating system as early as version 3.1.
More information about Minesweeper can be seen in this [Wikepedia entry](https://en.wikipedia.org/wiki/Microsoft_Minesweeper).

### Installation

Unpack the provided zip ( **minesweep-r.zip** ) file containing the sources.

From the top folder install npm dependencies:

```
npm install
```

To run the application:

```
npm start
```
... and follow the instructions displayed for accessing the web application.


To run the test cases:

```
npm test
```

### How To Play

Access the web application from the URL shown by the output of **npm start** in the **Installation** section above.

A default 9x9 board with 10 mines is displayed and the timer starts immediately.

A started game is indicated by the yellow smiley icon in the scoreboard.

To load a different board size and/or number of mines, reload the same URL after providing one or more of these query parameters: **rows**, **cols**, **mines**.  For example, to load a 20x15 board with 40 mines, add the following in the URL: **?rows=20&cols=15&mines=40**.

The manner in which cells are opened can also be configured:  The default is that the cell cover disappears instantaneously when the cell is clicked (the classic user experience for this game).  Opening a cell can also be configured for animation: the cell cover can 'pull' or 'fade' when the cell is opened.  To use any of these alternatives, add the "openmode" parameter in the URL query string and reload the page.  For example: **?openmode=pull**

The goal of the game is to open all the cells that do not have mines, in the shortest possible time.

Open cells by clicking on them. The game ends anytime a cell with a mine is opened.  A lost game is indicated by the opened mined cell in red, a red smiley icon in the scoreboard, and the rest of the mined cells opened.


The game is won by opening all cells which do not have a mine.  A won game is indicated by all mined cells opened and in green, and a green smiley icon in the score board.

The timer in the scoreboard is stopped when a game ends, whether lost or won.

To aid in solving for the mined cells, right-click on a cell to 'flag' it.  A red triangular icon is placed on the cell.  To unflag a cell, right-click on it again (the icon is removed).

If a non-mined cell adjacent to a mined cell is opened, the former shows the number of mines in all of its adjacent cells.

If a cell does not have any adjacent mined cells, it is shown as empty when opened.

When an empty cell is opened, its adjacent non-mined cells are opened as well.  Any adjacent empty cell is processed in the same manner, recursively.  Hence, opening an empty cell will show the span of connected, adjacent empty cells and the surrounding non-mined cells.




## IMPLEMENTATION NOTES

### Files and Folders

This implementation was packaged as a NodeJS application and uses ReactJS v16.3 for its web frontend framework.  Having used the Create React App, the resulting source codes has the following files and folders:

```
minesweep-r/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    css/
      App.css
      index.css
    media/
      bomb.svg
      dead-iconmonstr.svg
      flag-red.svg
      flat-iconmonstr.svg
      logo.svg
      smiley-iconmonstr.svg
      stopwatch.svg
      minesweepR-screenshot.png
    react/
      MinesweeperCell.js
      MinesweeperGame.js
      MinesweeperScore.js
    test/
      App.test.js
      MinesweeperCell.test.js
      MinesweeperGame.test.js
      MinesweeperScore.test.js
    App.js
    index.js
    registerServiceWorker.js
  app.yaml
  package.json
```


### Main React Components

The following 5 components (4 custom and 1 function) were created in the implementation.  The corresponding file for each is simply the component's name with the '.js' extension (e.g., MinesweeperCell.js).  Main characteristics and behaviors are described below for each component.  The remaining (technical) details are found in the source comments.

- ### MinesweeperCell
  - The essential building block for the game.  A 2-dimensional array of cells makes up the board.  Each cell is an instance of MinesweeperCell, and receives click and right-click gestures from the user.
  - Instances of this component are passed with properties that were determined from the main game component (MinesweeperGame)
  - At runtime, instances of this component are sometimes accessed using React "refs", a deviation from the React Data Flow
  - implemented as a custom React component (extends Component)
  
- ### MinesweeperBoard
  - Wrapper for the 2-dimensional array of cells.
  - Implemented as a stateless function
  
- ### MinesweeperScore
  - Container for the game-level details: number of mines left, game state (in-progress, won, or lost) and time elapsed
  - Implemented as a custom React component
  
- ### MinesweeperGame
  - The main game interface and holder of state information for the game
  - In its construction phase, essential data such as the 2-dimensional array of cells, map of cells, mined cells and non-mined cells are created.  These pieces of information are then mutated appropriately in the handling of user events (click and right-click)
  - Implemented as a custom React component
  
- ### App
  - Wrapper for the page, contains the header, main game interface and footer.
  - Reads the URL query string for custom board size and mine count information
  - Implemented as a custom React component

### Implementation Limitations

This exercise was performed to demonstrate solving the problems involved in the game.  The following items have not been covered and can be improved upon:

- Test cases do not include end-to-end coverage, as the game does not really have pertinent backend requirements.
- Mobile web (covering unique touch gestures); this implementation was mainly for desktop web (it was found to have satisfactory behavior and performance when tested on a mobile device)

### Intellectual Property Concerns

Credit to the assets (images) used in this work are given to their appropriate owners and licensees.
