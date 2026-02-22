export type EventType =
  | "PALESTRA"
  | "MESA_REDONDA"
  | "SHOW"
  | "TEATRO"
  | "CURSO"
  | "FEIRA"
  | "FESTIVAL"
  | "OUTRO"

export type SaleStatus = "EM_ABERTO" | "PAGO" | "CANCELADO" | "ESTORNADO"

export type EnumUserType = "CUSTOMER" | "ENTERPRISE" | "ADMIN"

export interface EventDTO {
  description: string
  type: EventType
  date: string
  startSales: string
  endSales: string
  price: number
}

export interface SaleDTO {
  userId: string
  eventId: string
  saleStatus: SaleStatus
}

export interface UserDTO {
  id?: string
  name: string
  email: string
  password: string
  city: string
  type?: EnumUserType
}

export interface Event {
  id: string
  description: string
  type: EventType
  date: string
  startSales: string
  endSales: string
  price: number
  createdAt?: string
  updatedAt?: string
  sales?: Sale[]
}

export interface Sale {
  id: string
  userId: string
  saleDate?: string
  saleStatus: SaleStatus
  createdAt?: string
  updatedAt?: string
  event?: Event
}

export interface User {
  id: string
  name: string
  email: string
  password?: string
  city: string
  type?: EnumUserType
  createdAt?: string
  updatedAt?: string
}
