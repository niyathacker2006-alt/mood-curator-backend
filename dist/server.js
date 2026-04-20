"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const journalroutes_1 = __importDefault(require("./journalroutes"));
const authroutes_1 = __importDefault(require("./authroutes"));
const contentroutes_1 = __importDefault(require("./contentroutes"));
const db_1 = __importDefault(require("./db"));
const seedData_1 = require("./seedData");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authroutes_1.default);
app.use('/api/journal', journalroutes_1.default);
app.use('/api', contentroutes_1.default);
app.get('/api/health', (req, res) => res.json({
    message: 'Backend is online',
    database: 'MongoDB',
    port: process.env.PORT || 5000,
}));
app.get('/', (req, res) => res.send('Backend is Online and Verified!'));
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(async () => {
    await (0, seedData_1.seedWellnessData)();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
