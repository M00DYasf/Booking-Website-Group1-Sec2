import { acceptBooking, declineBooking, editBooking, getAllBookings } from "../controllers/booking";
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

  it("should accept a pending booking successfully", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue({ 
      _id: "123", 
      status: "pending" 
    } as any);
    jest.spyOn(bookingQueries, "updateBookingStatus").mockResolvedValue({ 
      _id: "123", 
      status: "accepted" 
    } as any);

    const result = await acceptBooking(mockDependencies)("123");
    expect(result).toHaveProperty("status", "accepted");
  });
});

describe("declineBooking controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw an error if booking is not found", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue(null);

    await expect(
      declineBooking(mockDependencies)("123")
    ).rejects.toThrow("Booking not found");
  });

  it("should throw an error if booking is not pending", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue({ 
      _id: "123", 
      status: "declined" 
    } as any);

    await expect(
      declineBooking(mockDependencies)("123")
    ).rejects.toThrow("Only pending bookings can be declined");
  });

  it("should decline a pending booking successfully", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue({ 
      _id: "123", 
      status: "pending" 
    } as any);
    jest.spyOn(bookingQueries, "updateBookingStatus").mockResolvedValue({ 
      _id: "123", 
      status: "declined" 
    } as any);

    const result = await declineBooking(mockDependencies)("123");
    expect(result).toHaveProperty("status", "declined");
  });
});

describe("editBooking controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw an error if booking is not found", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue(null);

    await expect(
      editBooking(mockDependencies)("123", { roomNumber: 202 })
    ).rejects.toThrow("Booking not found");
  });

  it("should edit a booking successfully", async () => {
    jest.spyOn(bookingQueries, "findBookingById").mockResolvedValue({ 
      _id: "123", 
      status: "pending" 
    } as any);
    jest.spyOn(bookingQueries, "updateBooking").mockResolvedValue({ 
      _id: "123", 
      roomNumber: 202 
    } as any);

    const result = await editBooking(mockDependencies)("123", { roomNumber: 202 });
    expect(result).toHaveProperty("roomNumber", 202);
  });
});

describe("getAllBookings controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return all bookings successfully", async () => {
    jest.spyOn(bookingQueries, "findAllBookings").mockResolvedValue([
      { _id: "123", status: "pending" },
      { _id: "456", status: "accepted" }
    ] as any);

    const result = await getAllBookings(mockDependencies)();
    expect(result).toHaveLength(2);
  });
});