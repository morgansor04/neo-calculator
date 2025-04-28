import React from 'react';
import Button from './Button';

type KeypadProps = {
  onButtonClick: (label: string) => void;
  themeClasses: any;
};

const Keypad: React.FC<KeypadProps> = ({ onButtonClick, themeClasses }) => {
  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((btn) => (
        <Button
          key={btn}
          label={btn}
          onClick={onButtonClick}
          themeClasses={themeClasses}
        />
      ))}
    </div>
  );
};

export default Keypad;
