import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getEvents } from "@/services/events"
import type { Event} from "@/types/api"
import EventCard from "@/components/EventCard"
import { Calendar } from "lucide-react"


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadEvents() {
    try {
      setIsLoading(true)
      const data = await getEvents()
      setEvents(data)
    } catch (error) {
      toast.error("Não foi possível carregar os eventos.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])


  return (
    <div className="flex flex-col gap-8">
      <Card>
      <CardHeader className="border-b mb-5">
        <CardTitle className="text-base flex items-center gap-2"> 
            <Calendar className="size-4 text-muted-foreground" /> 
            Eventos disponíveis
          </CardTitle>
          <CardDescription>
            {isLoading
              ? "Carregando eventos..."
              : `${events.length} evento(s) encontrado(s).`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {!isLoading && events.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  Nenhum evento disponível ainda.
                </div>
              ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
