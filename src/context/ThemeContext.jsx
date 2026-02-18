import React, { createContext, useState, useEffect, useContext } from "react";
import "./Theme.css";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

  // check local storage on initial load
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme"); 
    return savedTheme || "light";
  });

  useEffect(() => {
    // update attribute
    document.documentElement.setAttribute("data-theme", theme);

    // save theme
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;