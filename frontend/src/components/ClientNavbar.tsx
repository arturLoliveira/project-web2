// Substituindo o ClientNavbar.tsx por um layout lateral
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Ticket, Calendar, User, LogOut } from "lucide-react"

export default function Sidebar() {
    const { logout } = useAuth()

    const links = [
        { label: "Eventos", to: "/client/events", icon: Calendar },
        { label: "Meu Perfil", to: "/client/profile", icon: User },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-slate-50/50 flex flex-col p-6 space-y-8">
            <div>
                <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-400">Sistema de Vendas</span>
                <h1 className="text-xl font-bold flex items-center gap-2 mt-1">
                    <Ticket className="size-5 text-indigo-600" />
                    Ingressos.io
                </h1>
            </div>

            <nav className="flex-1 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-white shadow-sm text-indigo-600 border border-slate-200"
                                    : "text-slate-500 hover:bg-slate-100"
                            }`
                        }
                    >
                        <link.icon className="size-4" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <Button variant="ghost" onClick={logout} className="justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl">
                <LogOut className="size-4" />
                Sair da conta
            </Button>
        </aside>
    )
}