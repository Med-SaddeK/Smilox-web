"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationProps {
    id: string;
    name: string;
    city: string;
    address: string;
    hours: string;
    status: string;
    lat: number;
    lng: number;
}

export function LocationCard({ location }: { location: LocationProps }) {
    const { t } = useLanguage();

    const isActive = location.status === "active";

    return (
        <Card className="glass border-0 bg-white/5 text-white overflow-hidden group hover:bg-white/10 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge
                            variant="outline"
                            className={cn(
                                "mb-2 border-0",
                                isActive ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                            )}
                        >
                            {isActive ? t.locations.status_active : t.locations.status_maintenance}
                        </Badge>
                        <CardTitle className="text-xl font-semibold leading-none">{location.name}</CardTitle>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3 space-y-2">
                <p className="text-sm text-white/60 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5"><Navigation className="w-3 h-3" /></span>
                    {location.address}, {location.city}
                </p>
                <p className="text-sm text-white/60 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {location.hours}
                </p>
            </CardContent>
            <CardFooter>
                <Button
                    variant="secondary"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`, '_blank')}
                >
                    {t.locations.open_maps}
                </Button>
            </CardFooter>
        </Card>
    );
}
