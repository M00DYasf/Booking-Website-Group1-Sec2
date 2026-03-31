import { register } from "../controllers/auth";
import userQueries from "../infrastructure/mongodb/queries/user";

const mockDependencies = {
  mongoDbClient: {
    User: {}
  }
};

describe("register controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw an error if user already exists", async () => {
    jest.spyOn(userQueries, "findUserByEmail").mockResolvedValue({ 
      email: "john@test.com" 
    } as any);

    await expect(
      register(mockDependencies)({ 
        name: "John", 
        email: "john@test.com", 
        password: "password123" 
      })
    ).rejects.toThrow("User already exists with this email");
  });

  it("should throw an error if name, email or password is missing", async () => {
    jest.spyOn(userQueries, "findUserByEmail").mockResolvedValue(null);

    await expect(
      register(mockDependencies)({ 
        name: "", 
        email: "john@test.com", 
        password: "password123" 
      })
    ).rejects.toThrow("Name, email and password are required");
  });

  it("should throw an error if password is less than 6 characters", async () => {
    jest.spyOn(userQueries, "findUserByEmail").mockResolvedValue(null);

    await expect(
      register(mockDependencies)({ 
        name: "John", 
        email: "john@test.com", 
        password: "123" 
      })
    ).rejects.toThrow("Password must be at least 6 characters");
  });
});