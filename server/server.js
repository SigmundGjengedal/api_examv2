import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as path from "path";
import {MoviesApi} from "./MoviesApi.js";
import {LoginApi} from "./LoginApi.js";

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


// DB
const mongoClient = new MongoClient(process.env.MONGODB_URL)
mongoClient.connect().then(async () => {
    //Sender inn valgte databasen
    app.use("/api/movies", MoviesApi(mongoClient.db( process.env.MONGODB_DATABASE || "ZiggyMovies")));
})

// login
app.use("/api/login", LoginApi());

// static files
app.use(express.static("../client/dist"));

// middleware for *!api
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});