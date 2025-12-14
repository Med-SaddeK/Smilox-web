"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Droplets } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { t, lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLang = () => {
        setLang(lang === "fr" ? "en" : "fr");
    };

    const navLinks = [
        { href: "/locations", label: t.nav.locations },
        { href: "/water-quality", label: t.nav.quality },
        { href: "/why-smilox", label: t.nav.why },
        { href: "/contact", label: t.nav.contact },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg text-white group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300">
                        <Droplets className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Smilox
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-cyan-400 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="h-4 w-[1px] bg-white/10 mx-2" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLang}
                        className="text-white/80 hover:text-white hover:bg-white/10 font-mono tracking-wider"
                    >
                        {lang.toUpperCase()}
                    </Button>

                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white border-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Link href="/locations">{t.hero.cta_find}</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLang}
                        className="text-white/80 hover:text-white hover:bg-white/10 font-mono"
                    >
                        {lang.toUpperCase()}
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-[#070A12]/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-8 mt-10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-white/80 hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600">
                                    <Link href="/locations" onClick={() => setIsOpen(false)}>
                                        {t.hero.cta_find}
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
