import React from 'react';

type DisplayProps = {
  value: string;
  themeClasses: any;
};

const Display: React.FC<DisplayProps> = ({ value, themeClasses }) => {
  return (
    <div className={`${themeClasses.display} p-4 text-4xl rounded-md mb-6 overflow-x-auto`}>
      {value || "0"}
    </div>
  );
};

export default Display;
