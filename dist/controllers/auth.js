"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const user_1 = __importDefault(require("../infrastructure/mongodb/queries/user"));
const register = (dependencies) => (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { mongoDbClient } = dependencies;
    const mongoDbUser = mongoDbClient.User;
    // Check if user already exists
    const existingUser = yield user_1.default.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("User already exists with this email");
    }
    // Validate input
    if (!userData.name || !userData.email || !userData.password) {
        throw new Error("Name, email and password are required");
    }
    if (userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const result = yield user_1.default.registerUser(userData);
    return result;
});
exports.register = register;
const login = (dependencies) => (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = yield user_1.default.findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, String(config_1.config.jwt.secret), { expiresIn: "7d" });
    return {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    };
});
exports.login = login;
//# sourceMappingURL=auth.js.map