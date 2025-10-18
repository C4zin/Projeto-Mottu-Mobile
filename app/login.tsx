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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

import { useTheme } from "../src/context/theme-context"
import { useAuth } from "../src/context/auth-context"
import { useLanguage } from "../src/context/language-context"

export default function LoginScreen() {
  const { theme } = useTheme()
  const { login, isLoading } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email.trim()) {
      newErrors.email = t.login.errors.emailRequired
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.login.errors.emailInvalid
      isValid = false
    }

    if (!password) {
      newErrors.password = t.login.errors.passwordRequired
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = t.login.errors.passwordMin
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    const result = await login(email, password)

    if (!result.success) {
      Alert.alert(t.login.errors.loginFailed, result.error || t.login.errors.unknownError)
    } else {
      router.replace("/")
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "es" : "pt")
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === "dark" ? "#0F172A" : "#F1F5F9" },
    backgroundGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "50%",
      backgroundColor: theme === "dark" ? "#065F46" : "#10B981",
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    languageButton: {
      position: "absolute",
      top: 50,
      right: 24,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      zIndex: 10,
    },
    languageButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 6,
    },
    content: { flex: 1, padding: 24, justifyContent: "center" },
    logoContainer: { alignItems: "center", marginBottom: 48, zIndex: 1 },
    logoText: {
      fontSize: 28,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: "#FFFFFF",
      textShadowColor: "rgba(6, 95, 70, 0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      letterSpacing: 0.5,
    },
    loginCard: {
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
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginBottom: 8,
      color: "#065F46",
      textAlign: "center",
      letterSpacing: 0.3,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
      color: "#64748B",
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 22,
    },
    formGroup: { marginBottom: 24 },
    label: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginBottom: 8,
      color: "#065F46",
      letterSpacing: 0.2,
    },
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
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
      color: "#1E293B",
      paddingVertical: 0,
    },
    inputIcon: { marginRight: 12, color: "#64748B" },
    passwordToggle: { padding: 8, marginLeft: 8 },
    errorText: {
      color: "#DC2626",
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "500",
      marginTop: 8,
    },
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
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginLeft: 8,
      letterSpacing: 0.3,
    },
    registerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: "#E2E8F0",
    },
    registerText: {
      color: "#64748B",
      fontSize: 16,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "400",
    },
    registerLink: {
      color: "#10B981",
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginLeft: 4,
    },
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

      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <Ionicons name="language" size={18} color="#FFFFFF" />
        <Text style={styles.languageButtonText}>{language === "pt" ? "PT" : "ES"}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Moto Track</Text>
        </View>

        <View style={styles.loginCard}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#10B981" />
            </View>
          )}

          <Text style={styles.title}>{t.login.title}</Text>
          <Text style={styles.subtitle}>{t.login.subtitle}</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.login.email}</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <Ionicons name="mail" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t.login.emailPlaceholder}
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
            <Text style={styles.label}>{t.login.password}</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <Ionicons name="lock-closed" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t.login.passwordPlaceholder}
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
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

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading && <ActivityIndicator color="#FFFFFF" />}
            <Text style={styles.buttonText}>{isLoading ? t.login.loggingIn : t.login.loginButton}</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{t.login.noAccount}</Text>
            <TouchableOpacity onPress={() => router.push("/register")} disabled={isLoading}>
              <Text style={styles.registerLink}>{t.login.register}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
