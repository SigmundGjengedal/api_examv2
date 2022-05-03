import { Router } from "express";

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {

       // lager query som kan  bygges på, med f.eks søkeord.
        const query = {

        };
        const { country } = req.query; // tar imot query fra searchbar
        if (country) {
           query.countries = { $in: [country] };
            /* query.year: { $gte: 2000 },
            * query.title = { $in: [title] }
            * */
        }
        const movies = await mongoDatabase.collection("exam")
            .find(query)
            .sort({
                year:-1 //Sort from high-low = -1
            })
            .map(({title, parsedYear, plot, countries,  director})=>{  //velger info som retuneres fra db - bruker det hos clienten
                return {title, parsedYear, plot, countries,  director}
            })
            .limit(100) //limits results
            .toArray();

        res.json(movies);
    });

    router.post("/new", (req, res) => {
        const { title, plot, year, country, director } = req.body;
        // converts before insert
        const parsedYear = parseInt(year) // int insert
        const countries = [country] // array convert insert. Ikke sikkert det trengs på eksamen.
        mongoDatabase
            .collection("exam")
            .insertOne({ title, plot, parsedYear, countries,director});
        res.sendStatus(204);
    });

    return router;
}
