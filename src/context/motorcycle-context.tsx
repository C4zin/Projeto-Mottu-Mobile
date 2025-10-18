"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Motorcycle, Model, Branch } from "../types"
import { notifyNewMotorcycle, notifyStatusChange, scheduleMaintenanceReminder } from "../lib/notifications"

interface MotorcycleContextType {
  motorcycles: Motorcycle[]
  models: Model[]
  branches: Branch[]
  loadMotorcycles: () => Promise<void>
  addMotorcycle: (motorcycle: Motorcycle) => Promise<void>
  updateMotorcycle: (updatedMotorcycle: Motorcycle) => Promise<void>
  deleteMotorcycle: (id: string) => Promise<void>
  clearAllMotorcycles: () => Promise<void>
}

const MotorcycleContext = createContext<MotorcycleContextType>({
  motorcycles: [],
  models: [],
  branches: [],
  loadMotorcycles: async () => {},
  addMotorcycle: async () => {},
  updateMotorcycle: async () => {},
  deleteMotorcycle: async () => {},
  clearAllMotorcycles: async () => {},
})

interface MotorcycleProviderProps {
  children: ReactNode
}

export function MotorcycleProvider({ children }: MotorcycleProviderProps) {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [models] = useState<Model[]>([
    { id: 1, name: "Honda CG 160" },
    { id: 2, name: "Yamaha Factor 150" },
    { id: 3, name: "Honda Biz 125" },
  ])
  const [branches] = useState<Branch[]>([
    { id: 1, name: "Filial Centro" },
    { id: 2, name: "Filial Norte" },
    { id: 3, name: "Filial Sul" },
  ])

  useEffect(() => {
    loadMotorcycles()
  }, [])

  useEffect(() => {
    saveMotorcycles()
  }, [motorcycles])

  const loadMotorcycles = async (): Promise<void> => {
    try {
      const storedMotorcycles = await AsyncStorage.getItem("motorcycles")
      if (storedMotorcycles) {
        setMotorcycles(JSON.parse(storedMotorcycles))
      }
    } catch (error) {
      console.error("Error loading motorcycles:", error)
    }
  }

  const saveMotorcycles = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("motorcycles", JSON.stringify(motorcycles))
    } catch (error) {
      console.error("Error saving motorcycles:", error)
    }
  }

  const addMotorcycle = async (motorcycle: Motorcycle): Promise<void> => {
    setMotorcycles((prev) => [...prev, motorcycle])

    // Send notification for new motorcycle
    await notifyNewMotorcycle(motorcycle.modelName, motorcycle.plate, motorcycle.id)

    // Check if maintenance reminder is needed
    await scheduleMaintenanceReminder(motorcycle.id, motorcycle.modelName, motorcycle.plate, motorcycle.mileage)
  }

  const updateMotorcycle = async (updatedMotorcycle: Motorcycle): Promise<void> => {
    const oldMotorcycle = motorcycles.find((m) => m.id === updatedMotorcycle.id)

    setMotorcycles((prev) =>
      prev.map((motorcycle) => (motorcycle.id === updatedMotorcycle.id ? updatedMotorcycle : motorcycle)),
    )

    // Send notification if status changed
    if (oldMotorcycle && oldMotorcycle.status !== updatedMotorcycle.status) {
      await notifyStatusChange(
        updatedMotorcycle.modelName,
        updatedMotorcycle.plate,
        oldMotorcycle.status,
        updatedMotorcycle.status,
        updatedMotorcycle.id,
      )
    }

    // Check if maintenance reminder is needed
    await scheduleMaintenanceReminder(
      updatedMotorcycle.id,
      updatedMotorcycle.modelName,
      updatedMotorcycle.plate,
      updatedMotorcycle.mileage,
    )
  }

  const deleteMotorcycle = async (id: string): Promise<void> => {
    setMotorcycles((prev) => prev.filter((motorcycle) => motorcycle.id !== id))
  }

  const clearAllMotorcycles = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("motorcycles")
      setMotorcycles([])
    } catch (error) {
      console.error("Error clearing motorcycles:", error)
    }
  }

  return (
    <MotorcycleContext.Provider
      value={{
        motorcycles,
        models,
        branches,
        loadMotorcycles,
        addMotorcycle,
        updateMotorcycle,
        deleteMotorcycle,
        clearAllMotorcycles,
      }}
    >
      {children}
    </MotorcycleContext.Provider>
  )
}

export function useMotorcycles(): MotorcycleContextType {
  return useContext(MotorcycleContext)
}
