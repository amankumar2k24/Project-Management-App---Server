"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
// ROUTE IMPORTS
const projectRoute_1 = __importDefault(require("./routes/projectRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const teamRoute_1 = __importDefault(require("./routes/teamRoute"));
// CONFIGURATIONS
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
// ROUTES
app.get("/", (req, res) => {
    res.send("This is home route");
});
app.use("/api/project", projectRoute_1.default);
app.use("/api/task", taskRoute_1.default);
app.use("/api/search", searchRoute_1.default);
app.use("/api/user", userRoute_1.default);
app.use("/api/team", teamRoute_1.default);
// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
