import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import type { Event, EventType} from "@/types/api"
import { createSale } from "@/services/sales"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { Book, HelpCircle, PartyPopper, Store, Theater, UsersRound } from "lucide-react"


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

function switchEventIcon(eventType: EventType) {
    switch (eventType) {
        case "PALESTRA":
            return <Book className="size-4 text-muted-foreground" />
        case "MESA_REDONDA":
            return <UsersRound className="size-4 text-muted-foreground" />
        case "SHOW":
            return <Theater className="size-4 text-muted-foreground" />
        case "TEATRO":
            return <Theater className="size-4 text-muted-foreground" />
        case "CURSO":
            return <Book className="size-4 text-muted-foreground" />
        case "FEIRA":
            return <Store className="size-4 text-muted-foreground" />
        case "FESTIVAL":
            return <PartyPopper className="size-4 text-muted-foreground" />
        case "OUTRO":
            return <HelpCircle className="size-4 text-muted-foreground" />
        default:
            return <HelpCircle className="size-4 text-muted-foreground" />
    }
}

export default function EventCard({ event }: { event: Event }) {
    const { user } = useAuth()

    async function handleBuyEvent(eventId: string) {
        if (!user) {
            toast.error("Usuário não autenticado.")
            return
        }
        try {
        await createSale({
            userId: user.id,
                eventId: eventId,
                saleStatus: "EM_ABERTO",
            })
            toast.success("Ingresso comprado com sucesso.")
        } catch (error) {
            toast.error("Erro ao comprar ingresso.")
            console.error(error)
        }
    }

  return (
    <Card>
      <CardHeader className="border-b mb-5">
        <CardTitle className="text-base flex items-center gap-2"> 
          {switchEventIcon(event.type)}
          {event.description} 
        <Badge variant="outline">{event.type.replace("_", " ")}</Badge>
        </CardTitle>
        <CardDescription>{formatDateTime(event.date)} - R${formatCurrency(event.price)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Início das vendas: {formatDateTime(event.startSales)}</p>
        <p>Fim das vendas: {formatDateTime(event.endSales)}</p>

        <Button variant="outline" size="sm" onClick={() => handleBuyEvent(event.id)}>Comprar</Button>
      </CardContent>

    </Card>
  )
}
