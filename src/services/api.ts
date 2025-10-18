import axios from "axios"
import type { Motorcycle } from "../types"

const API_BASE_URL = "https://render-mobile.onrender.com/"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

interface MotoDTO {
  idMoto?: number
  idModelo: number
  idFilialDepartamento: number
  placa: string
  statusMoto: string
  kmRodado: number
}

interface FilialDepartamentoDTO {
  idFilialDepartamento: number
  nomeFilialDepartamento: string
}

const mapMotorcycleToDTO = (motorcycle: Motorcycle): MotoDTO => {
  return {
    idMoto: motorcycle.id ? Number.parseInt(motorcycle.id) : undefined,
    idModelo: motorcycle.modelId,
    idFilialDepartamento: motorcycle.branchId,
    placa: motorcycle.plate,
    statusMoto: motorcycle.status,
    kmRodado: motorcycle.mileage,
  }
}

const mapDTOToMotorcycle = (dto: MotoDTO, modelName?: string, branchName?: string): Motorcycle => {
  return {
    id: dto.idMoto?.toString() || "",
    modelId: dto.idModelo,
    modelName: modelName || `Modelo ${dto.idModelo}`,
    branchId: dto.idFilialDepartamento,
    branchName: branchName || `Filial ${dto.idFilialDepartamento}`,
    plate: dto.placa,
    status: dto.statusMoto as any,
    mileage: dto.kmRodado,
    position: { row: "A", spot: "1" },
    notes: "",
    createdAt: new Date().toISOString(),
  }
}

export const motorcycleApi = {
  getAll: async (): Promise<Motorcycle[]> => {
    try {
      const response = await api.get<MotoDTO[]>("/api/motos")
      const branches = await branchApi.getAll()
      const branchMap = new Map(branches.map((b) => [b.id, b.name]))

      return response.data.map((dto) => {
        const branchName = branchMap.get(dto.idFilialDepartamento) || `Filial ${dto.idFilialDepartamento}`
        return mapDTOToMotorcycle(dto, undefined, branchName)
      })
    } catch (error) {
      console.error("Error fetching motorcycles:", error)
      throw error
    }
  },

  getById: async (id: number): Promise<Motorcycle> => {
    try {
      const response = await api.get<MotoDTO>(`/api/motos/${id}`)
      return mapDTOToMotorcycle(response.data)
    } catch (error) {
      console.error("Error fetching motorcycle:", error)
      throw error
    }
  },

  create: async (motorcycle: Motorcycle): Promise<Motorcycle> => {
    try {
      const dto = mapMotorcycleToDTO(motorcycle)
      const response = await api.post<MotoDTO>("/api/motos", dto)
      return mapDTOToMotorcycle(response.data, motorcycle.modelName, motorcycle.branchName)
    } catch (error) {
      console.error("Error creating motorcycle:", error)
      throw error
    }
  },

  update: async (id: string, motorcycle: Motorcycle): Promise<Motorcycle> => {
    try {
      const dto = mapMotorcycleToDTO(motorcycle)
      const response = await api.put<MotoDTO>(`/api/motos/${id}`, dto)
      return mapDTOToMotorcycle(response.data, motorcycle.modelName, motorcycle.branchName)
    } catch (error) {
      console.error("Error updating motorcycle:", error)
      throw error
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const numericId = Number.parseInt(id)
      if (Number.isNaN(numericId)) {
        throw new Error(`Invalid motorcycle ID: ${id}`)
      }
      await api.delete(`/api/motos/${numericId}`)
    } catch (error) {
      console.error("Error deleting motorcycle:", error)
      throw error
    }
  },
}

export const branchApi = {
  getAll: async (): Promise<Array<{ id: number; name: string }>> => {
    try {
      const response = await api.get<FilialDepartamentoDTO[]>("/api/filiais")
      return response.data.map((dto) => ({
        id: dto.idFilialDepartamento,
        name: dto.nomeFilialDepartamento,
      }))
    } catch (error) {
      console.error("Error fetching branches:", error)
      throw error
    }
  },

  getById: async (id: number): Promise<{ id: number; name: string }> => {
    try {
      const response = await api.get<FilialDepartamentoDTO>(`/api/filiais/${id}`)
      return {
        id: response.data.idFilialDepartamento,
        name: response.data.nomeFilialDepartamento,
      }
    } catch (error) {
      console.error("Error fetching branch:", error)
      throw error
    }
  },

  create: async (name: string): Promise<{ id: number; name: string }> => {
    try {
      const response = await api.post<FilialDepartamentoDTO>("/api/filiais", {
        nomeFilialDepartamento: name,
      })
      return {
        id: response.data.idFilialDepartamento,
        name: response.data.nomeFilialDepartamento,
      }
    } catch (error) {
      console.error("Error creating branch:", error)
      throw error
    }
  },

  update: async (id: number, name: string): Promise<{ id: number; name: string }> => {
    try {
      const response = await api.put<FilialDepartamentoDTO>(`/api/filiais/${id}`, {
        idFilialDepartamento: id,
        nomeFilialDepartamento: name,
      })
      return {
        id: response.data.idFilialDepartamento,
        name: response.data.nomeFilialDepartamento,
      }
    } catch (error) {
      console.error("Error updating branch:", error)
      throw error
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/filiais/${id}`)
    } catch (error) {
      console.error("Error deleting branch:", error)
      throw error
    }
  },
}

export default api
