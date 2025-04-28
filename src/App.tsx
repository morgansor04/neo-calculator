import React, { useState } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [theme, setTheme] = useState<string>("classic");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleButtonClick = (label: string) => {
    if (label === "C") {
      setInput("");
    } else if (label === "=") {
      try {
        const sanitizedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
        setInput(eval(sanitizedInput).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + label);
    }
  };
  /*
  TODO: 
  1)AGGIUNGI BACK HISTORY DELLE OPERAZIONI EFFETTUATE
  2)AGGIUNGI CALCOLI COMPLESSI
  3)AGGIUNGI IDEA DEL BUTTARE IL FILE ALL'INTERNO DELLA WEB APP, RIPRENDERE I VALORI PRESENTI NEL FILE ED EFFETTUARE UN OPERAZIONE
  4)CONTINUA LA MODIFICA DEI THEMES (TROVARE 4 TEMI CON COLORI CHE STANNO BENE INSIEME)
  */

  const themes = [
    {
      name: "Classic",
      value: "classic",
      background: "bg-gradient-to-br from-gray-700 to-gray-900",
      light: {
        borderBg: "bg-gray-100",
        calcBg: "bg-white",
        display: "bg-gray-300  text-gray-800",
        button: "bg-gray-300 hover:bg-gray-200 text-gray-800",
        operator: "bg-blue-400 hover:bg-blue-300 text-white",
        special: "bg-red-400 hover:bg-red-300 text-white"
      },
      dark: {
        borderBg: "bg-gray-800",
        calcBg: "bg-gray-700",
        display: "bg-gray-800 text-white",
        button: "bg-gray-600 hover:bg-gray-500 text-white",
        operator: "bg-blue-600 hover:bg-blue-500 text-white",
        special: "bg-red-600 hover:bg-red-500 text-white"
      },
      preview: ["bg-gray-700", "bg-gray-600"]
    },
    {
      name: "Neon",
      value: "neon",
      background: "bg-gradient-to-br from-purple-900 via-indigo-700 to-purple-800",
      light: {
        borderBg: "bg-purple-100", // Cornice chiara
        calcBg: "bg-white",         // Calcolatrice bianca
        display: "bg-gray-100 text-purple-800",
        button: "bg-indigo-300 hover:bg-indigo-200 text-purple-800",
        operator: "bg-pink-400 hover:bg-pink-300 text-white",
        special: "bg-yellow-400 hover:bg-yellow-300 text-black"
      },
      dark: {
        borderBg: "bg-purple-950",  // Cornice scurissima
        calcBg: "bg-gray-900",      // Calcolatrice molto scura
        display: "bg-black text-cyan-400",
        button: "bg-indigo-700 hover:bg-indigo-600 text-white",
        operator: "bg-pink-600 hover:bg-pink-500 text-white",
        special: "bg-yellow-600 hover:bg-yellow-500 text-black"
      },
      preview: ["bg-purple-900", "bg-indigo-700"]
    },
    {
      name: "Pastel",
      value: "pastel",
      background: "bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200",
      light: {
        borderBg: "bg-pink-100",          // Border molto leggero rosa pastello
        calcBg: "bg-white",                // Calcolatrice bianca perfetta
        display: "bg-gray-450 text-gray-700", // Display chiaro elegante
        button: "bg-blue-200 hover:bg-blue-100 text-gray-800", // Bottoni più coerenti
        operator: "bg-pink-300 hover:bg-pink-200 text-gray-800",
        special: "bg-green-300 hover:bg-green-200 text-gray-800"
      },
      dark: {
        borderBg: "bg-purple-400",         // Border scuro pastel
        calcBg: "bg-gray-400",
        display: "bg-gray-500 text-gray-900",
        button: "bg-blue-500 hover:bg-blue-400 text-gray-900",
        operator: "bg-pink-500 hover:bg-pink-400 text-gray-900",
        special: "bg-green-500 hover:bg-green-400 text-gray-900"
      },
      preview: ["bg-pink-200", "bg-blue-200"]
    },
    {
      name: "Retro Terminal",
      value: "retro",
      background: "bg-black",
      light: {
        borderBg: "bg-gray-300", // Cornice chiara neutra
        calcBg: "bg-gray-200",   // Calcolatrice leggermente più scura
        display: "bg-gray-100 text-green-700 font-mono", // Display leggibilissimo verde stile retro
        button: "bg-gray-300 hover:bg-gray-200 text-green-800 font-mono",
        operator: "bg-gray-400 hover:bg-gray-300 text-green-900 font-mono",
        special: "bg-green-500 hover:bg-green-400 text-white font-mono"
      },
      dark: {
        borderBg: "bg-black", // Cornice scurissima
        calcBg: "bg-gray-900", // Calcolatrice quasi nera
        display: "bg-black text-green-400 font-mono", // Display nero puro e verde terminale
        button: "bg-gray-800 hover:bg-gray-700 text-green-400 font-mono",
        operator: "bg-gray-700 hover:bg-gray-600 text-green-300 font-mono",
        special: "bg-green-700 hover:bg-green-600 text-white font-mono"
      },
      preview: ["bg-black", "bg-green-400"]
    }    
  ];

  const selectedTheme = themes.find(t => t.value === theme) || themes[0];
  const currentTheme = isDarkMode ? selectedTheme.dark : selectedTheme.light;

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`${selectedTheme.background} min-h-screen p-6 transition-all duration-500 relative`}>
      
      {/* Selettori */}
      <div className="absolute top-6 left-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-white font-semibold">Scegli tema</span>
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`flex items-center gap-2 p-2 rounded shadow hover:bg-gray-700 transition-all duration-200 ${
                theme === t.value ? 'ring-2 ring-indigo-400' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded ${t.preview[0]}`}></div>
                <div className={`w-4 h-4 rounded ${t.preview[1]}`}></div>
              </div>
              <span className="text-white">{t.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-2xl">🌞</span>
          <button
            onClick={toggleDarkMode}
            className="bg-white w-14 h-7 flex items-center p-1 rounded-full shadow-inner transition-all duration-300 focus:outline-none"
          >
            <div className={`bg-yellow-400 w-5 h-5 rounded-full shadow-md transform ${isDarkMode ? 'translate-x-7' : ''} transition-all duration-300`}></div>
          </button>
          <span className="text-blue-400 text-2xl">🌙</span>
        </div>
      </div>

      {/* Layer 2 (border) - Contenitore 20% più grande */}
      <div className="flex justify-center items-center min-h-screen">
        <div className={`${currentTheme.borderBg} flex justify-center items-center w-[460px] h-[660px] rounded-3xl p-6 shadow-inner transition-all duration-500`}>
          {/* Layer 3 (calcolatrice vera) */}
          <div className={`${currentTheme.calcBg} relative z-10 w-96 h-[550px] rounded-2xl shadow-2xl border-4 border-black p-6 transition-all duration-500`}>

            <Display value={input} themeClasses={currentTheme} />
            <Keypad onButtonClick={handleButtonClick} themeClasses={currentTheme} />
          </div>
      </div>
      </div>
    </div>
  );
};

export default App;
