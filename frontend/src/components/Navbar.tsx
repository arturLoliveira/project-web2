import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/contexts/AuthContext"
import {
    Ticket,
    Calendar,
    Users,
    CircleDollarSign,
    LogOut,
    LayoutDashboard // Importado para o link da Dashboard
} from "lucide-react"

const links = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Eventos", to: "/admin/events", icon: Calendar },
    { label: "Vendas", to: "/admin/sales", icon: CircleDollarSign },
    { label: "Usuários", to: "/admin/users", icon: Users },
]

export default function Sidebar() {
    const { logout } = useAuth()

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white flex flex-col p-6 z-50">
            <div className="mb-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">
                    Vendas de ingresso
                </span>
                <h1 className="text-lg font-bold flex items-center gap-2 mt-1 font-sans">
                    <Ticket className="size-5 text-indigo-600" />
                    Artur Sales
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === "/admin"} // Garante que o dashboard só fique ativo na rota exata
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all font-sans ${
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }`
                        }
                    >
                        <link.icon className="size-4" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="pt-6 border-t">
                <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-sans"
                >
                    <LogOut className="size-4" />
                    Sair da conta
                </Button>
            </div>
        </aside>
    )
}