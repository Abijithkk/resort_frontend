"use client";
import { Home, Waves, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Home,
    title: "Accommodation",
    description:
      "Luxurious rooms and suites with breathtaking views, modern amenities, and elegant comfort.",
  },
  {
    icon: Waves,
    title: "Adventure Activities",
    description:
      "Thrilling water sports, hiking trails, and guided tours to explore the natural beauty around you.",
  },
  {
    icon: Sparkles,
    title: "Wellness & Spa",
    description:
      "Rejuvenating spa treatments, yoga sessions, and meditation spaces for complete relaxation.",
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
            Signature Touchpoints
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-4">
            Bespoke Experiences Curated for You
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Concierge-level care, crafted for discerning travelers seeking serenity, adventure, and indulgence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={cn(
                  "group relative rounded-3xl border border-white/20 bg-white/80 p-px backdrop-blur-xl transition-all duration-500 dark:bg-slate-900/60",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-white/90 dark:bg-slate-900/80 p-6 sm:p-8 shadow-[0_25px_60px_rgba(15,23,42,0.1)]">
                  <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-primary/30" />
                  <div className="relative flex flex-col items-center text-center space-y-5">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-inner shadow-primary/30">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <span className="text-primary font-medium text-sm tracking-wide">
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
