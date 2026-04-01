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
});