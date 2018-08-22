import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import MinesweeperCell from '../react/MinesweeperCell';

const renderer = new ShallowRenderer();
renderer.render(<MinesweeperCell isMined="true" />);
const result = renderer.getRenderOutput();

test('The MinesweeperCell mined cell should be rendered with correct structure', () => {
  expect(result.type).toBe('div');
});

test('There should be 4 children elements from the root element', () => {
  expect(result.props.children.length).toBe(4);
});

test('The first element of a mined cell should have "mineShell" for its class name', () => {
  expect(result.props.children[0].props.className).toEqual('mineShell');
});

test('The first element of a mined cell should have "mineShell" for its class name', () => {
  expect(result.props.children[0].props.className).toEqual('mineShell');
});


