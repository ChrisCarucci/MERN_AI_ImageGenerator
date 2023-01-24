import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";

// Routes
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

// Initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get("/", async (req, res) => {
    res.status(200).json({ message: "Hello There"})
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(5001, () => console.log(`Server has started on Port: 8080`))


    } catch (err) {
        console.log(err.message);
    }
};

startServer();