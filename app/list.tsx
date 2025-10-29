"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, RefreshControl } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

import { useMotorcycles } from "../src/context/motorcycle-context"
import { useTheme } from "../src/context/theme-context"
import { useLanguage } from "../src/context/language-context"

export default function YardMapScreen() {
  const { motorcycles, refetch } = useMotorcycles()
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const filteredMotorcycles = motorcycles.filter((motorcycle) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      motorcycle.modelName.toLowerCase().includes(q) ||
      motorcycle.plate.toLowerCase().includes(q) ||
      motorcycle.branchName.toLowerCase().includes(q)

    const matchesStatus = selectedStatus ? motorcycle.status === selectedStatus : true
    return matchesSearch && matchesStatus
  })

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  const statusFilters = ["Disponível", "Em Uso", "Manutenção", "Reservada"]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Disponível: "#10B981",
      "Em Uso": "#059669",
      Manutenção: "#DC2626",
      Reservada: "#F59E0B",
    }
    return colors[status] || "#6B7280"
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    header: {
      paddingTop: 60,
      paddingBottom: 24,
      paddingHorizontal: 24,
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      marginBottom: 16,
      letterSpacing: 0.5,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
      flex: 1,
      fontSize: 16,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
    },
    filterContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    filterChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    filterChipActive: { backgroundColor: "#FFFFFF" },
    filterChipText: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
    },
    filterChipTextActive: { color: "#10B981" },
    content: { flex: 1, padding: 24 },
    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
    statText: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
    },
    motorcycleCard: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 16,
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
    cardDetails: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    detailIcon: { marginRight: 8 },
    detailText: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#CBD5E1" : "#64748B",
      fontWeight: "500",
    },
    cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
    viewDetailsButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: "#10B981",
      borderRadius: 8,
    },
    viewDetailsText: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      marginRight: 4,
    },
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
    emptyIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme === "dark" ? "#334155" : "#D1FAE5",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
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
      <View style={styles.header}>
        <Text style={styles.title}>{t.list.title}</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.list.searchPlaceholder}
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedStatus && styles.filterChipActive]}
            onPress={() => setSelectedStatus(null)}
          >
            <Text style={[styles.filterChipText, !selectedStatus && styles.filterChipTextActive]}>Todas</Text>
          </TouchableOpacity>

          {statusFilters.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterChip, selectedStatus === status && styles.filterChipActive]}
              onPress={() => setSelectedStatus(selectedStatus === status ? null : status)}
            >
              <Text style={[styles.filterChipText, selectedStatus === status && styles.filterChipTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" colors={["#10B981"]} />
        }
      >
        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            {filteredMotorcycles.length} {filteredMotorcycles.length === 1 ? "moto encontrada" : "motos encontradas"}
          </Text>
        </View>

        {filteredMotorcycles.length > 0 ? (
          filteredMotorcycles.map((motorcycle) => (
            <View key={motorcycle.id} style={styles.motorcycleCard}>
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

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="business"
                    size={16}
                    color={theme === "dark" ? "#94A3B8" : "#64748B"}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailText}>{motorcycle.branchName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="location"
                    size={16}
                    color={theme === "dark" ? "#94A3B8" : "#64748B"}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailText}>
                    Posição: {motorcycle.position.row}-{motorcycle.position.spot}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="speedometer"
                    size={16}
                    color={theme === "dark" ? "#94A3B8" : "#64748B"}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailText}>{motorcycle.mileage.toLocaleString()} km</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() =>
                    router.push({
                      pathname: "/motorcycle/[id]",
                      params: { id: motorcycle.id },
                    })
                  }
                >
                  <Text style={styles.viewDetailsText}>Ver Detalhes</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="search" size={40} color="#3B82F6" />
            </View>
            <Text style={styles.emptyStateText}>
              {searchQuery || selectedStatus
                ? "Nenhuma moto encontrada com os filtros aplicados."
                : t.list.noMotorcycles}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
