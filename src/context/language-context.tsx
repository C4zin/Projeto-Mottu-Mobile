"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { pt } from "../locales/pt"
import { es } from "../locales/es"

type LanguageType = "pt" | "es"
type TranslationsType = typeof pt

interface LanguageContextType {
  language: LanguageType
  setLanguage: (lang: LanguageType) => Promise<void>
  t: TranslationsType
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: async () => {},
  t: pt,
})

interface LanguageProviderProps {
  children: ReactNode
}

const translations: Record<LanguageType, TranslationsType> = {
  pt,
  es,
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageType>("pt")

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language")
        if (storedLanguage && (storedLanguage === "pt" || storedLanguage === "es")) {
          setLanguageState(storedLanguage)
        }
      } catch (error) {
        console.error("Erro ao carregar idioma:", error)
      }
    }

    loadLanguage()
  }, [])

  const setLanguage = async (lang: LanguageType): Promise<void> => {
    setLanguageState(lang)
    try {
      await AsyncStorage.setItem("language", lang)
    } catch (error) {
      console.error("Erro ao salvar idioma:", error)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext)
}
