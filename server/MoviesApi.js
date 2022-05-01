import { Router } from "express";

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {

       // lageren query som kan  bygges på, med f.eks søkeord.
        const query = {
           /* year: { $gte: 2000 },*/
        };
        const { country } = req.query; // tar imot query fra searchbar
        if (country) {
            query.countries = { $in: [country] };
        }
        const movies = await mongoDatabase.collection("movies")
            .find(query)
            .sort({
                year:-1 //Sort from high-low = -1
            })
            .map(({title, year, plot, countries,  directors, poster, imdb})=>{  //velger info som retuneres fra db - bruker det hos clienten
                return {title, year, plot, directors, poster, countries, imdb}
            })
            .limit(15) //limits results
            .toArray();

        res.json(movies);
    });

    router.post("/new", (req, res) => {
        const { title, plot, year1, country, director } = req.body;
        const year = parseInt(year1)
        const countries = [country]
        const directors = [director]
        mongoDatabase
            .collection("movies")
            .insertOne({ title, plot, year, countries,directors});
        res.sendStatus(204);
    });

    return router;
}
