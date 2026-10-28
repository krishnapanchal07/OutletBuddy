import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
const Context = createContext<{ theme: Theme; toggleTheme: () => void } | null>(
  null,
);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem("outletBUddy:theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("outletBUddy:theme", theme);
    } catch {
      /* browser may block storage */
    }
  }, [theme]);
  return (
    <Context.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useTheme = () => {
  const value = useContext(Context);
  if (!value) throw new Error("useTheme requires ThemeProvider");
  return value;
};
