"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Droplets, Filter } from "lucide-react";

export default function WaterQualityPage() {
    useLanguage();

    const steps = [
        { title: "Filtration Sédimentaire", desc: "Élimine le sable, la rouille et les particules en suspension." },
        { title: "Charbon Actif", desc: "Retire le chlore, les odeurs et les goûts désagréables." },
        { title: "Osmose Inverse", desc: "La technologie clé : élimine 99% des contaminants dissous, bactéries et virus." },
        { title: "Post-filtration Charbon", desc: "Affine le goût pour une eau cristalline." },
        { title: "Reminéralisation", desc: "Rajoute les minéraux essentiels (Calcium, Magnésium) pour la santé." },
        { title: "Stérilisation UV", desc: "Désinfection finale pour garantir une sécurité absolue." },
    ];

    const faqs = [
        { q: "L'eau est-elle testée ?", a: "Oui, nos machines sont équipées de capteurs en temps réel et nous effectuons des analyses laboratoires mensuelles." },
        { q: "Quels minéraux sont ajoutés ?", a: "Nous ajoutons une dose équilibrée de Calcium, Magnésium et Potassium." },
        { q: "Quelle est la différence avec l'eau du robinet ?", a: "L'eau du robinet est potable, mais contient souvent du chlore et des résidus de canalisations. Smilox offre une pureté supérieure et un goût neutre." },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-10 h-10 text-cyan-400" />
                    Qualité & Sécurité
                </h1>
                <p className="text-xl text-white/60 mb-12">
                    Découvrez pourquoi l&apos;eau Smilox est plus pure, plus sûre et meilleure pour votre santé.
                </p>

                {/* Process Steps */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="glass p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-24 bg-blue-500/10 blur-[80px] rounded-full" />
                        <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Les 6 Étapes de Purification</h2>
                        <div className="space-y-6 relative z-10">
                            {steps.map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{step.title}</h3>
                                        <p className="text-white/60 text-sm">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass p-6 rounded-xl flex items-start gap-4">
                            <Filter className="w-8 h-8 text-green-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white">Zéro Plastique</h3>
                                <p className="text-white/60">En réutilisant vos contenants, vous évitez des centaines de bouteilles plastiques par an.</p>
                            </div>
                        </div>
                        <div className="glass p-6 rounded-xl flex items-start gap-4">
                            <Droplets className="w-8 h-8 text-blue-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white">Goût Parfait</h3>
                                <p className="text-white/60">Ni chlore, ni arrière-goût métallique. Juste de l&apos;eau pure.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Questions Fréquentes</h2>
                <Accordion type="single" collapsible className="w-full glass rounded-xl px-6 py-2">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                            <AccordionTrigger className="text-white hover:text-cyan-400 text-left">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/70">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
