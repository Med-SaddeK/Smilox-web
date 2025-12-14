"use client";

import { useState, useEffect } from "react";
import { useLocations, Location } from "@/hooks/useLocations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Plus, Trash } from "lucide-react";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { locations, saveLocation, deleteLocation } = useLocations();
    const [editingLoc, setEditingLoc] = useState<Location | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Hardcoded simple password as requested, or env
    const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "smilox2025";

    useEffect(() => {
        // Check session
        if (sessionStorage.getItem("admin_auth") === "true") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
            toast.success("Connexion réussie");
        } else {
            toast.error("Mot de passe incorrect");
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newLoc: Location = {
            id: editingLoc?.id || `loc-${Date.now()}`,
            name: formData.get("name") as string,
            city: formData.get("city") as string,
            address: formData.get("address") as string,
            lat: parseFloat(formData.get("lat") as string),
            lng: parseFloat(formData.get("lng") as string),
            hours: formData.get("hours") as string,
            status: formData.get("status") as string,
            features: (formData.get("features") as string).split(",").map(s => s.trim()),
            lastServiceDate: new Date().toISOString().split("T")[0]
        };

        saveLocation(newLoc);
        setIsDialogOpen(false);
        setEditingLoc(null);
        toast.success("Emplacement sauvegardé");
    };

    const openNew = () => {
        setEditingLoc(null);
        setIsDialogOpen(true);
    };

    const openEdit = (loc: Location) => {
        setEditingLoc(loc);
        setIsDialogOpen(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto h-[80vh] flex items-center justify-center">
                <form onSubmit={handleLogin} className="glass p-8 rounded-2xl w-full max-w-md space-y-4">
                    <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
                    <Input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="bg-white/5 text-white"
                    />
                    <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">Entrer</Button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Gestion des Emplacements</h1>
                <Button onClick={openNew} className="bg-green-500 hover:bg-green-600 text-white">
                    <Plus className="mr-2 w-4 h-4" /> Ajouter
                </Button>
            </div>

            <div className="glass rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-white">Nom</TableHead>
                            <TableHead className="text-white">Ville</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-right text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map(loc => (
                            <TableRow key={loc.id} className="border-white/10 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{loc.name}</TableCell>
                                <TableCell className="text-white/70">{loc.city}</TableCell>
                                <TableCell className="text-white/70">{loc.status}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="icon" variant="ghost" className="text-white hover:text-cyan-400" onClick={() => openEdit(loc)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => deleteLocation(loc.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0f172a] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>{editingLoc ? "Modifier" : "Ajouter"} un emplacement</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 mt-4">
                        <Input name="name" defaultValue={editingLoc?.name} placeholder="Nom" className="bg-white/5" required />
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="city" defaultValue={editingLoc?.city} placeholder="Ville" className="bg-white/5" required />
                            <Input name="address" defaultValue={editingLoc?.address} placeholder="Adresse" className="bg-white/5" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="lat" defaultValue={editingLoc?.lat} placeholder="Latitude" type="number" step="any" className="bg-white/5" required />
                            <Input name="lng" defaultValue={editingLoc?.lng} placeholder="Longitude" type="number" step="any" className="bg-white/5" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="hours" defaultValue={editingLoc?.hours || "24/7"} placeholder="Horaires" className="bg-white/5" />
                            <Input name="status" defaultValue={editingLoc?.status || "active"} placeholder="Status (active/maintenance)" className="bg-white/5" />
                        </div>
                        <Input name="features" defaultValue={editingLoc?.features?.join(", ")} placeholder="Services (séparés par virgule)" className="bg-white/5" />

                        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Sauvegarder</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
