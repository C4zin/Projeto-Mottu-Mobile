import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { motorcycleApi, mapApiToApp, mapAppToApi } from "../services/motorcycle-api"
import type { Motorcycle, Model, Branch } from "../types"


export const motorcycleKeys = {
  all: ["motorcycles"] as const,
  lists: () => [...motorcycleKeys.all, "list"] as const,
  list: (filters?: any) => [...motorcycleKeys.lists(), filters] as const,
  details: () => [...motorcycleKeys.all, "detail"] as const,
  detail: (id: number) => [...motorcycleKeys.details(), id] as const,
}


export function useMotorcyclesQuery(models: Model[], branches: Branch[]) {
  return useQuery({
    queryKey: motorcycleKeys.lists(),
    queryFn: async () => {
      const apiMotorcycles = await motorcycleApi.getAll()

      
      return apiMotorcycles.map((apiMoto) => {
        const model = models.find((m) => m.id === apiMoto.idModelo)
        const branch = branches.find((b) => b.id === apiMoto.idFilial)
        return mapApiToApp(apiMoto, model?.name || "Modelo Desconhecido", branch?.name || "Filial Desconhecida")
      })
    },
    staleTime: 1000 * 60 * 5, 
  })
}


export function useMotorcycleQuery(id: number, models: Model[], branches: Branch[]) {
  return useQuery({
    queryKey: motorcycleKeys.detail(id),
    queryFn: async () => {
      const apiMoto = await motorcycleApi.getById(id)
      const model = models.find((m) => m.id === apiMoto.idModelo)
      const branch = branches.find((b) => b.id === apiMoto.idFilial)
      return mapApiToApp(apiMoto, model?.name || "Modelo Desconhecido", branch?.name || "Filial Desconhecida")
    },
    enabled: !!id,
  })
}


export function useCreateMotorcycleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (motorcycle: Motorcycle) => {
      console.log(" Motorcycle before mapping:", JSON.stringify(motorcycle, null, 2))
      const apiMotorcycle = mapAppToApi(motorcycle)
      console.log("Motorcycle after mapping:", JSON.stringify(apiMotorcycle, null, 2))
      return await motorcycleApi.create(apiMotorcycle)
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: motorcycleKeys.lists() })
    },
  })
}

export function useUpdateMotorcycleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (motorcycle: Motorcycle) => {
      const apiMotorcycle = mapAppToApi(motorcycle)
      return await motorcycleApi.update(Number(motorcycle.id), {
        ...apiMotorcycle,
        id: Number(motorcycle.id),
      })
    },
    onSuccess: (_, variables) => {
     
      queryClient.invalidateQueries({ queryKey: motorcycleKeys.lists() })
      queryClient.invalidateQueries({ queryKey: motorcycleKeys.detail(Number(variables.id)) })
    },
  })
}


export function useDeleteMotorcycleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await motorcycleApi.delete(id)
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: motorcycleKeys.lists() })
    },
  })
}
