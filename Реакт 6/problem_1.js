const { useState, useEffect } = React;

const ColorPicker = () => {
  const colorPalette = [
    '#FF5733', '#33FF57', '#3357FF', '#F3FF33',
    '#FF33F3', '#33FFF3', '#FF8C33', '#8C33FF',
    '#33FF8C', '#FF338C', '#33A2FF', '#A2FF33'
  ];

  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [savedColors, setSavedColors] = useState([]);

  // Загрузка сохраненных цветов из localStorage
  useEffect(() => {
    const storedColors = localStorage.getItem('savedColors');
    if (storedColors) {
      setSavedColors(JSON.parse(storedColors));
    }
  }, []);

  // Сохранение цветов в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
  }, [savedColors]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    setSelectedColor('#FFFFFF');
  };

  const handleSave = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors([...savedColors, selectedColor]);
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setSavedColors(savedColors.filter(color => color !== colorToRemove));
  };

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      
      <div className="color-palette">
        {colorPalette.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            title={color}
          />
        ))}
      </div>

      <div className="selected-color" style={{ backgroundColor: selectedColor }}></div>
      <p>Selected: {selectedColor}</p>

      <div className="buttons">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="save-btn" onClick={handleSave}>Save Color</button>
      </div>

      {savedColors.length > 0 && (
        <div className="saved-colors">
          <h3>Saved Colors</h3>
          <div className="saved-colors-list">
            {savedColors.map((color, index) => (
              <div
                key={index}
                className="saved-color"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                onDoubleClick={() => handleRemoveColor(color)}
                title={`Double click to remove\n${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ColorPicker />);