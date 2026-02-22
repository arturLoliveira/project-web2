import api from "@/services/api"
import type { Event, EventDTO } from "@/types/api"

export async function getEvents(): Promise<Event[]> {
  const response = await api.get<Event[]>("/events")
  return response.data
}

export async function createEvent(payload: EventDTO): Promise<Event> {
  const response = await api.post<Event>("/events", payload)
  return response.data
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    await api.delete(`/events/${id}`)
  } catch (error) {
    console.error("Erro ao deletar evento", error)
    throw error
  }
}