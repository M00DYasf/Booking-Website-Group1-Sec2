import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  guestName: { type: String, required: true, trim: true },
  guestEmail: { type: String, required: true, trim: true },
  roomNumber: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model("Booking", BookingSchema);