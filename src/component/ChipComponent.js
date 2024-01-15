import React, { useState, useRef, useEffect } from "react";
import items from "../items.json";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          !chips.includes(item.name) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chips]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleItemSelect = (selectedItem) => {
    setChips([...chips, selectedItem]);
    setInputValue("");
  };

  const handleChipRemove = (removedChip) => {
    setChips(chips.filter((chip) => chip !== removedChip));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip);
      event.preventDefault(); 
    }
    if (event.key === "Backspace" && highlightedChip) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }
  };

  return (
    <div className="chip-container">
      <div className="chip-input-container">
        {chips.map((chip, index) => (
          <div key={index} className={`chip ${highlightedChip === chip ? 'highlighted' : ''}`}>
            <img
              src={items.find((item) => item.name === chip)?.image}
              alt={chip}
              className="chip-avatar"
            />
            {chip}{" "}
            <span
              onClick={() => handleChipRemove(chip)}
              className="chip-remove"
            >
              X
            </span>
          </div>
        ))}

        <div>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Type to search..."
          />

          {showSuggestions && inputValue.length < 1 && (
            <div className="item-list">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-avatar"
                  />
                  {item.name} ({item.age})
                </div>
              ))}
            </div>
          )}
          {inputValue.length > 0 && (
            <div className="item-list">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemSelect(item.name)}
                  className="item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-avatar"
                  />
                  {item.name} ({item.age})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;
