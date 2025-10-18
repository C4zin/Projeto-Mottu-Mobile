"use client"

import { useState, useMemo } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router" // ✅ expo-router

import { useMotorcycles } from "../../src/context/motorcycle-context"
import { useTheme } from "../../src/context/theme-context"
import type { Motorcycle, MotorcyclePosition, MotorcycleStatus } from "../../src/types"
import { motorcycleApi } from "../../src/services/api"

interface FormData {
  modelId: number
  branchId: number
  plate: string
  status: MotorcycleStatus
  mileage: string
  position: MotorcyclePosition
  notes: string
  year: string
  color: string
}
interface FormErrors {
  modelId?: string
  branchId?: string
  plate?: string
  mileage?: string
  year?: string
  color?: string
}

export default function RegisterMotorcycleScreen() {
  const { addMotorcycle, models, branches } = useMotorcycles()
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    modelId: models.length > 0 ? models[0].id : 1,
    branchId: branches.length > 0 ? branches[0].id : 1,
    plate: "",
    status: "Disponível",
    mileage: "0",
    position: { row: "A", spot: "1" },
    notes: "",
    year: "",
    color: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const updateForm = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const updatePosition = (field: keyof MotorcyclePosition, value: string) => {
    setFormData((prev) => ({ ...prev, position: { ...prev.position, [field]: value } }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.modelId) newErrors.modelId = "Modelo é obrigatório"
    if (!formData.branchId) newErrors.branchId = "Filial é obrigatória"

    if (!formData.plate.trim()) newErrors.plate = "Placa é obrigatória"
    else if (!/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/.test(formData.plate))
      newErrors.plate = "Formato de placa inválido (AAA0A00)"

    if (!formData.mileage.trim()) newErrors.mileage = "Quilometragem é obrigatória"
    else if (isNaN(Number(formData.mileage)) || Number(formData.mileage) < 0)
      newErrors.mileage = "Quilometragem deve ser um número válido"

    if (
      formData.year &&
      (!/^\d{4}$/.test(formData.year) ||
        Number.parseInt(formData.year) < 1980 ||
        Number.parseInt(formData.year) > new Date().getFullYear() + 1)
    )
      newErrors.year = "Ano inválido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const selectedModel = useMemo(() => models.find((m) => m.id === formData.modelId), [models, formData.modelId])
  const selectedBranch = useMemo(() => branches.find((b) => b.id === formData.branchId), [branches, formData.branchId])

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const newMotorcycle: Motorcycle = {
        id: "",
        modelId: formData.modelId,
        modelName: selectedModel?.name || "Modelo Desconhecido",
        branchId: formData.branchId,
        branchName: selectedBranch?.name || "Filial Desconhecida",
        plate: formData.plate,
        status: formData.status,
        mileage: Number(formData.mileage),
        position: formData.position,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        year: formData.year || undefined,
        color: formData.color || undefined,
      }

      const created = await motorcycleApi.create(newMotorcycle)

      const createdWithId: Motorcycle = {
        ...newMotorcycle,
        ...created,
        id: created.id || newMotorcycle.id || Date.now().toString(),
      }

      await addMotorcycle(createdWithId)

      Alert.alert("Sucesso", "Moto cadastrada com sucesso!", [
        {
          text: "Ver Detalhes",
          onPress: () =>
            router.push({
              pathname: "/motorcycles/[id]", // ✅ ajuste se sua rota for diferente
              params: { id: createdWithId.id },
            }),
        },
        { text: "Voltar para Home", onPress: () => router.replace("/") },
      ])
    } catch (err: any) {
      if (err?.response) {
        const { status, data } = err.response
        if (status === 400) Alert.alert("Dados inválidos", data?.message ?? "Verifique os campos e tente novamente.")
        else if (status === 409) Alert.alert("Conflito", data?.message ?? "Placa já cadastrada.")
        else if (status === 405)
          Alert.alert("Método não permitido (405)", "Confirme se o endpoint aceita POST em /api/motos.")
        else Alert.alert("Erro", `Falha ao cadastrar (HTTP ${status}).`)
        console.error("[POST /api/motos] erro:", status, data)
      } else {
        Alert.alert("Erro de rede", "Não foi possível comunicar com a API.")
        console.error("[POST /api/motos] erro de rede:", err?.message || err)
      }
    } finally {
      setIsSubmitting(false)
    }
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
    scrollContent: { flexGrow: 1, padding: 24, paddingTop: 40 },
    formCard: {
      backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
      borderRadius: 24,
      padding: 32,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
      marginBottom: 32,
    },
    formGroup: { marginBottom: 24 },
    label: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginBottom: 8,
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      letterSpacing: 0.2,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#0F172A" : "#F8FAFC",
      borderWidth: 2,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
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
      color: theme === "dark" ? "#FFFFFF" : "#1E293B",
      paddingVertical: 0,
    },
    inputIcon: { marginRight: 12, color: theme === "dark" ? "#94A3B8" : "#64748B" },
    pickerContainer: {
      backgroundColor: theme === "dark" ? "#0F172A" : "#F8FAFC",
      borderWidth: 2,
      borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
      borderRadius: 16,
      shadowColor: "#065F46",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    picker: {
      color: theme === "dark" ? "#FFFFFF" : "#1E293B",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    positionContainer: { flexDirection: "row", justifyContent: "space-between" },
    positionItem: { flex: 1, marginRight: 10 },
    textArea: { height: 100, textAlignVertical: "top", paddingTop: 16 },
    errorText: {
      color: "#DC2626",
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "500",
      marginTop: 8,
    },
    previewCard: {
      backgroundColor: theme === "dark" ? "#064E3B" : "#D1FAE5",
      borderRadius: 20,
      padding: 24,
      marginTop: 24,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#065F46" : "#A7F3D0",
    },
    previewTitle: {
      fontSize: 20,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginBottom: 16,
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      letterSpacing: 0.2,
    },
    previewRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    previewLabel: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#94A3B8" : "#64748B",
      fontWeight: "600",
    },
    previewValue: {
      fontSize: 14,
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      fontWeight: "700",
      color: theme === "dark" ? "#10B981" : "#065F46",
    },
    button: {
      backgroundColor: "#10B981",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginTop: 24,
      flexDirection: "row",
      justifyContent: "center",
      shadowColor: "#10B981",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      marginLeft: 8,
      letterSpacing: 0.3,
    },
    sectionDivider: { height: 1, backgroundColor: theme === "dark" ? "#334155" : "#E2E8F0", marginVertical: 24 },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
      color: theme === "dark" ? "#FFFFFF" : "#065F46",
      marginBottom: 16,
      letterSpacing: 0.2,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Informações Principais</Text>

            {/* Modelo */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Modelo</Text>
              <View style={[styles.pickerContainer, errors.modelId && styles.inputError]}>
                <Picker
                  selectedValue={formData.modelId}
                  onValueChange={(value) => updateForm("modelId", value)}
                  style={styles.picker}
                >
                  {models.map((m) => (
                    <Picker.Item key={m.id} label={m.name} value={m.id} />
                  ))}
                </Picker>
              </View>
              {errors.modelId && <Text style={styles.errorText}>{errors.modelId}</Text>}
            </View>

            {/* Filial */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Filial</Text>
              <View style={[styles.pickerContainer, errors.branchId && styles.inputError]}>
                <Picker
                  selectedValue={formData.branchId}
                  onValueChange={(value) => updateForm("branchId", value)}
                  style={styles.picker}
                >
                  {branches.map((branch) => (
                    <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                  ))}
                </Picker>
              </View>
              {errors.branchId && <Text style={styles.errorText}>{errors.branchId}</Text>}
            </View>

            {/* Placa */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Placa</Text>
              <View style={[styles.inputContainer, errors.plate && styles.inputError]}>
                <Ionicons name="document-text" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: ABC1D23"
                  placeholderTextColor="#94A3B8"
                  value={formData.plate}
                  onChangeText={(text) => updateForm("plate", text.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={7}
                />
              </View>
              {errors.plate && <Text style={styles.errorText}>{errors.plate}</Text>}
            </View>

            {/* KM */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quilometragem (km)</Text>
              <View style={[styles.inputContainer, errors.mileage && styles.inputError]}>
                <Ionicons name="speedometer" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 15000"
                  placeholderTextColor="#94A3B8"
                  value={formData.mileage}
                  onChangeText={(text) => updateForm("mileage", text)}
                  keyboardType="numeric"
                />
              </View>
              {errors.mileage && <Text style={styles.errorText}>{errors.mileage}</Text>}
            </View>

            {/* Status */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.status}
                  onValueChange={(value) => updateForm("status", value as MotorcycleStatus)}
                  style={styles.picker}
                >
                  <Picker.Item label="Disponível" value="Disponível" />
                  <Picker.Item label="Em Uso" value="Em Uso" />
                  <Picker.Item label="Manutenção" value="Manutenção" />
                  <Picker.Item label="Reservada" value="Reservada" />
                </Picker>
              </View>
            </View>

            {/* Prévia */}
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>Pré-visualização</Text>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Modelo:</Text>
                <Text style={styles.previewValue}>{selectedModel?.name || "Não selecionado"}</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Filial:</Text>
                <Text style={styles.previewValue}>{selectedBranch?.name || "Não selecionada"}</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Placa:</Text>
                <Text style={styles.previewValue}>{formData.plate || "Não informada"}</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Quilometragem:</Text>
                <Text style={styles.previewValue}>{formData.mileage || "0"} km</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Status:</Text>
                <Text style={styles.previewValue}>{formData.status}</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Posição:</Text>
                <Text style={styles.previewValue}>{`${formData.position.row}-${formData.position.spot}`}</Text>
              </View>
            </View>

            {/* Enviar */}
            <TouchableOpacity
              style={[styles.button, isSubmitting && { opacity: 0.6 }]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Cadastrar Moto</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
