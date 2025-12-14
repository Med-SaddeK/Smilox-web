"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocations } from "@/hooks/useLocations";
import { LocationCard } from "@/components/locations/LocationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map as MapIcon, List } from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamically import map with no SSR
const LocationsMap = dynamic(() => import("@/components/locations/LocationsMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-white/5 animate-pulse rounded-xl flex items-center justify-center text-white/20">Chargement de la carte...</div>
});

export default function LocationsPage() {
    const { t } = useLanguage();
    const { locations, isLoaded } = useLocations();
    const [view, setView] = useState<"list" | "map">("list");
    const [search, setSearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("All");

    const cities = useMemo(() => {
        if (!isLoaded) return [];
        const defaultCity = "All"; // can't easily translate key here for value logic
        const unique = Array.from(new Set(locations.map(l => l.city)));
        return [defaultCity, ...unique];
    }, [locations, isLoaded]);

    const filteredLocations = useMemo(() => {
        if (!isLoaded) return [];
        return locations.filter(loc => {
            const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase()) ||
                loc.address.toLowerCase().includes(search.toLowerCase());
            const matchCity = selectedCity === "All" || loc.city === selectedCity;
            return matchSearch && matchCity;
        });
    }, [search, selectedCity, locations, isLoaded]);

    // Center map on first result or default Morocco
    const mapCenter: [number, number] = filteredLocations.length > 0
        ? [filteredLocations[0].lat, filteredLocations[0].lng]
        : [31.7917, -7.0926]; // Morocco center slightly adjusted

    const mapZoom = selectedCity === "All" ? 6 : 12;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{t.locations.title}</h1>
                    <p className="text-white/60">Trouvez la machine Smilox la plus proche de vous.</p>
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-lg md:hidden">
                    <Button
                        variant={view === "list" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setView("list")}
                    >
                        <List className="w-4 h-4 mr-2" /> Liste
                    </Button>
                    <Button
                        variant={view === "map" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setView("map")}
                    >
                        <MapIcon className="w-4 h-4 mr-2" /> Carte
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                        placeholder={t.locations.search_placeholder}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {cities.map(city => (
                        <Button
                            key={city}
                            variant="outline"
                            onClick={() => setSelectedCity(city)}
                            className={cn(
                                "border-white/10 whitespace-nowrap",
                                selectedCity === city ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/30" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {city === "All" ? t.locations.filter_all : city}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-250px)] min-h-[500px]">
                {/* List View */}
                <div className={cn(
                    "w-full lg:w-1/3 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10",
                    view === "map" ? "hidden lg:block" : "block"
                )}>
                    {filteredLocations.length === 0 ? (
                        <div className="text-center py-12 text-white/40">
                            Aucun emplacement trouvé.
                        </div>
                    ) : (
                        filteredLocations.map(loc => (
                            <LocationCard key={loc.id} location={loc} />
                        ))
                    )}
                </div>

                {/* Map View */}
                <div className={cn(
                    "flex-1 rounded-2xl overflow-hidden glass border-0",
                    view === "list" ? "hidden lg:block" : "block"
                )}>
                    <LocationsMap
                        locations={filteredLocations}
                        center={mapCenter}
                        zoom={mapZoom}
                    />
                </div>
            </div>
        </div>
    );
}
