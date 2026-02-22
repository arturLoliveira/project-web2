import { type FormEvent, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createEvent, deleteEvent, getEvents } from "@/services/events"
import type { Event, EventDTO, EventType } from "@/types/api"
import { Calendar, Trash2 } from "lucide-react"

const EVENT_TYPES: EventType[] = [
  "PALESTRA",
  "MESA_REDONDA",
  "SHOW",
  "TEATRO",
  "CURSO",
  "FEIRA",
  "FESTIVAL",
  "OUTRO",
]

const INITIAL_FORM: EventDTO = {
  description: "",
  type: "PALESTRA",
  date: "",
  startSales: "",
  endSales: "",
  price: 0,
}

function toLocalDateTime(value: string) {
  if (!value) return value
  return value.length === 16 ? `${value}:00` : value
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function formatDateTime(value?: string) {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<EventDTO>(INITIAL_FORM)

  const canSubmit = useMemo(() => {
    return (
      formData.description.trim().length > 0 &&
      formData.date &&
      formData.startSales &&
      formData.endSales &&
      formData.price > 0
    )
  }, [formData])

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return

    setIsSaving(true)
    try {
      const payload: EventDTO = {
        ...formData,
        date: toLocalDateTime(formData.date),
        startSales: toLocalDateTime(formData.startSales),
        endSales: toLocalDateTime(formData.endSales),
      }
      await createEvent(payload)
      toast.success("Evento cadastrado com sucesso.")
      setFormData(INITIAL_FORM)
      await loadEvents()
    } catch (error) {
      toast.error("Não foi possível cadastrar o evento.")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }


  async function handleDeleteEvent(id: string) {
    try {
      await deleteEvent(id)
      toast.success("Evento deletado com sucesso.")
      await loadEvents()
    } catch (error) {
      toast.error("Não foi possível deletar o evento.")
      console.error(error)
    }
  }

    return (
        <div className="pl-64 p-8 bg-slate-50 min-h-screen">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Explorar Eventos</h2>
                    <p className="text-slate-500">Gerencie e visualize todos os eventos disponíveis no sistema.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
                    + Novo Evento
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex justify-between items-start">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                                {event.type}
                            </Badge>
                            <div className="bg-white rounded-lg p-2 shadow-sm text-center min-w-[50px]">
                                <span className="block text-xs font-bold text-slate-400 uppercase">Preço</span>
                                <span className="text-indigo-600 font-bold">{formatCurrency(event.price)}</span>
                            </div>
                        </div>
                        <CardContent className="pt-4 space-y-4">
                            <div>
                                <CardTitle className="text-xl mb-1">{event.description}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="size-3" />
                                    {formatDateTime(event.date)}
                                </div>
                            </div>

                            <div className="pt-4 border-t flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendas até {formatDateTime(event.endSales)}</span>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                    <Trash2 className="size-4 text-red-400" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
