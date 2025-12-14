"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Droplets } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Droplets className="w-6 h-6 text-cyan-400" />
                            <span className="text-xl font-bold text-white">Smilox</span>
                        </div>
                        <p className="text-white/50 text-sm">
                            {t.hero.subtitle}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.nav.quality}</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>Technology</li>
                            <li>Filtration</li>
                            <li>Safety</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.nav.locations}</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>Marrakech</li>
                            <li>Casablanca</li>
                            <li>Tanger</li>
                            <li>Agadir</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.nav.contact}</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>WhatsApp</li>
                            <li>Email</li>
                            <li>Partnership</li>
                            <li><Link href="/admin/locations">Admin</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
                    © {new Date().getFullYear()} Smilox. {t.footer.rights}
                </div>
            </div>
        </footer>
    );
}
