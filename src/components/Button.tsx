import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  label: string;
  onClick: (label: string) => void;
  themeClasses: any;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, themeClasses }) => {
  const isOperator = /[÷×\-+=]/.test(label);
  const isSpecial = label === "C" || label === "=";

  let baseStyle = "font-bold py-4 rounded text-2xl transition-all duration-200";
  let colorStyle = themeClasses.button;

  if (isOperator) colorStyle = themeClasses.operator;
  if (isSpecial) colorStyle = themeClasses.special;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${colorStyle}`}
      onClick={() => onClick(label)}
    >
      {label}
    </motion.button>
  );
};

export default Button;
