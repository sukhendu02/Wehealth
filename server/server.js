// import dotenv from "dotenv";
import app from "./app.js";
import dotenv from 'dotenv'
import { connectDb } from "./src/config/db/index.js";
dotenv.config();


const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {
        await connectDb()
        console.log("Database connected successfully")
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Close the server and DB pool cleanly on deploy / restart
        const shutdown = () => server.close(async () => { await closeDb(); process.exit(0); });
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

};

startServer();