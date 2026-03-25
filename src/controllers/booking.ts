import bookingQueries from "../infrastructure/mongodb/queries/booking";

export const acceptBooking = (dependencies: any) => async (id: string) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.status !== "pending") {
    throw new Error("Only pending bookings can be accepted");
  }
  return bookingQueries.updateBookingStatus(id, "accepted");
};

export const declineBooking = (dependencies: any) => async (id: string) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.status !== "pending") {
    throw new Error("Only pending bookings can be declined");
  }
  return bookingQueries.updateBookingStatus(id, "declined");
};

export const editBooking = (dependencies: any) => async (id: string, data: any) => {
  const booking = await bookingQueries.findBookingById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  return bookingQueries.updateBooking(id, data);
};

export const getAllBookings = (dependencies: any) => async () => {
  return bookingQueries.findAllBookings();
};