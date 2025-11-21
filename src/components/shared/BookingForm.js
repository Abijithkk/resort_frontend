"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CustomDatePicker } from "@/components/ui/DatePicker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { bookingsAPI } from "@/lib/api";
import { authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

const BookingForm = () => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("Deluxe Room");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!authAPI.isAuthenticated()) {
      toast.error("Please login to make a booking");
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    setIsLoading(true);

    try {
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split('T')[0];
      };

      const bookingData = {
        name,
        email,
        phone,
        guests: parseInt(guests),
        checkIn: formatDate(checkIn),
        checkOut: formatDate(checkOut),
        roomType,
        specialRequests: specialRequests || undefined,
      };

      await bookingsAPI.create(bookingData);
      toast.success("Booking request submitted! We'll contact you soon.");
      
      setName("");
      setEmail("");
      setPhone("");
      setGuests("2");
      setRoomType("Deluxe Room");
      setSpecialRequests("");
      setCheckIn(null);
      setCheckOut(null);
    } catch (error) {
      const errorMessage = error.message || "Failed to submit booking. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative py-20 sm:py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative max-w-4xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Plan Your Arrival
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-5 mb-4">
            Book Your Stay
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Start planning your perfect getaway with our concierge team.
          </p>
        </div>

        <Card
          className={cn(
            "relative border-0 bg-white/90 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_35px_80px_rgba(15,23,42,0.15)] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{
            transitionDelay: "200ms",
          }}
        >
          <div className="absolute inset-x-10 -top-5 h-10 rounded-full bg-gradient-to-r from-primary/40 to-transparent blur-3xl opacity-60" />
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl sm:text-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              Reservation Details
              <span className="text-sm font-medium text-primary/80">
                Avg. confirmation time · <strong>2 hours</strong>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Check-In */}
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <CustomDatePicker
                    value={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    placeholder="Select check-in date"
                    minDate={new Date()}
                    disabled={isLoading}
                  />
                </div>

                {/* Check-Out */}
                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <CustomDatePicker
                    value={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    placeholder="Select check-out date"
                    minDate={checkIn || new Date()}
                    disabled={isLoading || !checkIn}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input 
                    id="guests" 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="h-12 rounded-xl" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <select
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    disabled={isLoading}
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Suite">Suite</option>
                    <option value="Villa">Villa</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  disabled={isLoading}
                  placeholder="Any special requests or preferences..."
                  rows={3}
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 sm:py-6 text-base sm:text-lg rounded-2xl bg-gradient-to-r from-primary via-emerald-400 to-sky-500 text-white font-semibold shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
