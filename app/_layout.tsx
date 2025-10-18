
"use client";

import { useEffect, useState } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

import { ThemeProvider } from "../src/context/theme-context";
import { MotorcycleProvider } from "../src/context/motorcycle-context";
import { AuthProvider, useAuth } from "../src/context/auth-context";
import { LanguageProvider } from "../src/context/language-context";
import { NotificationProvider } from "../src/context/notifications-context";

// ✅ segure a splash logo no carregamento do módulo
SplashScreen.preventAutoHideAsync().catch(() => {});

function AuthGate() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (!user && !isAuthRoute) router.replace("/login");
    if (user && isAuthRoute) router.replace("/");
  }, [user, isLoading, pathname]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // ⏳ carregue o que precisar ANTES do primeiro render:
        // fontes, AsyncStorage, bootstrap, etc.
        await new Promise((r) => setTimeout(r, 200)); // exemplo
      } finally {
        setReady(true);
        // ✅ esconda a splash quando tudo estiver OK
        SplashScreen.hideAsync().catch(() => {});
      }
    })();
  }, []);

  // Enquanto ainda prepara, não renderize nada (evita flicker/duplo hide)
  if (!ready) return null;

  return (
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
  );
}
