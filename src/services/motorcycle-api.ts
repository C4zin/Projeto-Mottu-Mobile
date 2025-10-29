import { api } from "../config/api"
import type { ApiMotorcycle, ApiMotorcycleCreate, ApiMotorcycleUpdate, Motorcycle, MotorcycleStatus } from "../types"

// Helper function to map API status to app status
const mapApiStatusToApp = (apiStatus: string): MotorcycleStatus => {
  switch (apiStatus) {
    case "DISPONIVEL":
      return "Disponível"
    case "EM_USO":
      return "Em Uso"
    case "MANUTENCAO":
      return "Manutenção"
    case "RESERVADA":
      return "Reservada"
    default:
      return "Disponível"
  }
}

// Helper function to map app status to API status
const mapAppStatusToApi = (appStatus: MotorcycleStatus): string => {
  switch (appStatus) {
    case "Disponível":
      return "DISPONIVEL"
    case "Em Uso":
      return "EM_USO"
    case "Manutenção":
      return "MANUTENCAO"
    case "Reservada":
      return "RESERVADA"
    default:
      return "DISPONIVEL"
  }
}

// Helper function to map API motorcycle to app motorcycle
const mapApiToApp = (apiMoto: ApiMotorcycle, modelName: string, branchName: string): Motorcycle => {
  return {
    id: String(apiMoto.id),
    modelId: apiMoto.idModelo,
    modelName,
    branchId: apiMoto.idFilial,
    branchName,
    plate: apiMoto.placa,
    status: mapApiStatusToApp(apiMoto.status),
    mileage: apiMoto.kmRodado,
    position: { row: "A", spot: "1" }, // Default position since API doesn't have this
    createdAt: new Date().toISOString(), // Default since API doesn't have this
  }
}

// Helper function to map app motorcycle to API format
const mapAppToApi = (motorcycle: Motorcycle): ApiMotorcycleCreate => {
  return {
    idModelo: motorcycle.modelId,
    idFilial: motorcycle.branchId,
    placa: motorcycle.plate,
    status: mapAppStatusToApi(motorcycle.status) as any,
    kmRodado: motorcycle.mileage,
  }
}

export const motorcycleApi = {
  // GET /api/motos - List all motorcycles
  getAll: async (): Promise<ApiMotorcycle[]> => {
    const response = await api.get<ApiMotorcycle[]>("/api/motos")
    return response.data
  },

  // GET /api/motos/:id - Get motorcycle by ID
  getById: async (id: number): Promise<ApiMotorcycle> => {
    const response = await api.get<ApiMotorcycle>(`/api/motos/${id}`)
    return response.data
  },

  create: async (motorcycle: ApiMotorcycleCreate): Promise<ApiMotorcycle> => {
    console.log("[v0] Creating motorcycle with payload:", JSON.stringify(motorcycle, null, 2))
    const response = await api.post<ApiMotorcycle>("/api/motos", motorcycle)
    console.log("[v0] API response:", JSON.stringify(response.data, null, 2))
    return response.data
  },

  update: async (id: number, motorcycle: ApiMotorcycleUpdate): Promise<ApiMotorcycle> => {
    const payload = { ...motorcycle, id }
    console.log("[v0] Updating motorcycle ID", id, "with payload:", JSON.stringify(payload, null, 2))
    const response = await api.put<ApiMotorcycle>(`/api/motos/${id}`, payload)
    console.log("[v0] Update response:", JSON.stringify(response.data, null, 2))
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    console.log("[v0] Deleting motorcycle with ID:", id)
    await api.delete(`/api/motos/${id}`)
    console.log("[v0] Successfully deleted motorcycle:", id)
  },
}

// Export helper functions for use in other parts of the app
export { mapApiToApp, mapAppToApi, mapApiStatusToApp, mapAppStatusToApi }
