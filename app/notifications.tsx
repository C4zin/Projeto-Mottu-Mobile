"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Switch, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useTheme } from "../src/context/theme-context"
import { useLanguage } from "../src/context/language-context"
import { useNotifications } from "../src/context/notifications-context"
import { useMotorcycles } from "../src/context/motorcycle-context"
import { useState, useEffect } from "react"
import * as Notifications from "expo-notifications"
import { scheduleDailySummary, cancelAllNotifications, getAllScheduledNotifications } from "../src/lib/notifications"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const isSmallScreen = SCREEN_WIDTH < 375
const isTablet = SCREEN_WIDTH >= 768

const scale = (size: number) => (SCREEN_WIDTH / 375) * size
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor

export default function NotificationsScreen() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { notificationsEnabled, enableNotifications, disableNotifications, expoPushToken } = useNotifications()
  const { motorcycles } = useMotorcycles()
  const [dailySummaryEnabled, setDailySummaryEnabled] = useState(false)
  const [scheduledCount, setScheduledCount] = useState(0)

  useEffect(() => {
    loadScheduledNotifications()
  }, [])

  const loadScheduledNotifications = async () => {
    const scheduled = await getAllScheduledNotifications()
    setScheduledCount(scheduled.length)
  }

  const handleToggleNotifications = async (value: boolean) => {
    if (value) {
      await enableNotifications()
    } else {
      await disableNotifications()
    }
  }

  const handleToggleDailySummary = async (value: boolean) => {
    setDailySummaryEnabled(value)
    if (value) {
      const availableCount = motorcycles.filter((m) => m.status === "Disponível").length
      const maintenanceCount = motorcycles.filter((m) => m.status === "Manutenção").length
      await scheduleDailySummary(motorcycles.length, availableCount, maintenanceCount)
    } else {
      await cancelAllNotifications()
    }
    await loadScheduledNotifications()
  }

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: t.notifications.testNotificationTitle,
        body: t.notifications.testNotificationBody,
        data: { type: "test" },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        repeats: false,
      },
    })
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    header: {
      paddingTop: Platform.OS === "ios" ? (isTablet ? 70 : 60) : 50,
      paddingBottom: isTablet ? 32 : moderateScale(24),
      paddingHorizontal: isTablet ? 40 : moderateScale(24),
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: isTablet ? 32 : 24,
      borderBottomRightRadius: isTablet ? 32 : 24,
    },
    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: isTablet ? 20 : 16,
      maxWidth: isTablet ? 1200 : "100%",
      alignSelf: "center",
      width: "100%",
    },
    backButton: {
      width: isTablet ? 48 : 40,
      height: isTablet ? 48 : 40,
      borderRadius: isTablet ? 24 : 20,
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: isTablet ? 20 : 16,
    },
    title: {
      fontSize: isTablet ? 32 : moderateScale(24),
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: isTablet ? 40 : moderateScale(24),
      paddingVertical: isTablet ? 32 : moderateScale(24),
      maxWidth: isTablet ? 1200 : "100%",
      alignSelf: "center",
      width: "100%",
    },
    section: {
      marginBottom: isTablet ? 40 : moderateScale(32),
    },
    sectionTitle: {
      fontSize: isTablet ? 22 : moderateScale(18),
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      marginBottom: isTablet ? 20 : 16,
    },
    card: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: isTablet ? 20 : 16,
      padding: isTablet ? 28 : moderateScale(20),
      marginBottom: isTablet ? 16 : 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    settingRow: {
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isSmallScreen ? "flex-start" : "center",
      marginBottom: isTablet ? 20 : 16,
    },
    settingInfo: {
      flex: 1,
      marginRight: isSmallScreen ? 0 : 16,
      marginBottom: isSmallScreen ? 12 : 0,
    },
    settingTitle: {
      fontSize: isTablet ? 18 : moderateScale(16),
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      marginBottom: 4,
    },
    settingDescription: {
      fontSize: isTablet ? 16 : moderateScale(14),
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      lineHeight: isTablet ? 24 : moderateScale(20),
    },
    infoCard: {
      backgroundColor: theme === "dark" ? "#1E3A8A" : "#DBEAFE",
      borderRadius: isTablet ? 16 : 12,
      padding: isTablet ? 20 : moderateScale(16),
      flexDirection: "row",
      alignItems: "center",
    },
    infoText: {
      flex: 1,
      fontSize: isTablet ? 16 : moderateScale(14),
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#BFDBFE" : "#1E3A8A",
      marginLeft: isTablet ? 16 : 12,
      lineHeight: isTablet ? 24 : moderateScale(20),
    },
    testButton: {
      backgroundColor: "#10B981",
      borderRadius: isTablet ? 16 : 12,
      padding: isTablet ? 20 : moderateScale(16),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      minHeight: 48,
    },
    testButtonText: {
      color: "#FFFFFF",
      fontSize: isTablet ? 18 : moderateScale(16),
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginLeft: 8,
    },
    statsCard: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: isTablet ? 20 : 16,
      padding: isTablet ? 28 : moderateScale(20),
      flexDirection: isSmallScreen ? "column" : "row",
      justifyContent: "space-around",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    statItem: {
      alignItems: "center",
      marginVertical: isSmallScreen ? 12 : 0,
      minWidth: isTablet ? 120 : 80,
    },
    statValue: {
      fontSize: isTablet ? 36 : moderateScale(28),
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#10B981" : "#065F46",
      marginBottom: isTablet ? 8 : 4,
    },
    statLabel: {
      fontSize: isTablet ? 14 : moderateScale(12),
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      textAlign: "center",
    },
    tokenCard: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#F8FAFC",
      borderRadius: isTablet ? 16 : 12,
      padding: isTablet ? 20 : moderateScale(16),
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    tokenLabel: {
      fontSize: isTablet ? 14 : moderateScale(12),
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      marginBottom: isTablet ? 12 : 8,
    },
    tokenText: {
      fontSize: isTablet ? 12 : moderateScale(11),
      fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
      color: theme === "dark" ? "#CBD5E1" : "#475569",
      lineHeight: isTablet ? 18 : moderateScale(16),
    },
  })

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{t.notifications.title}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.notifications.settingsSection}</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{t.notifications.enableNotifications}</Text>
                <Text style={styles.settingDescription}>{t.notifications.enableNotificationsDesc}</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: "#CBD5E1", true: "#10B981" }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{t.notifications.dailySummary}</Text>
                <Text style={styles.settingDescription}>{t.notifications.dailySummaryDesc}</Text>
              </View>
              <Switch
                value={dailySummaryEnabled}
                onValueChange={handleToggleDailySummary}
                trackColor={{ false: "#CBD5E1", true: "#10B981" }}
                thumbColor="#FFFFFF"
                disabled={!notificationsEnabled}
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="information-circle"
              size={isTablet ? 28 : 24}
              color={theme === "dark" ? "#BFDBFE" : "#1E3A8A"}
            />
            <Text style={styles.infoText}>{t.notifications.infoMessage}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.notifications.statisticsSection}</Text>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{scheduledCount}</Text>
              <Text style={styles.statLabel}>{t.notifications.scheduled}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{motorcycles.length}</Text>
              <Text style={styles.statLabel}>{t.notifications.motorcycles}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{motorcycles.filter((m) => m.status === "Manutenção").length}</Text>
              <Text style={styles.statLabel}>{t.notifications.maintenance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.notifications.testSection}</Text>

          <TouchableOpacity style={styles.testButton} onPress={sendTestNotification} disabled={!notificationsEnabled}>
            <Ionicons name="notifications" size={isTablet ? 24 : 20} color="#FFFFFF" />
            <Text style={styles.testButtonText}>{t.notifications.sendTestNotification}</Text>
          </TouchableOpacity>
        </View>

        {expoPushToken && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.notifications.pushTokenSection}</Text>
            <View style={styles.tokenCard}>
              <Text style={styles.tokenLabel}>{t.notifications.expoPushToken}</Text>
              <Text style={styles.tokenText} numberOfLines={3}>
                {expoPushToken}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
