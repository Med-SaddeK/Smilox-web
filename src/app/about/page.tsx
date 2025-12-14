import { Droplets } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="inline-flex p-4 rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
                <Droplets className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6">À propos de Smilox</h1>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                    Smilox est né d&apos;une vision simple : rendre l&apos;eau de qualité accessible à tous, tout en éliminant le fléau des bouteilles en plastique à usage unique.
                </p>
                <p>
                    Nous déployons un réseau de fontaines à eau intelligentes à travers le Maroc, utilisant des technologies de filtration de pointe pour transformer l&apos;eau du réseau en une eau pure, fraîche et délicieuse.
                </p>
                <p>
                    Notre mission est double : offrir une alternative économique aux familles marocaines et protéger notre environnement pour les générations futures.
                </p>
            </div>
        </div>
    );
}
