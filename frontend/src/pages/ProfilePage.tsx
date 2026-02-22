import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUserById } from "@/services/users"
import { useAuth } from "@/contexts/AuthContext"
import { updateSaleStatus, getSalesByUserId } from "@/services/sales"
import type { Sale, SaleStatus, User } from "@/types/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TicketIcon, User as UserIcon } from "lucide-react"


export default function ProfilePage() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<User | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [isLoading, setIsLoading] = useState(true)


  async function loadData() {
    try {
      setIsLoading(true)
      const [userData, salesData] = await Promise.all([
        getUserById(user?.id ?? ""),
        getSalesByUserId(user?.id ?? ""),
      ])
      setUserData(userData)
      setSales(salesData)
    } catch (error) {
      toast.error("Não foi possível carregar os dados do usuário.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateSaleStatus(saleId: string, status: SaleStatus) {
    try {
      if (!user?.id) {
        toast.error("Usuário não encontrado.")
        return
      }
      await updateSaleStatus(saleId, {
        userId: user?.id ?? "",
        eventId: saleId,
        saleStatus: status,
      })
      toast.success("Status atualizado com sucesso.")
      await loadData()
    } catch (error) {
      toast.error("Não foi possível atualizar o status.")
      console.error(error)
    }
  }

  async function handleCancelSale(saleId: string) {
    try {
      if (!user?.id) {
        toast.error("Usuário não encontrado.")
        return
      }
      await updateSaleStatus(saleId, {
        userId: user?.id ?? "",
        eventId: saleId,
        saleStatus: "ESTORNADO",
      })
      toast.success("Compra estornada com sucesso.")
      await loadData()
    } catch (error) {
      toast.error("Não foi possível estornar a compra.")
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="flex flex-col gap-8">
        <Card>
            <CardHeader className="border-b mb-5">
                <CardTitle className="text-base flex items-center gap-2">
                    <UserIcon className="size-4 text-muted-foreground" />
                    Meu Perfil
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <p>Nome: {userData?.name}</p>
                    <p>Email: {userData?.email}</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="border-b mb-5">
                <CardTitle className="text-base flex items-center gap-2">
                    <TicketIcon className="size-4 text-muted-foreground" /> 
                    Minhas Compras
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Evento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data da compra</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>{sale.event?.description ?? sale.event?.id ?? "—"}</TableCell>
                                <TableCell>{sale.saleStatus}</TableCell>
                                <TableCell>{sale.saleDate}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleUpdateSaleStatus(sale.id, sale.saleStatus === "EM_ABERTO" ? "PAGO" : "EM_ABERTO")}>
                                            {sale.saleStatus === "EM_ABERTO" ? "Pagar" : "Cancelar"}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleCancelSale(sale.id)}>
                                            Cancelar Compra
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    
    </div>
  )
}
