import React from 'react';
import ReactDOM from 'react-dom';
import MinesweeperScore from '../react/MinesweeperScore';
import TestRenderer from 'react-test-renderer';

const testRenderer = TestRenderer.create(<MinesweeperScore minesLeft="30"/>);
const testInstance = testRenderer.root;
const rendererJSON = testRenderer.toJSON();

test('Rendered MinesweeperScore element should have a "div" top-level element', () => {
  expect(rendererJSON.type).toBe('div');
});

test('Rendered MinesweeperScore element should have 5 top-level children', () => {
  expect(rendererJSON.children.length).toBe(5);
});
