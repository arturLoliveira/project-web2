import api from "@/services/api"
import type { Sale, SaleDTO, SaleStatus } from "@/types/api"

export async function getSales(): Promise<Sale[]> {
  const response = await api.get<Sale[]>("/sales")
  return response.data
}

export async function getSalesByUserId(userId: string): Promise<Sale[]> {
  const response = await api.get<Sale[]>(`/sales/user/${userId}`)
  return response.data
}

export async function createSale(payload: SaleDTO): Promise<Sale> {
  const response = await api.post<Sale>("/sales", payload)
  return response.data
}

export async function updateSaleStatus(
  id: string,
  payload: SaleDTO
): Promise<Sale> {
  const response = await api.put<Sale>(`/sales/${id}`, payload)
  return response.data
}

export function isTerminalSaleStatus(status: SaleStatus): boolean {
  return status === "CANCELADO" || status === "ESTORNADO"
}

export async function deleteSale(id: string): Promise<void> {
  try {
    await api.delete(`/sales/${id}`)
  } catch (error) {
    console.error("Erro ao deletar venda", error)
    throw error
  }
}