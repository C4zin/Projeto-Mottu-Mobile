"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

import { useTheme } from "../src/context/theme-context"
import { useAuth } from "../src/context/auth-context"
import { useLanguage } from "../src/context/language-context"

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterScreen() {
  const { theme } = useTheme()
  const { register, isLoading } = useAuth()
  const { t } = useLanguage()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: FormErrors = {}

    if (!email.trim()) {
      newErrors.email = t.register.errors.emailRequired
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.register.errors.emailInvalid
      isValid = false
    }

    if (!password) {
      newErrors.password = t.register.errors.passwordRequired
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = t.register.errors.passwordMin
      isValid = false
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.register.errors.passwordMismatch
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    const result = await register(email, password)

    if (result.success) {
      Alert.alert(t.common.success, "Conta criada com sucesso! Você já está logado.")
      router.replace("/")
    } else {
      Alert.alert(t.register.errors.registerFailed, result.error || t.login.errors.unknownError)
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    backgroundGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "40%",
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    scrollContent: { flexGrow: 1, padding: 24, paddingTop: 60 },
    header: { alignItems: "center", marginBottom: 32, zIndex: 1 },
    headerIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: 8,
      textShadowColor: "rgba(6, 95, 70, 0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.9)",
      textAlign: "center",
      textShadowColor: "rgba(6, 95, 70, 0.3)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    registerCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 24,
      padding: 32,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 16,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#065F46" : "#E2E8F0",
      marginBottom: 32,
    },
    formGroup: { marginBottom: 24 },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#065F46" },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F8FAFC",
      borderWidth: 2,
      borderColor: "#E2E8F0",
      borderRadius: 16,
      paddingHorizontal: 16,
      height: 56,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    inputError: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
    input: { flex: 1, fontSize: 16, color: "#1E293B", paddingVertical: 0 },
    inputIcon: { marginRight: 12, color: "#64748B" },
    passwordToggle: { padding: 8, marginLeft: 8 },
    errorText: { color: "#DC2626", fontSize: 14, marginTop: 8, fontWeight: "500" },
    button: {
      backgroundColor: "#10B981",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "center",
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    buttonDisabled: { backgroundColor: "#94A3B8", shadowOpacity: 0.1 },
    buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginLeft: 8 },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: "#E2E8F0",
    },
    loginText: { color: "#64748B", fontSize: 16 },
    loginLink: { color: "#10B981", fontWeight: "700", marginLeft: 4 },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(6, 95, 70, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
    },
  })

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.backgroundGradient} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="person-add" size={40} color="#1E3A8A" />
          </View>
          <Text style={styles.title}>{t.register.title}</Text>
          <Text style={styles.subtitle}>{t.register.subtitle}</Text>
        </View>

        <View style={styles.registerCard}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#3B82F6" />
            </View>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.register.email}</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <Ionicons name="mail" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t.register.emailPlaceholder}
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.register.password}</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <Ionicons name="lock-closed" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t.register.passwordPlaceholder}
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.register.confirmPassword}</Text>
            <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
              <Ionicons name="shield-checkmark" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t.register.confirmPasswordPlaceholder}
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading && <ActivityIndicator color="#FFFFFF" />}
            <Text style={styles.buttonText}>{isLoading ? t.register.registering : t.register.registerButton}</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{t.register.hasAccount}</Text>
            <TouchableOpacity onPress={() => router.push("/login")} disabled={isLoading}>
              <Text style={styles.loginLink}>{t.register.login}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
