import { acceptBooking } from "../controllers/booking";
import bookingQueries from "../infrastructure/mongodb/queries/booking";

const mockDependencies = {};

describe("acceptBooking controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw an error if booking is not found", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue(null);

    await expect(
      acceptBooking(mockDependencies)("123")
    ).rejects.toThrow("Booking not found");
  });

  it("should throw an error if booking is not pending", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue({ 
      _id: "123", 
      status: "accepted" 
    } as any);

    await expect(
      acceptBooking(mockDependencies)("123")
    ).rejects.toThrow("Only pending bookings can be accepted");
  });
});