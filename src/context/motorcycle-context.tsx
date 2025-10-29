"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Motorcycle, Model, Branch } from "../types"
import { notifyNewMotorcycle, notifyStatusChange, scheduleMaintenanceReminder } from "../lib/notifications"
import {
  useMotorcyclesQuery,
  useCreateMotorcycleMutation,
  useUpdateMotorcycleMutation,
  useDeleteMotorcycleMutation,
} from "../hooks/use-motorcycle-query"

interface MotorcycleContextType {
  motorcycles: Motorcycle[]
  models: Model[]
  branches: Branch[]
  isLoading: boolean
  error: Error | null
  addMotorcycle: (motorcycle: Motorcycle) => Promise<void>
  updateMotorcycle: (updatedMotorcycle: Motorcycle) => Promise<void>
  deleteMotorcycle: (id: string) => Promise<void>
  refetch: () => Promise<void>
}

const MotorcycleContext = createContext<MotorcycleContextType>({
  motorcycles: [],
  models: [],
  branches: [],
  isLoading: false,
  error: null,
  addMotorcycle: async () => {},
  updateMotorcycle: async () => {},
  deleteMotorcycle: async () => {},
  refetch: async () => {},
})

interface MotorcycleProviderProps {
  children: ReactNode
}

export function MotorcycleProvider({ children }: MotorcycleProviderProps) {
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

  const { data: motorcycles = [], isLoading, error, refetch } = useMotorcyclesQuery(models, branches)
  const createMutation = useCreateMotorcycleMutation()
  const updateMutation = useUpdateMotorcycleMutation()
  const deleteMutation = useDeleteMotorcycleMutation()

  const addMotorcycle = async (motorcycle: Motorcycle): Promise<void> => {
    try {
      await createMutation.mutateAsync(motorcycle)

      // Send notification for new motorcycle
      await notifyNewMotorcycle(motorcycle.modelName, motorcycle.plate, motorcycle.id)

      // Check if maintenance reminder is needed
      await scheduleMaintenanceReminder(motorcycle.id, motorcycle.modelName, motorcycle.plate, motorcycle.mileage)
    } catch (error) {
      console.error("Error adding motorcycle:", error)
      throw error
    }
  }

  const updateMotorcycle = async (updatedMotorcycle: Motorcycle): Promise<void> => {
    try {
      const oldMotorcycle = motorcycles.find((m) => m.id === updatedMotorcycle.id)

      await updateMutation.mutateAsync(updatedMotorcycle)

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
    } catch (error) {
      console.error("Error updating motorcycle:", error)
      throw error
    }
  }

  const deleteMotorcycle = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(Number(id))
    } catch (error) {
      console.error("Error deleting motorcycle:", error)
      throw error
    }
  }

  const handleRefetch = async (): Promise<void> => {
    await refetch()
  }

  return (
    <MotorcycleContext.Provider
      value={{
        motorcycles,
        models,
        branches,
        isLoading,
        error: error as Error | null,
        addMotorcycle,
        updateMotorcycle,
        deleteMotorcycle,
        refetch: handleRefetch,
      }}
    >
      {children}
    </MotorcycleContext.Provider>
  )
}

export function useMotorcycles(): MotorcycleContextType {
  return useContext(MotorcycleContext)
}
