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
  notes: string
  createdAt: string
  year?: string 
  color?: string 
}

export interface MaintenanceRecord {
  id: string
  motorcycleId: string
  entryDate: string
  exitDate?: string
  description: string
}

export interface RentalRecord {
  id: string
  clientId: string
  motorcycleId: string
  pickupDate: string
  returnDate?: string
}

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Home: undefined
  RegisterMoto: undefined
  YardMap: undefined
  MotorcycleDetails: { id: string }
  Settings: undefined
}

export type AuthStackParamList = {
  Login: undefined
  RegisterUser: undefined
}
