import React, { useState, useEffect } from "react";
import Board from "./Board";


function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    if (winner === "X") {
      setXWins((prevWins) => prevWins + 1);
    } else if (winner === "O") {
      setOWins((prevWins) => prevWins + 1);
    }
  }, [winner]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = [...currentSquares];
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const currentPlayer = xIsNext ? "X" : "O";
  const status = winner
    ? `Ganador: ${winner}`
    : stepNumber === 9
    ? "Empate"
    : `Siguiente jugador: ${currentPlayer}`;

  return (
    <div className="game">
      <div className="game-header">
        <h1>Juego del Gato</h1>
      </div>
      <div className="game-board">
        <Board squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">
          {winner ? (
            <span className="player-indicator winner-text">{status}</span>
          ) : (
            <span className="player-indicator game-text">{status}</span>
          )}
        </div>
        <div className="scores">
          <p>X: {xWins}</p>
          <p>O: {oWins}</p>
        </div>
        <button onClick={handleRestart}>Reiniciar Juego</button>
      </div>
    </div>
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

export default Game;
