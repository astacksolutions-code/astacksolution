import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer as createViteServer } from "vite";

// Routes
import contactRoutes from "./server/routes/contactRoutes.ts";
import projectRoutes from "./server/routes/projectRoutes.ts";
import adminRoutes from "./server/routes/adminRoutes.ts";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/astack_solutions";
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

  // API Routes
  app.use("/api/contact", contactRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
