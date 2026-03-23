"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config({ allowEmptyValues: true });
const ENVIRONMENT = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const MONGO_URL = (_b = process.env.MONGO_URL) !== null && _b !== void 0 ? _b : "";
const JWT_SECRET = (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "";
const JWT_EXPIRES_IN = (_d = process.env.JWT_EXPIRES_IN) !== null && _d !== void 0 ? _d : "7d";
exports.config = {
    environment: ENVIRONMENT,
    mongo: { url: MONGO_URL },
    jwt: { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN }
};
//# sourceMappingURL=config.js.map