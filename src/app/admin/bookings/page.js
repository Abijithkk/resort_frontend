"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { authAPI } from "@/lib/api";
import { bookingsAPI } from "@/lib/api";
import { toast } from "sonner";
import { Palmtree, LogOut, Calendar, Mail, Phone, Users, Clock } from "lucide-react";
import { format } from "date-fns";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    if (!authAPI.isAdmin()) {
      router.push("/admin/login");
      return;
    }

    loadBookings();
  }, [router]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const allBookings = await bookingsAPI.getAll();
      setBookings(allBookings || []);
    } catch (error) {
      const errorMessage = error.message || "Failed to load bookings";
      toast.error(errorMessage);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    authAPI.logout();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    const bookingStatus = booking.status || "pending";
    return bookingStatus === filter;
  });

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => (b.status || "pending") === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const getStatusBadge = (status) => {
    const bookingStatus = status || "pending";
    const styles = {
      pending: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
      confirmed: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
    };

    const Icon = Clock;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[bookingStatus] || styles.pending}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {bookingStatus.charAt(0).toUpperCase() + bookingStatus.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <Palmtree className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-white">Paradise Retreat</span>
              </Link>
              <span className="text-slate-400">Admin Dashboard</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">Total Bookings</div>
              <div className="text-3xl font-bold text-white">{statusCounts.all}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">Pending</div>
              <div className="text-3xl font-bold text-yellow-400">{statusCounts.pending}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">Confirmed</div>
              <div className="text-3xl font-bold text-green-400">{statusCounts.confirmed}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">Cancelled</div>
              <div className="text-3xl font-bold text-red-400">{statusCounts.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "pending", "confirmed", "cancelled"].map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? "default" : "outline"}
              className={
                filter === status
                  ? "bg-primary text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
            </Button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
              <p className="text-slate-400">There are no bookings matching your filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const bookingId = booking._id || booking.id;
              return (
              <Card key={bookingId} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{booking.name}</h3>
                            {getStatusBadge(booking.status || "pending")}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {booking.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {booking.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                            </div>
                          </div>
                        </div>
                      </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-medium">Check-in:</span>
                            <span>{booking.checkIn ? format(new Date(booking.checkIn), "PPP") : "Not set"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-medium">Check-out:</span>
                            <span>{booking.checkOut ? format(new Date(booking.checkOut), "PPP") : "Not set"}</span>
                          </div>
                          {booking.roomType && (
                            <div className="flex items-center gap-2 text-slate-300">
                              <span className="font-medium">Room:</span>
                              <span>{booking.roomType}</span>
                            </div>
                          )}
                        </div>
                        
                        {booking.specialRequests && (
                          <div className="mt-2 p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                            <p className="text-xs text-slate-400 mb-1">Special Requests:</p>
                            <p className="text-sm text-slate-300">{booking.specialRequests}</p>
                          </div>
                        )}

                      {booking.createdAt && (
                        <div className="text-xs text-slate-500">
                          Created: {format(new Date(booking.createdAt), "PPp")}
                        </div>
                      )}
                      {booking.updatedAt && booking.updatedAt !== booking.createdAt && (
                        <div className="text-xs text-slate-500">
                          Updated: {format(new Date(booking.updatedAt), "PPp")}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

