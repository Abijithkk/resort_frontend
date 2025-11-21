"use client";

import { Button } from "@/components/ui/Button";
import { ArrowDown, ArrowRight } from "lucide-react";

const HERO_BACKGROUND = "/images/hero-resort.jpg";

const highlights = [
  { label: "Beachfront Suites", value: "48+" },
  { label: "Gourmet Experiences", value: "12" },
  { label: "Guest Rating", value: "4.9/5" },
];

const Hero = () => {
  const scrollToBooking = () => {
    const section = document.getElementById("booking");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-scale-in"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 text-center max-w-5xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-center gap-3 text-white/80 text-xs uppercase tracking-[0.3em] animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 backdrop-blur-sm">
            Escape · Recharge · Celebrate
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight animate-fade-in-up">
            Paradise <span className="text-primary">Retreat</span> Awaits
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto animate-fade-in-up text-balance"
            style={{ animationDelay: "150ms" }}
          >
            Immerse yourself in modern luxury, curated wellness, and breathtaking ocean views crafted for unforgettable escapes.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            size="lg"
            onClick={scrollToBooking}
            className="group relative inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-primary via-emerald-400 to-sky-500 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white shadow-xl shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-offset-0 focus-visible:ring-white/70"
          >
            <span>Book Your Stay</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/60">
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollToBooking()}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 sm:px-8 py-4 text-white/90 backdrop-blur-md hover:bg-white/20 hover:text-white"
          >
            Explore the resort
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "450ms" }}>
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/20 bg-white/5 px-4 py-5 text-white backdrop-blur-lg shadow-lg shadow-black/20"
            >
              <p className="text-2xl sm:text-3xl font-semibold">{item.value}</p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-white/70 mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
