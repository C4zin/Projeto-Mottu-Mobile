"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: async () => {},
})

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>("light")


  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme")
        if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
          setTheme(storedTheme)
        }
      } catch (error) {
        console.error("Erro ao carregar tema:", error)
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = async (): Promise<void> => {
    const newTheme: ThemeType = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    try {
      await AsyncStorage.setItem("theme", newTheme)
    } catch (error) {
      console.error("Erro ao salvar tema:", error)
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext)
}
