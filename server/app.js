import express, { Router } from "express";
import cors from "cors";

import authRoute from "./src/modules/auth/routes/auth.route.js"


const app = express();




// Enable CORS
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:8081", process.env.FRONTEND_URL, process.env.KITCHEN_FRONTEND_URL], // ← your Vite frontend exact URL
    credentials: true,                // ← required because frontend uses withCredentials: true
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-idempotency-key", "x-address-id"],
}));



app.use("/api/v1/auth", authRoute)


// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Welcome to wehealth"
    });
});
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});




export default app;