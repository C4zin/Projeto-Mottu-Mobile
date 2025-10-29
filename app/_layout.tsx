"use client"

import { useEffect, useState } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { View, ActivityIndicator } from "react-native"
import { QueryClientProvider } from "@tanstack/react-query"

import { ThemeProvider } from "../src/context/theme-context"
import { MotorcycleProvider } from "../src/context/motorcycle-context"
import { AuthProvider, useAuth } from "../src/context/auth-context"
import { LanguageProvider } from "../src/context/language-context"
import { NotificationProvider } from "../src/context/notifications-context"
import { queryClient } from "../src/config/query-client"

SplashScreen.preventAutoHideAsync().catch(() => {})

function AuthGate() {
  const { user, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()
  const [navigationReady, setNavigationReady] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === "(auth)" || segments[0] === "login" || segments[0] === "register"

    if (!user && !inAuthGroup) {
      router.replace("/login")
      setNavigationReady(true)
    } else if (user && inAuthGroup) {
      router.replace("/")
      setNavigationReady(true)
    } else {
      setNavigationReady(true)
    }
  }, [user, isLoading, segments])

  if (isLoading || !navigationReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    )
  }

  if (!user && segments[0] !== "login" && segments[0] !== "register") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

export default function RootLayout() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await new Promise((r) => setTimeout(r, 200))
      } finally {
        setReady(true)
        SplashScreen.hideAsync().catch(() => {})
      }
    })()
  }, [])

  if (!ready) return null

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <MotorcycleProvider>
              <NotificationProvider>
                <AuthGate />
                <StatusBar style="auto" />
              </NotificationProvider>
            </MotorcycleProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
