"use client";

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../src/context/theme-context";
import { useLanguage } from "../src/context/language-context";

export default function AboutAppScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const commits = [
    { message: "Finalizando com Render", hash: "4278584", date: "2025-10-31" },
    { message: "criando Sobre o App", hash: "4278584", date: "2025-10-30" },
    { message: "api funcionando localmente ainda, e adicionando a pagina about", hash: "5b84d32", date: "2025-10-29" },
    { message: "adicionando notificações", hash: "e4a68f7", date: "2025-10-29" },
    { message: "reajustando todos os contexts e adicionando tradução em espanhol", hash: "bc454f0", date: "2025-10-29" },
    { message: "atualizando dependencias e reajustando firebase", hash: "2fabe79", date: "2025-10-29" },
    { message: "fazendo tudo relacionado a api’s", hash: "33c4681", date: "2025-10-29" },
    { message: "modificando todas as telas para a sprint 4", hash: "44cbc85", date: "2025-10-29" },
    { message: "adicionando todos os arquivos necessários", hash: "15974c1", date: "2025-10-29" },
    { message: "redesenhando a estrutura do projeto", hash: "aa9f295", date: "2025-10-29" },
    { message: "fazendo ajustes para começar a quarta sprint", hash: "27a226e", date: "2025-10-29" },
    { message: "falta arrumar a api", hash: "a88d76b", date: "2025-10-01" },
    { message: "configurando toda a api", hash: "8504d95", date: "2025-10-01" },
    { message: "Merge branch 'main' ...", hash: "b48ffd4", date: "2025-10-01" },
    { message: "adicionando e configurando api", hash: "05885e9", date: "2025-10-01" },
    { message: "Update README.md", hash: "cb877ac", date: "2025-10-01" },
    { message: "Retocando o README.md", hash: "de99486", date: "2025-09-30" },
    { message: "Deu erro no ultimo entao aproveitei pra arrumar e atualizar o README.md", hash: "c798321", date: "2025-09-30" },
    { message: "Ajustando css e melhorando as telas", hash: "3123847", date: "2025-09-30" },
    { message: "Implementando a api de cadastro usando Firebase", hash: "8b27161", date: "2025-09-30" },
    { message: "tela de login fim do projeto", hash: "2d6618e", date: "2025-05-19" },
    { message: "projeto quase finalizado", hash: "ff994e1", date: "2025-05-18" },
    { message: "projeto", hash: "183efa5", date: "2025-05-18" },
    { message: "first commit", hash: "21df3a9", date: "2025-05-18" },
    { message: "começando", hash: "93970a0", date: "2025-05-18" },
  ];

  const totalCommits = commits.length;

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
    },
    appName: {
      fontSize: 24,
      fontWeight: "800",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      textAlign: "center",
      marginBottom: 4,
    },
    commitCount: {
      fontSize: 14,
      fontWeight: "600",
      color: theme === "dark" ? "#94A3B8" : "#047857",
      textAlign: "center",
      marginBottom: 16,
    },
    commitCard: {
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#334155" : "#E2E8F0",
      paddingVertical: 12,
    },
    commitMessage: {
      fontSize: 15,
      fontWeight: "700",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
    },
    commitDetails: {
      fontSize: 13,
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre o App</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.appIcon}>
            <Ionicons name="bicycle" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>MotoTrack</Text>
          <Text style={styles.commitCount}>📦 {totalCommits} commits registrados</Text>

          {commits.map((commit, index) => (
            <View key={index} style={styles.commitCard}>
              <Text style={styles.commitMessage}>{commit.message}</Text>
              <Text style={styles.commitDetails}>
                Autor: C4zin | Hash: {commit.hash} | {commit.date}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
