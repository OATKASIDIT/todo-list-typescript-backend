import express, { Express, Request, Response } from "express";
import { rateLimit } from 'express-rate-limit'
import dotenv from "dotenv";
import { debug } from "util";
import sequelize from "./config/config";
import contentRoutes from "./routes/contentRoutes";
import accountRoutes from "./routes/accountRoutes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: async (req: Request, res: Response) => {
		res.redirect("https://github.com/NatchaLatte");
	}
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api", contentRoutes);
app.use("/api", accountRoutes);

const server = app.listen(port, async () => {
	try{
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
	console.log(`[server] Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", async () => {
  debug("SIGTERM signal received: closing HTTP server");
  await sequelize.close();
  server.close(() => {
	debug("HTTP server closed");
  })
})