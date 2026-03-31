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
});