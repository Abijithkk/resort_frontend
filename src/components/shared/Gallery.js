"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const images = [
  { src: "/images/gallery-1.jpg", alt: "Luxury spa interior" },
  { src: "/images/gallery-2.jpg", alt: "Infinity pool with ocean view" },
  { src: "/images/gallery-3.jpg", alt: "Elegant resort bedroom" },
  { src: "/images/gallery-4.jpg", alt: "Adventure activities" },
];

const Gallery = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="relative py-20 sm:py-24 px-4 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.08),_transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-muted text-foreground/70 text-sm font-medium">
            Immersive Moments
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-6 mb-4">
            Experience Paradise
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            A curated visual journey of sunrise dips, gourmet artistry, and moonlit escapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
          {images.map((image, index) => (
            <figure
              key={image.alt}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-[28px] bg-slate-950/5 p-4 backdrop-blur-sm shadow-[0_30px_60px_rgba(15,23,42,0.1)] transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <figcaption className="mt-5 flex items-center justify-between text-sm text-muted-foreground uppercase tracking-[0.3em]">
                <span>{image.alt}</span>
                <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                  View
                  <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                    <path d="M7 17l5-5-5-5v10zm6-10v10l5-5-5-5z" />
                  </svg>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
