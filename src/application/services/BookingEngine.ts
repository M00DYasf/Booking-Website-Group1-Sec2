import { Booking } from "../../domain/entities/Booking";
import { BookingRepository } from "../../domain/repo/BookingRepository";

export class BookingEngine {
  constructor(private bookingRepo: BookingRepository) {}

  private isOverlapping(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && aEnd > bStart;
  }

  async createBooking(data: {
    userId: string | null;
    resourceId: string;
    startTime: Date;
    endTime: Date;
    totalUnits: number;
  }) {
    // 1. Get all bookings for this resource
    const existingBookings = await this.bookingRepo.findByTime(
      data.resourceId,
      data.startTime,
      data.endTime
    );

    // 2. Count overlapping bookings
    let overlappingCount = 0;

    for (const booking of existingBookings) {
      if (
        this.isOverlapping(
          data.startTime,
          data.endTime,
          booking.startTime,
          booking.endTime
        )
      ) {
        overlappingCount++;
      }
    }

    // 3. Check inventory
    if (overlappingCount >= data.totalUnits) {
      throw new Error("No availability for this time slot.");
    }

    // 4. Create booking
    const booking = new Booking(
      crypto.randomUUID(),
      data.userId,
      data.resourceId,
      data.startTime,
      data.endTime,
      "PENDING"
    );

    await this.bookingRepo.create(booking);

    return booking;
  }
}