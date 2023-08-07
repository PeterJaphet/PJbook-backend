"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const server = http_1.default.createServer(app);
app.use('/api/users', userRoutes_1.default);
app.get('/', (req, res) => res.send('Server is ready!'));
server.listen(port, () => {
    console.log(`Server runnig on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map