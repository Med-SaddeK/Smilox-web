"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Leaf, HeartPulse, Clock, Sparkles } from "lucide-react";

export default function WhySmiloxPage() {
    useLanguage();

    const benefits = [
        {
            icon: <PiggyBank className="w-8 h-8 text-yellow-400" />,
            title: "Économies Massives",
            desc: "L'eau Smilox coûte 5 à 10 fois moins cher que l'eau en bouteille. Remplissez 5L pour quelques dirhams seulement."
        },
        {
            icon: <Leaf className="w-8 h-8 text-green-400" />,
            title: "Écologie Concrète",
            desc: "Chaque remplissage est une bouteille plastique en moins dans la nature. Participez activement à la protection de l'environnement."
        },
        {
            icon: <HeartPulse className="w-8 h-8 text-red-400" />,
            title: "Santé Optimale",
            desc: "Une eau sans microplastiques (fréquents dans les bouteilles exposées au soleil) et sans contaminants chimiques."
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-400" />,
            title: "Disponibilité 24/7",
            desc: "La majorité de nos machines sont accessibles à toute heure. Plus besoin d'attendre l'ouverture du supermarché."
        },
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "Fraîcheur Garantie",
            desc: "L'eau est filtrée à la demande, garantissant une fraîcheur que l'eau stockée en bouteille depuis des mois ne peut offrir."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Pourquoi choisir Smilox ?</h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Plus qu&apos;une simple eau, c&apos;est un choix intelligent pour votre portefeuille, votre santé et la planète.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {benefits.map((b, i) => (
                    <Card key={i} className="glass border-0 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                            <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl">
                                {b.icon}
                            </div>
                            <CardTitle className="text-white text-xl">{b.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/60">
                                {b.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
