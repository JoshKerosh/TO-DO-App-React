import React, { createContext, useEffect, useState } from "react";

// ThemeContext.js
// This file creates a context for managing dark mode in the application.
// It provides a way to toggle dark mode and persists the user's preference in localStorage.
export const ThemeContext = createContext();

// ThemeProvider component wraps the application and provides the theme context
// It initializes the dark mode state based on localStorage and updates the document's theme attribute.
export const ThemeProvider = ({ children }) => {
    // State to manage dark mode, initialized from localStorage
  const [dark, setDark] = useState(() => {
    // Retrieve the saved darkMode preference from localStorage
    // If darkMode is not found, it defaults to false (light mode)
    const saved = localStorage.getItem("darkMode");
    // This allows the application to remember the user's preference across sessions
    return saved ? JSON.parse(saved) : false;
  });

    // Effect to update the document's theme attribute and localStorage whenever dark mode changes
  useEffect(() => {
    // Set the data-theme attribute on the document's root element
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    // Save the current dark mode state to localStorage
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

    // Function to toggle dark mode state
  const toggleDarkMode = () => setDark(!dark);


    // Provide the dark mode state and toggle function to the context
  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};