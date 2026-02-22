import { useEffect, useState, useMemo } from "react"
import {
    CircleDollarSign,
    Users,
    Calendar,
    TrendingUp,
    Ticket,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getSales } from "@/services/sales"
import { getEvents } from "@/services/events"
import { getUsers } from "@/services/users"
import type { Sale, Event, User } from "@/types/api"

export default function DashboardPage() {
    const [sales, setSales] = useState<Sale[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const [salesData, eventsData, usersData] = await Promise.all([
                    getSales(),
                    getEvents(),
                    getUsers()
                ])
                setSales(salesData)
                setEvents(eventsData)
                setUsers(usersData)
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    // Cálculos de métricas
    const stats = useMemo(() => {
        const totalRevenue = sales
            .filter(s => s.saleStatus === "PAGO")
            .reduce((acc, sale) => acc + (sale.event?.price || 0), 0)

        const paidSales = sales.filter(s => s.saleStatus === "PAGO").length
        const conversionRate = sales.length > 0
            ? ((paidSales / sales.length) * 100).toFixed(1)
            : 0

        return {
            totalRevenue,
            totalSales: sales.length,
            activeEvents: events.length,
            totalUsers: users.length,
            conversionRate
        }
    }, [sales, events, users])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Dashboard</h2>
                <p className="text-slate-500 font-sans">Bem-vindo de volta! Aqui está o resumo do seu sistema hoje.</p>
            </div>

            {/* Cards de Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Receita Total"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={<CircleDollarSign className="size-5 text-emerald-600" />}
                    trend="+12.5%"
                    isPositive={true}
                />
                <MetricCard
                    title="Ingressos Vendidos"
                    value={stats.totalSales.toString()}
                    icon={<Ticket className="size-5 text-indigo-600" />}
                    trend="+5.2%"
                    isPositive={true}
                />
                <MetricCard
                    title="Eventos Ativos"
                    value={stats.activeEvents.toString()}
                    icon={<Calendar className="size-5 text-orange-600" />}
                    trend="Estável"
                    isPositive={null}
                />
                <MetricCard
                    title="Taxa de Conversão"
                    value={`${stats.conversionRate}%`}
                    icon={<TrendingUp className="size-5 text-blue-600" />}
                    trend="-2.1%"
                    isPositive={false}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Lista de Vendas Recentes */}
                <Card className="lg:col-span-4 border-none shadow-sm rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-sans">Atividade Recente</CardTitle>
                        <CardDescription>Últimas 5 vendas registradas no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {sales.slice(0, 5).map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Users className="size-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{sale.event?.description}</p>
                                            <p className="text-xs text-slate-500">{sale.saleDate}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">{formatCurrency(sale.event?.price || 0)}</p>
                                        <p className={`text-[10px] font-bold uppercase tracking-tighter ${
                                            sale.saleStatus === "PAGO" ? "text-emerald-500" : "text-amber-500"
                                        }`}>
                                            {sale.saleStatus}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Resumo de Usuários */}
                <Card className="lg:col-span-3 border-none shadow-sm rounded-2xl bg-indigo-600 text-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-sans flex items-center gap-2">
                            <Users className="size-5" />
                            Comunidade
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <div className="text-6xl font-bold mb-2">{stats.totalUsers}</div>
                        <p className="text-indigo-100 opacity-80 uppercase tracking-widest text-xs font-bold">Usuários Cadastrados</p>
                        <div className="mt-8 grid grid-cols-2 w-full gap-4 text-center">
                            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                <p className="text-xs opacity-70">Empresas</p>
                                <p className="font-bold">{users.filter(u => u.type === "ENTERPRISE").length}</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                <p className="text-xs opacity-70">Clientes</p>
                                <p className="font-bold">{users.filter(u => u.type === "CUSTOMER").length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function MetricCard({ title, value, icon, trend, isPositive }: {
    title: string, value: string, icon: React.ReactNode, trend: string, isPositive: boolean | null
}) {
    return (
        <Card className="border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                    {title}
                </CardTitle>
                <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
                <div className="flex items-center gap-1">
                    {isPositive === true && <ArrowUpRight className="size-3 text-emerald-500" />}
                    {isPositive === false && <ArrowDownRight className="size-3 text-red-500" />}
                    <span className={`text-xs font-bold ${
                        isPositive === true ? "text-emerald-500" :
                            isPositive === false ? "text-red-500" : "text-slate-400"
                    }`}>
            {trend}
          </span>
                </div>
            </CardContent>
        </Card>
    )
}