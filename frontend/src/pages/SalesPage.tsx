import { type FormEvent, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Trash2, Pencil, Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createSale, deleteSale, getSales, updateSaleStatus } from "@/services/sales"
import { getEvents } from "@/services/events"
import { getUsers } from "@/services/users"
import type { Event, Sale, SaleDTO, SaleStatus, User } from "@/types/api"
import { Badge } from "@/components/ui/badge"

const SALE_STATUS_OPTIONS: SaleStatus[] = [
    "EM_ABERTO",
    "PAGO",
    "CANCELADO",
    "ESTORNADO",
]

const INITIAL_SALE: SaleDTO = {
    userId: "",
    eventId: "",
    saleStatus: "EM_ABERTO",
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

export default function SalesPage() {
    const [sales, setSales] = useState<Sale[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saleForm, setSaleForm] = useState<SaleDTO>(INITIAL_SALE)
    const [statusFilter, setStatusFilter] = useState<SaleStatus | "all">("all")
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
    const [statusToUpdate, setStatusToUpdate] = useState<SaleStatus>("EM_ABERTO")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const filteredSales = useMemo(() => {
        if (statusFilter === "all") return sales
        return sales.filter((sale) => sale.saleStatus === statusFilter)
    }, [sales, statusFilter])

    const canSubmit = useMemo(() => {
        return !!(saleForm.userId && saleForm.eventId && saleForm.saleStatus)
    }, [saleForm])

    async function loadData() {
        try {
            setIsLoading(true)
            const [salesData, usersData, eventsData] = await Promise.all([
                getSales(),
                getUsers(),
                getEvents(),
            ])
            setSales(salesData)
            setUsers(usersData)
            setEvents(eventsData)
        } catch (error) {
            toast.error("Não foi possível carregar os dados de vendas.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    async function handleCreateSale(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!canSubmit) return

        setIsSaving(true)
        try {
            await createSale(saleForm)
            toast.success("Venda cadastrada com sucesso.")
            setSaleForm(INITIAL_SALE)
            setIsCreateModalOpen(false)
            await loadData()
        } catch (error) {
            toast.error("Não foi possível cadastrar a venda.")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleUpdateStatus() {
        if (!selectedSale || !selectedSale.event?.id) {
            toast.error("Dados da venda incompletos.")
            return
        }

        try {
            setIsSaving(true)
            const payload: SaleDTO = {
                userId: selectedSale.userId,
                eventId: selectedSale.event.id,
                saleStatus: statusToUpdate,
            }
            await updateSaleStatus(selectedSale.id, payload)
            toast.success("Status atualizado com sucesso.")
            setSelectedSale(null)
            await loadData()
        } catch (error) {
            toast.error("Não foi possível atualizar o status.")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDeleteSale(id: string) {
        try {
            await deleteSale(id)
            toast.success("Venda deletada com sucesso.")
            await loadData()
        } catch (error) {
            toast.error("Não foi possível deletar a venda.")
            console.error(error)
        }
    }

    const userById = useMemo(() => {
        return users.reduce<Record<string, User>>((acc, user) => {
            acc[user.id] = user
            return acc
        }, {})
    }, [users])

    const getStatusStyle = (status: SaleStatus) => {
        switch (status) {
            case "PAGO": return "bg-emerald-100 text-emerald-700 border-emerald-200"
            case "EM_ABERTO": return "bg-amber-100 text-amber-700 border-amber-200"
            case "CANCELADO": return "bg-red-100 text-red-700 border-red-200"
            default: return "bg-slate-100 text-slate-700 border-slate-200"
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Cabeçalho da Página */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Vendas</h2>
                    <p className="text-slate-500">Acompanhe e gerencie as transações financeiras dos eventos.</p>
                </div>

                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm gap-2 rounded-xl px-5">
                            <Plus className="size-4" />
                            Nova Venda
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleCreateSale}>
                            <DialogHeader>
                                <DialogTitle>Registrar Venda</DialogTitle>
                                <DialogDescription>
                                    Selecione o usuário e o evento para criar um novo registro.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold">Usuário</label>
                                    <Select value={saleForm.userId} onValueChange={(v) => setSaleForm(p => ({...p, userId: v}))}>
                                        <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                                        <SelectContent>
                                            {users.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold">Evento</label>
                                    <Select value={saleForm.eventId} onValueChange={(v) => setSaleForm(p => ({...p, eventId: v}))}>
                                        <SelectTrigger><SelectValue placeholder="Selecione o evento" /></SelectTrigger>
                                        <SelectContent>
                                            {events.map(e => <SelectItem key={e.id} value={e.id}>{e.description}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full bg-indigo-600" disabled={!canSubmit || isSaving}>
                                    {isSaving ? "Processando..." : "Confirmar Venda"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </header>

            {/* Área de Filtros */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-slate-100 p-2 rounded-lg"><Filter className="size-4 text-slate-500" /></div>
                    <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as SaleStatus | "all")}>
                        <SelectTrigger className="w-full md:w-[200px] border-none bg-slate-50 font-medium">
                            <SelectValue placeholder="Filtrar Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os status</SelectItem>
                            {SALE_STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm font-medium text-slate-400">
                    Mostrando {filteredSales.length} transações
                </div>
            </div>

            {/* Tabela de Vendas */}
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow>
                                <TableHead className="py-5 px-6 font-semibold text-slate-700">Evento</TableHead>
                                <TableHead className="font-semibold text-slate-700">Comprador</TableHead>
                                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-center">Data</TableHead>
                                <TableHead className="text-right px-6 font-semibold text-slate-700">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSales.map((sale) => {
                                const user = userById[sale.userId]
                                return (
                                    <TableRow key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="px-6 font-bold text-slate-900">
                                            {sale.event?.description ?? "Evento Indisponível"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">{user?.name}</span>
                                                <span className="text-xs text-slate-400">{user?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`rounded-lg px-2.5 py-0.5 border ${getStatusStyle(sale.saleStatus)}`}>
                                                {sale.saleStatus.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-slate-500 text-sm">
                                            {formatDateTime(sale.saleDate)}
                                        </TableCell>
                                        <TableCell className="px-6">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                                                        onClick={() => { setSelectedSale(sale); setStatusToUpdate(sale.saleStatus) }}>
                                                    <Pencil className="size-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400"
                                                        onClick={() => handleDeleteSale(sale.id)}>
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {!isLoading && filteredSales.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Search className="size-10 opacity-20" />
                                            <p>Nenhuma venda encontrada para este filtro.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal de Edição de Status */}
            <Dialog open={Boolean(selectedSale)} onOpenChange={() => setSelectedSale(null)}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Atualizar Status</DialogTitle>
                        <DialogDescription>Mude o estado atual da transação selecionada.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Select value={statusToUpdate} onValueChange={(v) => setStatusToUpdate(v as SaleStatus)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o novo status" />
                            </SelectTrigger>
                            <SelectContent>
                                {SALE_STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedSale(null)} className="rounded-xl">Cancelar</Button>
                        <Button onClick={handleUpdateStatus} disabled={isSaving} className="bg-indigo-600 rounded-xl">
                            {isSaving ? "Atualizando..." : "Salvar Alteração"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}