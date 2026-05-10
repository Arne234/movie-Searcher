import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js"

async function start() {
    
    await mongoose.connect(process.env.Mongo_URL)

    app.listen(3000, () => {
        console.log("Listening on port 3000...")
    })
}

start()