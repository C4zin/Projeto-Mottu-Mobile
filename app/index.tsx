"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, RefreshControl, Linking } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useMotorcycles } from "../src/context/motorcycle-context"
import { useTheme } from "../src/context/theme-context"
import { useNotifications } from "../src/context/notifications-context"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen() {
  const { motorcycles, loadMotorcycles } = useMotorcycles()
  const { theme } = useTheme()
  const { notificationsEnabled } = useNotifications()
  const [lastVisit, setLastVisit] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadMotorcycles()

    const saveVisit = async () => {
      const now = new Date().toLocaleString()
      await AsyncStorage.setItem("lastVisit", now)
      setLastVisit(now)
    }

    const getLastVisit = async () => {
      const lastVisitTime = await AsyncStorage.getItem("lastVisit")
      if (lastVisitTime) setLastVisit(lastVisitTime)
    }

    getLastVisit()
    saveVisit()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await loadMotorcycles()
    } finally {
      setRefreshing(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Disponível: "#10B981",
      "Em Uso": "#059669",
      Manutenção: "#DC2626",
      Reservada: "#F59E0B",
    }
    return colors[status] || "#6B7280"
  }

  const openIoTSystem = async () => {
    const url = "https://iotsprint4-ntqudvchvkfsd5hgo5mvta.streamlit.app"
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      console.error("Não foi possível abrir a URL:", url)
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    backgroundGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 280,
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    header: { paddingTop: 60, paddingBottom: 32, paddingHorizontal: 24, zIndex: 1 },
    headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    title: {
      fontSize: 28,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      textShadowColor: "rgba(6, 95, 70, 0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      letterSpacing: 0.5,
    },
    headerButtons: { flexDirection: "row", gap: 12 },
    notificationButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#10B981",
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
    settingsButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    lastVisit: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
      color: "rgba(255,255,255,0.9)",
      marginBottom: 16,
    },
    statsContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
    statCard: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      padding: 20,
      borderRadius: 20,
      marginHorizontal: 6,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      alignItems: "center",
    },
    statIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme === "dark" ? "#064E3B" : "#D1FAE5",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#10B981" : "#065F46",
      marginBottom: 4,
      letterSpacing: 0.3,
    },
    statTitle: {
      fontSize: 12,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      fontWeight: "600",
      textAlign: "center",
      letterSpacing: 0.2,
    },
    content: { flex: 1, padding: 24, paddingTop: 32 },
    actionButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      marginHorizontal: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    primaryButton: { backgroundColor: "#10B981" },
    secondaryButton: { backgroundColor: "#059669" },
    iotButton: { backgroundColor: "#3B82F6" },
    actionButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginLeft: 8,
      letterSpacing: 0.3,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginBottom: 20,
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      letterSpacing: 0.3,
    },
    motorcycleCard: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
    cardInfo: { flex: 1 },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      marginBottom: 4,
      letterSpacing: 0.2,
    },
    cardSubtitle: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      marginBottom: 2,
    },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignSelf: "flex-start" },
    statusText: {
      fontSize: 12,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      letterSpacing: 0.2,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    positionText: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      fontWeight: "600",
    },
    chevronIcon: { color: "#94A3B8" },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 20,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
    },
    emptyStateText: {
      fontSize: 16,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      textAlign: "center",
      lineHeight: 24,
    },
  })

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.backgroundGradient} />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Moto Manager</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.notificationButton} onPress={() => router.push("/notifications")}>
              <Ionicons name="notifications" size={24} color="#FFFFFF" />
              {notificationsEnabled && <View style={styles.notificationBadge} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/settings")}>
              <Ionicons name="settings" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {lastVisit && <Text style={styles.lastVisit}>Último acesso: {lastVisit}</Text>}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{motorcycles.length}</Text>
            <Text style={styles.statTitle}>Total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <Text style={styles.statValue}>{motorcycles.filter((m) => m.status === "Disponível").length}</Text>
            <Text style={styles.statTitle}>Disponíveis</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="construct" size={24} color="#DC2626" />
            </View>
            <Text style={styles.statValue}>{motorcycles.filter((m) => m.status === "Manutenção").length}</Text>
            <Text style={styles.statTitle}>Manutenção</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" colors={["#10B981"]} />
        }
      >
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => router.push("/motorcycle/register")}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => router.push("/list")}>
            <Ionicons name="list" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Lista de Motos</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.actionButton, styles.iotButton]} onPress={openIoTSystem}>
          <Ionicons name="hardware-chip" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Sistema IoT</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Motos Recentes</Text>

        {motorcycles.length > 0 ? (
          motorcycles.slice(0, 5).map((motorcycle) => (
            <TouchableOpacity
              key={motorcycle.id}
              style={styles.motorcycleCard}
              onPress={() => router.push({ pathname: "/motorcycle/[id]", params: { id: motorcycle.id } })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{motorcycle.modelName}</Text>
                  <Text style={styles.cardSubtitle}>Placa: {motorcycle.plate}</Text>
                  {motorcycle.year && <Text style={styles.cardSubtitle}>Ano: {motorcycle.year}</Text>}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(motorcycle.status) }]}>
                  <Text style={styles.statusText}>{motorcycle.status}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.positionText}>
                  Posição: {motorcycle.position.row}-{motorcycle.position.spot}
                </Text>
                <Ionicons name="chevron-forward" size={20} style={styles.chevronIcon} />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Nenhuma moto cadastrada.{"\n"}Clique em "Cadastrar" para adicionar sua primeira moto.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
