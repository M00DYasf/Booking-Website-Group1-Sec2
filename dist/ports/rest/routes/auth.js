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
const express_1 = __importDefault(require("express"));
const dependencies_1 = __importDefault(require("../../../infrastructure/dependencies"));
const auth_1 = require("../../../controllers/auth");
const router = express_1.default.Router();
// POST /auth/register
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const result = yield (0, auth_1.register)(dependencies_1.default)({ name, email, password, role });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// POST /auth/login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, auth_1.login)(dependencies_1.default)({ email, password });
        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map