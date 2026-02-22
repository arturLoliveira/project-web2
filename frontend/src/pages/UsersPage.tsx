import { type FormEvent, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Pencil, Trash2, Users, Plus, Filter, Search, ShieldCheck, UserCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { createUser, deleteUser, getUsers, updateUser } from "@/services/users"
import type { EnumUserType, User, UserDTO } from "@/types/api"
import { Input } from "@/components/ui/input"

const USER_TYPE_OPTIONS: EnumUserType[] = [
    "CUSTOMER",
    "ENTERPRISE",
    "ADMIN",
]

const INITIAL_USER: UserDTO = {
    name: "",
    email: "",
    password: "",
    city: "",
    type: "CUSTOMER",
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [userForm, setUserForm] = useState<UserDTO>(INITIAL_USER)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [typeFilter, setTypeFilter] = useState<EnumUserType | "all">("all")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const canSubmit = useMemo(() => {
        return (
            userForm.name.trim().length > 0 &&
            userForm.email.trim().length > 0 &&
            userForm.password.trim().length > 0 &&
            userForm.city.trim().length > 0
        )
    }, [userForm])

    const filteredUsers = useMemo(() => {
        if (typeFilter === "all") return users
        return users.filter((user) => user.type === typeFilter)
    }, [users, typeFilter])

    async function loadData() {
        try {
            setIsLoading(true)
            const usersData = await getUsers()
            setUsers(usersData)
        } catch (error) {
            toast.error("Não foi possível carregar os dados de usuários.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!canSubmit) return

        setIsSaving(true)
        try {
            await createUser(userForm)
            toast.success("Usuário cadastrado com sucesso.")
            setUserForm(INITIAL_USER)
            setIsCreateModalOpen(false)
            await loadData()
        } catch (error) {
            toast.error("Não foi possível cadastrar o usuário.")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDeleteUser(id: string) {
        try {
            await deleteUser(id)
            toast.success("Usuário deletado com sucesso.")
            await loadData()
        } catch (error) {
            toast.error("Não foi possível deletar o usuário.")
            console.error(error)
        }
    }

    async function handleUpdateUser() {
        if (!selectedUser) return
        setIsSaving(true)
        try {
            await updateUser(selectedUser.id, userForm)
            toast.success("Usuário atualizado com sucesso.")
            setSelectedUser(null)
            setUserForm(INITIAL_USER)
            await loadData()
        } catch (error) {
            toast.error("Não foi possível atualizar o usuário.")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const getTypeStyle = (type: EnumUserType) => {
        switch (type) {
            case "ADMIN": return "bg-purple-100 text-purple-700 border-purple-200"
            case "ENTERPRISE": return "bg-blue-100 text-blue-700 border-blue-200"
            default: return "bg-slate-100 text-slate-700 border-slate-200"
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Cabeçalho */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Usuários</h2>
                    <p className="text-slate-500 font-sans">Gerencie os acessos e permissões de clientes e parceiros.</p>
                </div>

                <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
                    setIsCreateModalOpen(open);
                    if(!open) setUserForm(INITIAL_USER);
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm gap-2 rounded-xl px-5 font-sans">
                            <Plus className="size-4" />
                            Novo Usuário
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleCreateUser}>
                            <DialogHeader>
                                <DialogTitle className="font-sans">Cadastrar Usuário</DialogTitle>
                                <DialogDescription className="font-sans">
                                    Preencha os dados abaixo para criar uma nova conta no sistema.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold font-sans">Nome</label>
                                        <Input placeholder="Nome completo" value={userForm.name} onChange={(e) => setUserForm(p => ({...p, name: e.target.value}))} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold font-sans">Email</label>
                                        <Input type="email" placeholder="email@exemplo.com" value={userForm.email} onChange={(e) => setUserForm(p => ({...p, email: e.target.value}))} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold font-sans">Senha</label>
                                        <Input type="password" placeholder="********" value={userForm.password} onChange={(e) => setUserForm(p => ({...p, password: e.target.value}))} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold font-sans">Cidade</label>
                                        <Input placeholder="Ex: Ouro Preto" value={userForm.city} onChange={(e) => setUserForm(p => ({...p, city: e.target.value}))} required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold font-sans">Tipo de Acesso</label>
                                    <Select value={userForm.type} onValueChange={(v) => setUserForm(p => ({...p, type: v as EnumUserType}))}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {USER_TYPE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o.replace("_", " ")}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full bg-indigo-600 font-sans" disabled={!canSubmit || isSaving}>
                                    {isSaving ? "Salvando..." : "Criar Usuário"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </header>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-slate-100 p-2 rounded-lg"><Filter className="size-4 text-slate-500" /></div>
                    <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as EnumUserType | "all")}>
                        <SelectTrigger className="w-full md:w-[200px] border-none bg-slate-50 font-medium font-sans">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os tipos</SelectItem>
                            {USER_TYPE_OPTIONS.map(t => <SelectItem key={t} value={t}>{t.replace("_", " ")}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm font-medium text-slate-400 font-sans">
                    {filteredUsers.length} usuários registrados
                </div>
            </div>

            {/* Tabela */}
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow>
                                <TableHead className="py-5 px-6 font-semibold text-slate-700 font-sans">Usuário</TableHead>
                                <TableHead className="font-semibold text-slate-700 font-sans">Cidade</TableHead>
                                <TableHead className="font-semibold text-slate-700 font-sans">Nível</TableHead>
                                <TableHead className="text-right px-6 font-semibold text-slate-700 font-sans">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 font-sans">{user.name}</span>
                                                <span className="text-xs text-slate-400 font-sans">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 text-sm font-sans">{user.city}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`rounded-lg px-2.5 py-0.5 border font-sans ${getTypeStyle(user.type as EnumUserType)}`}>
                                            {user.type?.replace("_", " ")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setUserForm({
                                                            name: user.name,
                                                            email: user.email,
                                                            city: user.city,
                                                            type: user.type as EnumUserType,
                                                            password: "" // Senha não retornada por segurança
                                                        });
                                                    }}>
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400"
                                                    onClick={() => handleDeleteUser(user.id)}>
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && filteredUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Search className="size-10 opacity-20" />
                                            <p className="font-sans">Nenhum usuário encontrado.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal de Edição */}
            <Dialog open={Boolean(selectedUser)} onOpenChange={() => {
                setSelectedUser(null);
                setUserForm(INITIAL_USER);
            }}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle className="font-sans">Editar Usuário</DialogTitle>
                        <DialogDescription className="font-sans">Altere as informações do perfil ou nível de acesso.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold font-sans">Nome</label>
                            <Input value={userForm.name} onChange={(e) => setUserForm(p => ({...p, name: e.target.value}))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold font-sans">Email</label>
                            <Input value={userForm.email} onChange={(e) => setUserForm(p => ({...p, email: e.target.value}))} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold font-sans">Tipo</label>
                            <Select value={userForm.type} onValueChange={(v) => setUserForm(p => ({...p, type: v as EnumUserType}))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {USER_TYPE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o.replace("_", " ")}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedUser(null)} className="rounded-xl font-sans">Cancelar</Button>
                        <Button onClick={handleUpdateUser} disabled={isSaving} className="bg-indigo-600 rounded-xl font-sans">
                            {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}