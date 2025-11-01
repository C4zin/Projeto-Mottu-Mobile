import { api } from "../config/api"
import type { ApiMotorcycle, ApiMotorcycleCreate, ApiMotorcycleUpdate, Motorcycle, MotorcycleStatus } from "../types"


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
    position: { row: "A", spot: "1" }, 
    createdAt: new Date().toISOString(), 
  }
}


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

  getAll: async (): Promise<ApiMotorcycle[]> => {
    const response = await api.get<ApiMotorcycle[]>("/api/motos")
    return response.data
  },


  getById: async (id: number): Promise<ApiMotorcycle> => {
    const response = await api.get<ApiMotorcycle>(`/api/motos/${id}`)
    return response.data
  },

  create: async (motorcycle: ApiMotorcycleCreate): Promise<ApiMotorcycle> => {
    console.log(" Creating motorcycle with payload:", JSON.stringify(motorcycle, null, 2))
    const response = await api.post<ApiMotorcycle>("/api/motos", motorcycle)
    console.log(" API response:", JSON.stringify(response.data, null, 2))
    return response.data
  },

  update: async (id: number, motorcycle: ApiMotorcycleUpdate): Promise<ApiMotorcycle> => {
    const payload = { ...motorcycle, id }
    console.log(" Updating motorcycle ID", id, "with payload:", JSON.stringify(payload, null, 2))
    const response = await api.put<ApiMotorcycle>(`/api/motos/${id}`, payload)
    console.log(" Update response:", JSON.stringify(response.data, null, 2))
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    console.log(" Deleting motorcycle with ID:", id)
    await api.delete(`/api/motos/${id}`)
    console.log(" Successfully deleted motorcycle:", id)
  },
}


export { mapApiToApp, mapAppToApi, mapApiStatusToApp, mapAppStatusToApi }
