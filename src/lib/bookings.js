
export const bookingService = {
  createBooking: (bookingData) => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    return newBooking;
  },

  getAllBookings: () => {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  },

  getUserBookings: (userId) => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    return bookings.filter((b) => b.userId === userId);
  },

  updateBookingStatus: (bookingId, status) => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookings[index].status = status;
      bookings[index].updatedAt = new Date().toISOString();
      localStorage.setItem("bookings", JSON.stringify(bookings));
      return bookings[index];
    }
    return null;
  },

  deleteBooking: (bookingId) => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const filtered = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem("bookings", JSON.stringify(filtered));
    return true;
  },
};

