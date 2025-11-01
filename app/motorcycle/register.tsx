"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { useLanguage } from "../../src/context/language-context"
import { useTheme } from "../../src/context/theme-context"
import { api } from "../../src/config/api" // 👈 importa sua instância configurada

type Moto = {
  id: number
  idModelo: number
  idFilial: number
  placa: string
  status: string
  kmRodado: number
}

// 👇 Usa o `api` ao invés do `axios` direto
async function cadastrarMoto(moto: Moto) {
  const response = await api.post("/api/motos", moto)
  return response.data
}

export default function CadastroMoto() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const [id, setId] = useState("")
  const [idModelo, setIdModelo] = useState("")
  const [idFilial, setIdFilial] = useState("")
  const [placa, setPlaca] = useState("")
  const [status, setStatus] = useState("")
  const [kmRodado, setKmRodado] = useState("")

  const mutation = useMutation({
    mutationFn: cadastrarMoto,
    onSuccess: (data) => {
      Alert.alert(
        t.motorcycleRegister.success,
        `${t.motorcycleRegister.motorcycleAddedWithId} ${data.id}`
      )
      // limpa os campos
      setId("")
      setIdModelo("")
      setIdFilial("")
      setPlaca("")
      setStatus("")
      setKmRodado("")
    },
    onError: (error: any) => {
      console.error(error)
      Alert.alert(
        t.motorcycleRegister.errors.registerError,
        error.response?.data?.message || t.motorcycleRegister.errors.tryAgainLater
      )
    },
  })

  const handleCadastrar = () => {
    if (!id || !idModelo || !idFilial || !placa || !status) {
      Alert.alert(t.common.error, t.motorcycleRegister.errors.fillAllFields)
      return
    }

    const novaMoto: Moto = {
      id: Number(id),
      idModelo: Number(idModelo),
      idFilial: Number(idFilial),
      placa,
      status,
      kmRodado: Number(kmRodado) || 0,
    }

    mutation.mutate(novaMoto)
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>{t.motorcycleRegister.backButton}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{t.motorcycleRegister.mainInfo}</Text>

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.motorcycleId}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
        />

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.modelId}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={idModelo}
          onChangeText={setIdModelo}
        />

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.branchId}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={idFilial}
          onChangeText={setIdFilial}
        />

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.plateExample}
          placeholderTextColor="#9CA3AF"
          maxLength={10}
          value={placa}
          onChangeText={setPlaca}
        />

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.mileage}
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={kmRodado}
          onChangeText={setKmRodado}
        />

        <TextInput
          style={styles.input}
          placeholder={t.motorcycleRegister.statusExample}
          placeholderTextColor="#9CA3AF"
          maxLength={30}
          value={status}
          onChangeText={setStatus}
        />

        <TouchableOpacity
          style={[styles.button, mutation.isPending && { opacity: 0.7 }]}
          onPress={handleCadastrar}
          disabled={mutation.isPending}
        >
          <Text style={styles.buttonText}>
            {mutation.isPending
              ? t.motorcycleRegister.registering
              : t.motorcycleRegister.registerButton}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E0E6ED",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1B263B",
    borderWidth: 1,
    borderColor: "#3A506B",
    color: "#E0E6ED",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#1B263B",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#3A506B",
  },
  backButtonText: {
    color: "#E0E6ED",
    fontWeight: "bold",
    fontSize: 16,
  },
})
