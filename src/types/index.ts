export type MotorcycleStatus = "Disponível" | "Em Uso" | "Manutenção" | "Reservada"

export interface MotorcyclePosition {
  row: string
  spot: string
}

export interface Model {
  id: number
  name: string
}

export interface Branch {
  id: number
  name: string
}

export interface Motorcycle {
  id: string
  modelId: number
  modelName: string
  branchId: number
  branchName: string
  plate: string
  status: MotorcycleStatus
  mileage: number
  position: MotorcyclePosition
  notes?: string
  createdAt: string
  year?: string
  color?: string
}

export interface ApiMotorcycle {
  id: number
  idModelo: number
  idFilial: number
  placa: string
  status: "DISPONIVEL" | "EM_USO" | "MANUTENCAO" | "RESERVADA"
  kmRodado: number
}

export interface ApiMotorcycleCreate {
  idModelo: number
  idFilial: number
  placa: string
  status: "DISPONIVEL" | "EM_USO" | "MANUTENCAO" | "RESERVADA"
  kmRodado: number
}

export interface ApiMotorcycleUpdate {
  id: number
  idModelo: number
  idFilial: number
  placa: string
  status: "DISPONIVEL" | "EM_USO" | "MANUTENCAO" | "RESERVADA"
  kmRodado: number
}
