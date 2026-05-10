import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import errorWare from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({origin: "http://localhost:5173"}));


import Router from "./router/router.js";


app.use(express.json());
app.use("/api/movie", Router);
app.use(errorWare);



export default app   