"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fr } from "@/i18n/fr";
import { en } from "@/i18n/en";

type Dictionary = typeof fr;
type Lang = "fr" | "en";

interface LanguageContextType {
    lang: Lang;
    t: Dictionary;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("fr");

    useEffect(() => {
        const saved = localStorage.getItem("smilox-lang") as Lang;
        if (saved && (saved === "fr" || saved === "en")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLangState(saved);
        }
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("smilox-lang", l);
    };

    const t = lang === "fr" ? fr : en;

    return (
        <LanguageContext.Provider value={{ lang, t, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
