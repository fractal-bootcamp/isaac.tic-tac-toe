import React, { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [allowOverwrite, setAllowOverwrite] = useState(false); // State to toggle overwrite option

  useEffect(() => {
    let timer;
    if (isPlaying && !calculateWinner(squares)) {
      timer = setTimeout(() => {
        handleClick();
      }, 100);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [squares, isPlaying]);

  function handleClick() {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    let randomIndex;

    // Choose the random index based on whether overwrite is allowed or not
    if (allowOverwrite) {
      randomIndex = Math.floor(Math.random() * 9); // Can choose any square (even filled)
    } else {
      const emptyCells = squares.reduce((acc, cell, index) =>
        cell === null ? [...acc, index] : acc, []);
      if (emptyCells.length === 0) {
        return; // No empty cells to play in
      }
      randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    nextSquares[randomIndex] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handlePlayClick() {
    setIsPlaying(true);
    if (squares.every(square => square === null)) {
      handleClick();
    }
  }

  function handleResetClick() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsPlaying(false);
  }

  function toggleOverwrite() {
    setAllowOverwrite(!allowOverwrite); // Toggle the overwrite state
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => { }} />
        <Square value={squares[1]} onSquareClick={() => { }} />
        <Square value={squares[2]} onSquareClick={() => { }} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => { }} />
        <Square value={squares[4]} onSquareClick={() => { }} />
        <Square value={squares[5]} onSquareClick={() => { }} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => { }} />
        <Square value={squares[7]} onSquareClick={() => { }} />
        <Square value={squares[8]} onSquareClick={() => { }} />
      </div>
      <div className="controls">
        <button onClick={handlePlayClick} disabled={isPlaying}>
          {squares.every(square => square === null) ? 'Start Game' : 'Continue Game'}
        </button>
        <button onClick={handleResetClick}>Reset Game</button>
        <button onClick={toggleOverwrite}>
          {allowOverwrite ? 'Disable Overwriting' : 'Enable Overwriting'}
        </button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
