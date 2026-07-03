import React, { createContext } from "react";

export const ThemeContext = createContext(null);

export function useTheme() {
  return React.useContext(ThemeContext);
}
