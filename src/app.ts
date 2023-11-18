import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";
import { createConnection } from "./config/mongo";
import morgan from "morgan";

const app = express();
createConnection();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`SERVER LISTEN ON PORT ${PORT}`));
