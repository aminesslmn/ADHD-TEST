import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (!gameOver) {
        setTimer(prevTimer => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameOver]);

  const initializeGame = () => {
    const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
    setTimer(0);
    setGameOver(false);
  };

  const handleCardClick = (id) => {
    if (gameOver || flipped.length === 2) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setSolved([...solved, cards[first].symbol]);
        if (solved.length + 1 === cards.length / 2) {
          setGameOver(true);
        }
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const isCardFlipped = (id) => flipped.includes(id) || solved.includes(cards[id].symbol);

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <div className="game-info">
        <p>Time elapsed: {timer} seconds</p>
        <p>Pairs found: {solved.length}</p>
      </div>
      <div className="game-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${isCardFlipped(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {isCardFlipped(card.id) ? card.symbol : '?'}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>You found {solved.length} pairs in {timer} seconds.</p>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
