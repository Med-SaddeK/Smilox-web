"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Phone } from "lucide-react";

export default function ContactPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setLoading(false);
            toast.success(t.contact.toast_success);
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">{t.contact.title}</h1>

                <div className="glass p-8 rounded-2xl glow-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">{t.contact.form_name}</label>
                                <Input required className="bg-white/5 border-white/10 text-white" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">{t.contact.form_email}</label>
                                <Input required type="text" className="bg-white/5 border-white/10 text-white" placeholder="email@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Ville (Optionnel)</label>
                            <Input className="bg-white/5 border-white/10 text-white" placeholder="Casablanca" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">{t.contact.form_message}</label>
                            <Textarea required className="bg-white/5 border-white/10 text-white min-h-[150px]" placeholder="Bonjour..." />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20">
                            {loading ? "Envoi..." : (
                                <>
                                    {t.contact.submit} <Send className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-white/60 mb-4">Ou contactez-nous directement sur WhatsApp</p>
                        <Button variant="outline" className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                            <Phone className="mr-2 w-4 h-4" /> WhatsApp Support
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
