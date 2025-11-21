"use client";
import { useState, useEffect } from "react";
import { Menu, X, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "Book Now", id: "booking" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center gap-2 group"
          >
            <Palmtree
              className={cn(
                "w-8 h-8 transition-all duration-300",
                isScrolled ? "text-primary" : "text-white"
              )}
            />
            <span
              className={cn(
                "text-xl md:text-2xl font-bold transition-all duration-300",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Paradise Retreat
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "font-medium transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                  isScrolled
                    ? "text-foreground after:bg-primary"
                    : "text-white after:bg-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              />
            )}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/98 backdrop-blur-lg transition-all duration-300 md:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300",
                isMobileMenuOpen && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
