"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background blobs are in globals.css body, but we can add local effects */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 animate-in fade-in zoom-in duration-1000">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Next-Gen Vending
                </div>

                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 max-w-4xl mx-auto leading-tight">
                    {t.hero.title}
                </h1>

                <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="h-12 px-8 text-lg bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                        <Link href="/locations">
                            <MapPin className="mr-2 w-5 h-5" />
                            {t.hero.cta_find}
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg glass border-white/20 text-white hover:bg-white/10">
                        <Link href="/contact">
                            {t.hero.cta_partner} <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
