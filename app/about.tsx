"use client";

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../src/context/theme-context";
import { useLanguage } from "../src/context/language-context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"

export default function AboutScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // 🔹 Busca o commit mais recente com TanStack Query
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["githubCommit"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.github.com/repos/felipecvo-fiap-mad/2tdspw-sprint-01-mototrack/commits"
      );
      const latest = response.data[0];
      return {
        hash: latest.sha.substring(0, 7),
        date: new Date(latest.commit.committer.date).toISOString().split("T")[0],
      };
    },
  });

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
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: "#FFFFFF",
    },
    content: { flex: 1, padding: 24 },
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
    appIcon: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: "#10B981",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 16,
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    appName: {
      fontSize: 24,
      fontWeight: "800",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      textAlign: "center",
      marginBottom: 8,
    },
    appVersion: {
      fontSize: 16,
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      textAlign: "center",
      marginBottom: 24,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#334155" : "#E2E8F0",
    },
    infoLabel: {
      fontSize: 14,
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      fontWeight: "600",
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme === "dark" ? "#10B981" : "#065F46",
      fontFamily: "monospace",
    },
    lastRow: { borderBottomWidth: 0 },
    loadingText: {
      textAlign: "center",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      marginTop: 10,
    },
    errorText: {
      textAlign: "center",
      color: "#EF4444",
      marginTop: 10,
    },
    refreshButton: {
      marginTop: 16,
      backgroundColor: theme === "dark" ? "#10B981" : "#065F46",
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    refreshText: {
      color: "#FFFFFF",
      fontWeight: "700",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.about.title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.appIcon}>
            <Ionicons name="bicycle" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>{t.about.appName}</Text>
          <Text style={styles.appVersion}>{t.about.version} 1.0.0</Text>

          {isLoading ? (
            <View>
              <ActivityIndicator color="#10B981" />
              <Text style={styles.loadingText}>Buscando commit...</Text>
            </View>
          ) : isError ? (
            <Text style={styles.errorText}>Erro ao buscar commit 😞</Text>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t.about.commitHash}</Text>
                <Text style={styles.infoValue}>{data?.hash}</Text>
              </View>
              <View style={[styles.infoRow, styles.lastRow]}>
                <Text style={styles.infoLabel}>{t.about.buildDate}</Text>
                <Text style={styles.infoValue}>{data?.date}</Text>
              </View>

              <TouchableOpacity
                style={styles.refreshButton}
                onPress={() => refetch()}
                disabled={isFetching}
              >
                {isFetching ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.refreshText}>🔄 Atualizar commit</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
