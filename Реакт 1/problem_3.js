function Chessboard() {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  const getSquareColor = (row, col) => {
    return (row + col) % 2 === 0 ? 'white' : 'black';
  };

  return (
    <div className="chessboard-container">
      {/* Верхние буквенные обозначения */}
      <div className="notation-row">
        <div className="notation-corner"></div>
        {letters.map(letter => (
          <div key={`top-${letter}`} className="notation-letter">
            {letter}
          </div>
        ))}
        <div className="notation-corner"></div>
      </div>

      {/* Основная доска с боковыми обозначениями */}
      {numbers.map((number, rowIndex) => (
        <div key={`row-${number}`} className="chessboard-row">
          {/* Левая числовая нотация */}
          <div className="notation-number left-numbers">{number}</div>
          
          {/* Клетки доски */}
          {letters.map((_, colIndex) => (
            <div
              key={`${letters[colIndex]}${number}`}
              className={`chess-square ${getSquareColor(rowIndex, colIndex)}`}
            ></div>
          ))}
          
          {/* Правая числовая нотация */}
          <div className="notation-number right-numbers">{number}</div>
        </div>
      ))}

      {/* Нижние буквенные обозначения */}
      <div className="notation-row">
        <div className="notation-corner"></div>
        {letters.map(letter => (
          <div key={`bottom-${letter}`} className="notation-letter">
            {letter}
          </div>
        ))}
        <div className="notation-corner"></div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <h1>Шахматная доска с нотациями</h1>
    <Chessboard />
  </div>
);