"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"

import { useMotorcycles } from "../../src/context/motorcycle-context"
import { useTheme } from "../../src/context/theme-context"
import { useLanguage } from "../../src/context/language-context"
import type { Motorcycle, MotorcycleStatus } from "../../src/types"

export default function MotorcycleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { motorcycles, updateMotorcycle, deleteMotorcycle } = useMotorcycles()
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

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
    content: { padding: 24, paddingTop: 40 },
    headerCard: {
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
    modelName: { fontSize: 24, fontWeight: "800", color: theme === "dark" ? "#FFFFFF" : "#065F46", marginBottom: 8 },
    plate: { fontSize: 18, color: theme === "dark" ? "#94A3B8" : "#64748B", marginBottom: 12 },
    statusBadge: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, alignSelf: "flex-start" },
    statusText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
    infoCard: {
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
      fontWeight: "700",
      marginBottom: 16,
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    infoLabel: { fontSize: 16, color: theme === "dark" ? "#94A3B8" : "#64748B", fontWeight: "600" },
    infoValue: { fontSize: 16, fontWeight: "700", color: theme === "dark" ? "#10B981" : "#065F46" },
    mileageValue: { fontSize: 16, fontWeight: "700", color: "#10B981" },
    notesContainer: {
      backgroundColor: theme === "dark" ? "#0F172A" : "#F8FAFC",
      borderRadius: 16,
      padding: 20,
      marginTop: 16,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    notesText: { fontSize: 16, color: theme === "dark" ? "#CBD5E1" : "#475569", lineHeight: 24 },
    noNotesText: { fontSize: 16, color: "#94A3B8", fontStyle: "italic" },
    actionsContainer: {
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
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginBottom: 12,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    actionButtonText: { color: "#FFFFFF", fontWeight: "700", marginLeft: 12, fontSize: 16 },
    deleteButton: {
      backgroundColor: "#DC2626",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 16,
      marginTop: 20,
      shadowColor: "#DC2626",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    deleteButtonText: { color: "#FFFFFF", fontWeight: "700", marginLeft: 12, fontSize: 16 },
    lastRow: { borderBottomWidth: 0 },
  })

  useEffect(() => {
    if (!id) return
    const found = motorcycles.find((m) => m.id === String(id))
    setMotorcycle(found || null)
  }, [id, motorcycles])

  const handleStatusChange = async (newStatus: MotorcycleStatus) => {
    if (!motorcycle) return
    setIsUpdating(true)
    try {
      const updated = { ...motorcycle, status: newStatus }
      await updateMotorcycle(updated)
      setMotorcycle(updated)
      Alert.alert(t.common.success, t.detail.statusUpdateSuccess)
    } catch (error) {
      Alert.alert(t.common.error, t.detail.statusUpdateError)
      console.error("[Error updating status]:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = () => {
    if (!motorcycle) return

    Alert.alert(t.detail.confirmDelete, t.detail.deleteMessage, [
      { text: t.detail.cancel, style: "cancel" },
      {
        text: t.detail.delete,
        style: "destructive",
        onPress: async () => {
          try {
            setIsUpdating(true)
            console.log("[v0] Deleting motorcycle with ID:", motorcycle.id)
            await deleteMotorcycle(motorcycle.id)
            Alert.alert(t.common.success, t.detail.deleteSuccess)
            router.replace("/")
          } catch (error: any) {
            console.error("[DELETE /api/motos] erro:", error?.response?.data || error?.message)
            const msg = error?.response?.data?.message || t.detail.deleteError
            Alert.alert(t.common.error, msg)
          } finally {
            setIsUpdating(false)
          }
        },
      },
    ])
  }

  if (!motorcycle) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>{t.detail.notFound}</Text>
      </View>
    )
  }

  const getStatusColor = (status: MotorcycleStatus): string => {
    switch (status) {
      case "Disponível":
        return "#10B981"
      case "Em Uso":
        return "#059669"
      case "Manutenção":
        return "#DC2626"
      case "Reservada":
        return "#F59E0B"
      default:
        return "#6B7280"
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatMileage = (mileage: number): string => new Intl.NumberFormat("pt-BR").format(mileage)

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.modelName}>{motorcycle.modelName}</Text>
          <Text style={styles.plate}>
            {t.detail.plateLabel} {motorcycle.plate}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(motorcycle.status) }]}>
            <Text style={styles.statusText}>{motorcycle.status}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>{t.detail.mainInfo}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.detail.model}</Text>
            <Text style={styles.infoValue}>{motorcycle.modelName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.detail.branchLabel}</Text>
            <Text style={styles.infoValue}>{motorcycle.branchName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.detail.mileage}</Text>
            <Text style={styles.mileageValue}>{formatMileage(motorcycle.mileage)} km</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.detail.position}</Text>
            <Text style={styles.infoValue}>{`${motorcycle.position.row}-${motorcycle.position.spot}`}</Text>
          </View>

          {motorcycle.year && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.detail.year}</Text>
              <Text style={styles.infoValue}>{motorcycle.year}</Text>
            </View>
          )}

          {motorcycle.color && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.detail.color}</Text>
              <Text style={styles.infoValue}>{motorcycle.color}</Text>
            </View>
          )}

          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={styles.infoLabel}>{t.detail.createdAt}</Text>
            <Text style={styles.infoValue}>{formatDate(motorcycle.createdAt)}</Text>
          </View>

          {motorcycle.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.sectionTitle}>{t.detail.notes}</Text>
              <Text style={styles.notesText}>{motorcycle.notes}</Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>{t.detail.changeStatus}</Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#10B981" }]}
            onPress={() => handleStatusChange("Disponível")}
            disabled={motorcycle.status === "Disponível" || isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>{t.detail.markAsAvailable}</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#059669" }]}
            onPress={() => handleStatusChange("Em Uso")}
            disabled={motorcycle.status === "Em Uso" || isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="bicycle" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>{t.detail.markAsInUse}</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#DC2626" }]}
            onPress={() => handleStatusChange("Manutenção")}
            disabled={motorcycle.status === "Manutenção" || isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="construct" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>{t.detail.markAsMaintenance}</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#F59E0B" }]}
            onPress={() => handleStatusChange("Reservada")}
            disabled={motorcycle.status === "Reservada" || isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="time" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>{t.detail.markAsReserved}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} disabled={isUpdating}>
          <Ionicons name="trash" size={20} color="#FFFFFF" />
          <Text style={styles.deleteButtonText}>{isUpdating ? t.detail.deleting : t.detail.deleteButton}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  )
}
