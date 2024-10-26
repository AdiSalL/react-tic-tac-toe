import { useState } from "react";
import "./App.css";

function Square({ value, onSquaredClick }) {
  return (
    <button onClick={onSquaredClick} className="square">
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [isNext, setIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setIsNext(!isNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner + "🎉 🎉 🎉 🎉 🎉";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <main>
      <div className="container">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquaredClick={() => handleClick(0)}
          ></Square>
          <Square
            value={squares[1]}
            onSquaredClick={() => handleClick(1)}
          ></Square>
          <Square
            value={squares[2]}
            onSquaredClick={() => handleClick(2)}
          ></Square>
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquaredClick={() => handleClick(3)}
          ></Square>
          <Square
            value={squares[4]}
            onSquaredClick={() => handleClick(4)}
          ></Square>
          <Square
            value={squares[5]}
            onSquaredClick={() => handleClick(5)}
          ></Square>
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquaredClick={() => handleClick(6)}
          ></Square>
          <Square
            value={squares[7]}
            onSquaredClick={() => handleClick(7)}
          ></Square>
          <Square
            value={squares[8]}
            onSquaredClick={() => handleClick(8)}
          ></Square>
        </div>
      </div>
      <div class="status">
        <ul>
          <li>{status}</li>
        </ul>
      </div>
    </main>
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

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
