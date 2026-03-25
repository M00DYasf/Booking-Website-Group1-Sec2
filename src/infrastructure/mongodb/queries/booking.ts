import { Booking } from "../models/booking";

const findAllBookings = async () => {
  return Booking.find();
};

const findBookingById = async (id: string) => {
  return Booking.findById(id);
};

const updateBookingStatus = async (id: string, status: string) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true });
};

const updateBooking = async (id: string, data: any) => {
  return Booking.findByIdAndUpdate(id, data, { new: true });
};

export default { findAllBookings, findBookingById, updateBookingStatus, updateBooking };