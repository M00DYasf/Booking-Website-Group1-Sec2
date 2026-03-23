"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./infrastructure/mongodb/connection"));
const auth_1 = __importDefault(require("./ports/rest/routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_safe_1.default.config({ allowEmptyValues: true });
// Connect to MongoDB
(0, connection_1.default)();
// Routes
app.get("/healthcheck", (_req, res) => {
    res.status(200).json({ message: "Booking Website API is running!" });
});
app.use("/auth", auth_1.default);
const desiredPort = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000);
const server = app.listen(desiredPort, () => {
    const addr = server.address();
    const actualPort = typeof addr === "object" && addr ? addr.port : desiredPort;
    console.log(`Server listening on http://localhost:${actualPort}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map