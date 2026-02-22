import api from "@/services/api"
import type { User, UserDTO } from "@/types/api"

export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users")
  return response.data
}

export async function getUserById(id: string): Promise<User | null> {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

export async function loginService(email: string): Promise<User | null> {
  try {
    const response = await api.get<User[]>("/users") 
    const users = response.data

    const foundUser = users.find(u => u.email === email)
    
    return foundUser || null
  } catch (error) {
    console.error("Erro no login", error)
    return null
  }
}

export async function createUser(payload: UserDTO): Promise<User> {
  try {
    const response = await api.post<User>("/users", payload)
    return response.data
  } catch (error) {
    console.error("Erro ao criar usuário", error)
    throw error
  }
}

export async function updateUser(id: string, payload: UserDTO): Promise<User> {
  const response = await api.put<User>(`/users/${id}`, payload)
  return response.data
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`)
  } catch (error) {
    console.error("Erro ao deletar usuário", error)
    throw error
  }
}