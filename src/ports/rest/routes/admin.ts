import express from "express";
import dependencies from "../../../infrastructure/dependencies";
import { acceptBooking, declineBooking, editBooking, getAllBookings } from "../../../controllers/booking";
import { protect, adminOnly } from "../../../middleware/auth";

const router = express.Router();

// GET /admin/bookings
router.get("/bookings", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await getAllBookings(dependencies)();
    res.status(200).json({ bookings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /admin/bookings/:id/accept
router.put("/bookings/:id/accept", protect, adminOnly, async (req, res) => {
  try {
    const booking = await acceptBooking(dependencies)(String(req.params.id));
    res.status(200).json({ message: "Booking accepted", booking });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /admin/bookings/:id/decline
router.put("/bookings/:id/decline", protect, adminOnly, async (req, res) => {
  try {
    const booking = await declineBooking(dependencies)(String(req.params.id));
    res.status(200).json({ message: "Booking declined", booking });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /admin/bookings/:id/edit
router.put("/bookings/:id/edit", protect, adminOnly, async (req, res) => {
  try {
    const booking = await editBooking(dependencies)(String(req.params.id), req.body);
    res.status(200).json({ message: "Booking updated", booking });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;