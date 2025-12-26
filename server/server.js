import express, { json, urlencoded } from "express";
const app = express();
import {} from "dotenv/config";
import "./config/db.js";
import cors from "cors";

import projectRoutes from "./routes/project.routes.js";
projectRoutes(app);
import serviceRoutes from "./routes/service.routes.js";
serviceRoutes(app);

const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json(), urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server running on port ${port}`));
