import { useState, useEffect } from "react";
import logo from "../assets/react.svg";

const ThemeToggle = () => {
  // 1. Manage theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  );

  // 2. Use useEffect to apply the class and save preference after mount/update
  useEffect(() => {
    document.body.classList.remove("light", "dark"); // Clean up existing classes
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // Rerun whenever 'theme' state changes

  // 3. Click handler
  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <img
      id="theme-toggle"
      src={logo}
      alt="Theme Toggle"
      onClick={handleToggle} // Direct event handler
    />
  );
};

export default ThemeToggle;
