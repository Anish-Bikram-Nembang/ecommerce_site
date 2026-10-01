import { createContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        return localStorage.getItem("pasal-theme") === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("pasal-theme", theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(current => current === "light" ? "dark" : "light") }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
