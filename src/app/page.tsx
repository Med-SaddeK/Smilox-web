"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Hero } from "@/components/home/Hero";
import { LocationCard } from "@/components/locations/LocationCard";
import locationsData from "@/data/locations.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Droplets, ShieldCheck, Leaf, ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  // Pick 3 random locations for the teaser
  const featuredLocations = locationsData.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      {/* Features / Benefits */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t.benefits.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl glow-border">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.benefits.eco}</h3>
            <p className="text-white/60">{t.benefits.eco_desc}</p>
          </div>

          <div className="glass p-8 rounded-2xl glow-border">
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.benefits.quality}</h3>
            <p className="text-white/60">{t.benefits.quality_desc}</p>
          </div>

          <div className="glass p-8 rounded-2xl glow-border">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.benefits.save_money}</h3>
            <p className="text-white/60">{t.benefits.save_money_desc}</p>
          </div>
        </div>
      </section>

      {/* Locations Teaser */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{t.locations.title}</h2>
            <p className="text-white/60">Trouvez Smilox près de chez vous</p>
          </div>
          <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300">
            <Link href="/locations">
              {t.locations.filter_all} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>

      {/* Water Quality Teaser */}
      <section className="container mx-auto px-4 mb-20">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Une eau pure, étape par étape.</h2>
              <p className="text-lg text-white/60 mb-8">
                Notre processus de filtration en 6 étapes garantit une eau sans impuretés, sans goût de chlore, et parfaitement équilibrée.
              </p>
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/water-quality">En savoir plus sur la filtration</Link>
              </Button>
            </div>
            {/* Visual placeholder for filtration */}
            <div className="w-full md:w-1/3 aspect-square bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10">
              <Droplets className="w-24 h-24 text-cyan-400 opacity-80" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
