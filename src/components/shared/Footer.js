"use client";

import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Paradise Retreat</h3>
            <p className="text-background/80 leading-relaxed text-sm sm:text-base">
              Your premier destination for luxury, relaxation, and unforgettable experiences in tropical paradise.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                <p className="text-background/80 text-sm sm:text-base">
                  123 Paradise Beach Road<br />
                  Tropical Island, TI 12345
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-background/80 text-sm sm:text-base">
                  +1 (555) 123-4567
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-background/80 text-sm sm:text-base">
                  info@paradiseretreat.com
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">

              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-background/20 pt-6 sm:pt-8 text-center text-background/60 text-sm">
          <p>&copy; {currentYear} Paradise Retreat. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
