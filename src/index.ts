import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// ROUTE IMPORTS
import projectRoutes from "./routes/projectRoute";
import taskRoutes from "./routes/taskRoute";
import searchRoutes from "./routes/searchRoute";
import userRoutes from "./routes/userRoute"
import teamRoutes from "./routes/teamRoute"

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(morgan("common"));

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("This is home route");
});

app.get("/aman", (req: Request, res: Response) => {
  res.send("This is Aman route");
});

app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
