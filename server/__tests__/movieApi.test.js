import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import {MoviesApi} from "../MoviesApi";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
let mongoClient;
// klasse som tester movieApi. Får vi hentet data? Får vi posta data?
// bruker dummy database.

beforeAll(async () => {
    dotenv.config();
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    await mongoClient.connect(); //Connecter på clienten
    const database = mongoClient.db("test_database"); //Angir hvilken DB den jobber med
    await database.collection("movies").deleteMany({}); //deleting all movies fra test database
    app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
    mongoClient.close(); //Stenger connection etter at testene er kjørt
});

// tester
describe("movieApi", () => {

    it("adds a new movie, and filters movies by country", async () => {
        const title = "Test 2 " + new Date();
        const country = "random";
        const year = 2020
        const plot = "dette er en film";
        const director = "Tolkien"
        await request(app)
            .post("/api/movies/new")
            .send({
                title,
                country,
                year,
                plot,
                director,
            })
            .expect(204);

        expect(
            (await request(app).get("/api/movies?country=random")).body.map(
                ({ title }) => title
            )
        ).toContain(title);
        expect(
            (await request(app).get("/api/movies?country=USA")).body.map(
                ({ title }) => title
            )
        ).not.toContain(title);
    });

});