import React from 'react';
import ReactDOM from 'react-dom';
import MinesweeperGame from '../react/MinesweeperGame';
import MinesweeperScore from '../react/MinesweeperScore';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
renderer.render(<MinesweeperGame rows="20" cols="25" mines="40"/>);
const result = renderer.getRenderOutput();

test('The root element should be of type "div"', () => {
  expect(result.type).toEqual("div");
});

test('The root element should have 2 children elements', () => {
  expect(result.props.children.length).toEqual(2);
});

test('The MinesweeperGame should have a MinesweeperScore child with "minesLeft" prop of 40', () => {
  expect(result.props.children[0].props.minesLeft).toEqual("40");
});

test('The MinesweeperBoard should have a length of 20', () => {
  expect(result.props.children[1].props.cellBoard).toHaveLength(20);
});

test('The MinesweeperBoard should have a width of 25', () => {
  expect(result.props.children[1].props.cellBoard[0]).toHaveLength(25);
});

const testRenderer = TestRenderer.create(<MinesweeperGame mines="30" rows="20" cols="25"/>);
const testInstance = testRenderer.root.instance;

test('There should be a cell map with size of 500', () => {
  expect(testInstance.state.cellMap.size).toBe(500);
});

test('There should be a mine map with size of 30', () => {
  expect(testInstance.mineMap.size).toBe(30);
});

test('There should be a none-mine map with size of 470', () => {
  expect(testInstance.nonMineMap.size).toBe(470);
});

test('There should be a cell board with higher-order size of 20', () => {
  expect(testInstance.state.cellBoard.length).toBe(20);
});


test('There should be a cell board with lower-order size of 25', () => {
  expect(testInstance.state.cellBoard[0].length).toBe(25);
});
