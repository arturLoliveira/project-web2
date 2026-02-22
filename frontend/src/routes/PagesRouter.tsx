import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "@/routes/PrivateRoute"
import { AuthProvider } from "@/contexts/AuthContext"

import EventsPage from "@/pages/EventsPage"
import SalesPage from "@/pages/SalesPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage" // Importe a nova página
import Sidebar from "@/components/Navbar" // O seu componente Sidebar
import UsersPage from "@/pages/UsersPage"
import ClientNavbar from "@/components/ClientNavbar"
import ProfilePage from "@/pages/ProfilePage"

const AdminLayout = () => (
    <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        {/* pl-64 adiciona o espaço para a sidebar fixa */}
        <main className="flex-1 pl-64">
            <div className="mx-auto w-full max-w-7xl px-8 py-10">
                <Outlet />
            </div>
        </main>
    </div>
);

const ClientLayout = () => (
    <>
        <ClientNavbar />
        <main className="mx-auto w-full max-w-6xl px-6 py-8">
            <Outlet />
        </main>
    </>
);

export default function PagesRouter() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/admin" element={<PrivateRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<DashboardPage />} /> {/* Dashboard como página inicial */}
                        <Route path="events" element={<EventsPage />} />
                        <Route path="sales" element={<SalesPage />} />
                        <Route path="users" element={<UsersPage />} />
                    </Route>
                </Route>

                <Route path="/client" element={<PrivateRoute />}>
                    <Route element={<ClientLayout />}>
                        <Route index element={<Navigate to="/client/events" />} />
                        <Route path="events" element={<EventsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </AuthProvider>
    )
}