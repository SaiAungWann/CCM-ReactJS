import { createContext, useReducer } from "react";

const ThemeContext = createContext();

// create useReducer

let ThemeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

//themecontextprovider component
const ThemeContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(ThemeReducer, { theme: "dark" });

  let changeTheme = (theme) => {
    // action => type(function type ), payload (data)
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const isDark = state.theme === "dark";

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
