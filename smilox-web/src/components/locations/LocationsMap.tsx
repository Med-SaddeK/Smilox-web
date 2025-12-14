"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

// Fix Leaflet default icon issue
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
}

interface MapProps {
    locations: Location[];
    center: [number, number];
    zoom: number;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function LocationsMap({ locations, center, zoom }: MapProps) {
    // Fix for window undefined during SSR
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-full w-full bg-white/5 animate-pulse rounded-xl" />;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%", borderRadius: "0.75rem", zIndex: 0 }}
            scrollWheelZoom={false}
        >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={icon}>
                    <Popup>
                        <div className="text-black p-1">
                            <h3 className="font-bold">{loc.name}</h3>
                            <p className="text-sm mb-2">{loc.address}</p>
                            <Button
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`, '_blank')}
                            >
                                Ouvrir Maps
                            </Button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
