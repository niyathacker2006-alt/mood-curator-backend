"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenPayload = (authHeader) => {
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'development_secret');
    }
    catch {
        return null;
    }
};
exports.getTokenPayload = getTokenPayload;
const data = await response.json();

// ADD THESE TWO LINES:
console.log("Here is the data from the server:", data);
console.log("Here is the exact token:", data.token);

if (response.ok) {
    localStorage.setItem('moodToken', data.token);
    window.location.href = "journal.html";
}
