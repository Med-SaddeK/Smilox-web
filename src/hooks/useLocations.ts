"use client";

import { useState, useEffect } from "react";
import baseLocations from "@/data/locations.json";

export interface Location {
    id: string;
    name: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    hours: string;
    status: string;
    features: string[];
    lastServiceDate: string;
}

export function useLocations() {
    const [locations, setLocations] = useState<Location[]>(baseLocations);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load overrides and new locations from LS
        const stored = localStorage.getItem("smilox-locations-custom");
        if (stored) {
            try {
                const customLocs: Location[] = JSON.parse(stored);

                // Merge strategy:
                // 1. Start with base
                // 2. If valid custom loc ID exists in base, replace it.
                // 3. If custom loc ID is new, add it.

                const merged = [...baseLocations];

                customLocs.forEach(custom => {
                    const index = merged.findIndex(l => l.id === custom.id);
                    if (index >= 0) {
                        merged[index] = custom;
                    } else {
                        merged.push(custom);
                    }
                });

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setLocations(merged);
            } catch (e) {
                console.error("Failed to parse locations from localStorage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const saveLocation = (loc: Location) => {
        const newList = [...locations];
        const index = newList.findIndex(l => l.id === loc.id);
        if (index >= 0) {
            newList[index] = loc;
        } else {
            newList.push(loc);
        }
        setLocations(newList);

        // Persist modifications/additions to LS
        // In a real app we would diff with base, but here we just save the full custom list or diffs.
        // Simplest approach: Identify which are custom or modified and save THEM.
        // Since we don't track "modified" bit easily, let's just save ALL that are different from base or new.

        // Actually, simpler: just get the current full custom list from LS, update it, and save.
        // But we need to know what to save.
        // Let's simplified: Save ONLY the ones that differ from base or are new.

        const overlays = newList.filter(l => {
            const base = baseLocations.find(b => b.id === l.id);
            if (!base) return true; // New
            return JSON.stringify(base) !== JSON.stringify(l); // Modified
        });

        localStorage.setItem("smilox-locations-custom", JSON.stringify(overlays));
    };

    const deleteLocation = (id: string) => {
        // We can't really delete from JSON, so we rely on status="deleted" or filtering.
        // For this vitrine, let's assume we filter out if we really wanted, but user didn't ask for soft delete.
        // We will just remove from our state If it was added custom. 
        // If it is in base, we can't delete it from FS. We could mark it hidden in LS.

        // Implementation: Remove from state, save "deleted_ids" or just allow verifying "overrides".
        // Let's keep it simple: We only support deleting NEW locations from LS.
        // Base locations are immutable for deletion in this simple logic unless we add "hidden" property.

        const baseExists = baseLocations.find(l => l.id === id);
        if (baseExists) {
            // Cannot delete base locs in this simple demo without 'hidden' flag logic
            alert("Cannot delete built-in demo locations in this version.");
            return;
        }

        const newList = locations.filter(l => l.id !== id);
        setLocations(newList);

        // Update LS
        const overlays = newList.filter(l => {
            const base = baseLocations.find(b => b.id === l.id);
            if (!base) return true;
            return JSON.stringify(base) !== JSON.stringify(l);
        });
        localStorage.setItem("smilox-locations-custom", JSON.stringify(overlays));
    };

    return { locations, isLoaded, saveLocation, deleteLocation };
}
