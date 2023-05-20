import React, { useState } from 'react';
import './seats.css';

const Button = ({ id, className, text, handleSeatClick}) => {
  const [buttonColor, setButtonColor] = useState('color');
  const handleClick = (e) => {
    if (buttonColor === 'green') {
      setButtonColor('black');
      handleSeatClick(id, false); // Przekazanie informacji o odznaczeniu przycisku
    } else {
      setButtonColor('green');
      handleSeatClick(id, true); // Przekazanie informacji o zaznaczeniu przycisku
    }
  };

  return (
    <button
      className={className}
      style={{ backgroundColor: buttonColor }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
