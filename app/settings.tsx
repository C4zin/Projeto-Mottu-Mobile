"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

import { useTheme } from "../src/context/theme-context"
import { useMotorcycles } from "../src/context/motorcycle-context"
import { useAuth } from "../src/context/auth-context"
import { useLanguage } from "../src/context/language-context"

interface AppInfo {
  version: string
  lastVisit: string | null
  motorcyclesCount: number
}

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme()
  const { motorcycles, clearAllMotorcycles } = useMotorcycles()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")
  const [appInfo, setAppInfo] = useState<AppInfo>({
    version: "4.0",
    lastVisit: null,
    motorcyclesCount: 0,
  })

  useEffect(() => {
    setIsDarkMode(theme === "dark")

    const loadAppInfo = async () => {
      try {
        const lastVisit = await AsyncStorage.getItem("lastVisit")
        setAppInfo({
          version: "1.0.0",
          lastVisit: lastVisit || "Nunca",
          motorcyclesCount: motorcycles.length,
        })
      } catch (error) {
        console.error("Erro ao carregar informações do app:", error)
      }
    }

    loadAppInfo()
  }, [theme, motorcycles])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    toggleTheme()
  }

  const handleLanguageToggle = () => {
    setLanguage(language === "pt" ? "es" : "pt")
  }

  const handleClearData = () => {
    Alert.alert(t.settings.clearDataConfirm, t.settings.clearDataMessage, [
      { text: t.settings.cancel, style: "cancel" },
      {
        text: t.settings.clear,
        onPress: () => {
          clearAllMotorcycles()
          Alert.alert(t.settings.clearSuccess, t.settings.clearSuccessMessage)
        },
        style: "destructive",
      },
    ])
  }

  const handleLogout = async () => {
    Alert.alert(t.settings.logoutConfirm, t.settings.logoutMessage, [
      { text: t.settings.cancel, style: "cancel" },
      {
        text: t.settings.logout,
        style: "destructive",
        onPress: async () => {
          try {
            await logout()
          } finally {
            router.replace("/login")
          }
        },
      },
    ])
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    backgroundGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 200,
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    content: { flex: 1, padding: 24, paddingTop: 40 },
    userSection: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    userInfo: { flexDirection: "row", alignItems: "center" },
    userAvatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: "#10B981",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 20,
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    userInitial: { fontSize: 28, fontWeight: "800", color: "#FFFFFF" },
    userDetails: { flex: 1 },
    userName: { fontSize: 20, fontWeight: "800", color: theme === "dark" ? "#FFFFFF" : "#065F46", marginBottom: 4 },
    userEmail: { fontSize: 14, color: theme === "dark" ? "#94A3B8" : "#64748B", marginBottom: 8 },
    userStatus: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#064E3B" : "#D1FAE5",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      alignSelf: "flex-start",
    },
    userStatusText: { fontSize: 12, color: theme === "dark" ? "#10B981" : "#065F46", fontWeight: "700", marginLeft: 4 },
    section: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 20,
      padding: 24,
      marginBottom: 20,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 20,
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    settingInfo: { flex: 1 },
    settingLabel: { fontSize: 16, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : "#065F46", marginBottom: 4 },
    settingDescription: { fontSize: 14, color: theme === "dark" ? "#94A3B8" : "#64748B" },
    languageButton: {
      backgroundColor: "#10B981",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    languageButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    infoLabel: { fontSize: 16, color: theme === "dark" ? "#94A3B8" : "#64748B", fontWeight: "600" },
    infoValue: { fontSize: 16, fontWeight: "700", color: theme === "dark" ? "#10B981" : "#065F46" },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    dangerButton: { backgroundColor: "#DC2626" },
    logoutButton: { backgroundColor: "#64748B" },
    actionButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", marginLeft: 8 },
    lastRow: { borderBottomWidth: 0 },
  })

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {user && (
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>{user.email?.charAt(0).toUpperCase() || "U"}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.displayName || "Usuário"}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.userStatus}>
                  <Ionicons name="shield-checkmark" size={16} color="#1E3A8A" />
                  <Text style={styles.userStatusText}>{t.settings.userStatus}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.appearance}</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t.settings.darkMode}</Text>
              <Text style={styles.settingDescription}>
                {t.settings.darkModeDescription} {isDarkMode ? t.settings.light : t.settings.dark}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: "#E2E8F0", true: "#10B981" }}
              thumbColor={isDarkMode ? "#FFFFFF" : "#F1F5F9"}
              ios_backgroundColor="#E2E8F0"
            />
          </View>

          <View style={[styles.settingRow, styles.lastRow]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t.settings.language}</Text>
              <Text style={styles.settingDescription}>{t.settings.languageDescription}</Text>
            </View>
            <TouchableOpacity style={styles.languageButton} onPress={handleLanguageToggle}>
              <Ionicons name="language" size={16} color="#FFFFFF" />
              <Text style={styles.languageButtonText}>{language === "pt" ? "PT" : "ES"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.appInfo}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.settings.version}</Text>
            <Text style={styles.infoValue}>{appInfo.version}</Text>
          </View>

          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={styles.infoLabel}>{t.settings.totalMotorcycles}</Text>
            <Text style={styles.infoValue}>{appInfo.motorcyclesCount}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.management}</Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#10B981" }]}
            onPress={() => router.push("/")}
          >
            <Ionicons name="home" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t.settings.backToHome}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={handleClearData}>
            <Ionicons name="trash" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t.settings.clearData}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t.settings.logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
