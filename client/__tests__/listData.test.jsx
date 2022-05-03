import {ListData} from "../Pages/ListData";
import {ApplicationApiContext} from "../util/applicationApiContext";
import React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";

// tester for front-end. Ser hvordan data vises i nettleser.
// tester med dummy data. DB testes ikke.
const movies = [
    { title: "movie 1", countries: ["Norway"] },
    { title: "movie 2", countries: ["Norway"] }
];
// hm
async function renderListMovies(listMovies) {
    const element = document.createElement("div");
    await act(async () =>
        ReactDOM.render(
            <ApplicationApiContext.Provider value={{ listMovies }}>
                <ListData />
            </ApplicationApiContext.Provider>,
            element
        )
    );
    return element;
}
describe("ListData component", () => {

    it("shows loading screen", async () => {
        const element = await renderListMovies(() => new Promise(() => {}));
        expect(element.innerHTML).toMatchSnapshot();
    });

    // h3 er fra MovieCard i ListData. Tester med to filmer
    it("shows movies", async () => {
        const element = await renderListMovies(async () => movies)
        expect(
            Array.from(element.querySelectorAll("h3")).map((e) => e.innerHTML)
        ).toEqual(["Title: movie 1", "Title: movie 2"]);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("queries by search filter (country)", async () => {
        const domElement = document.createElement("div");
        const listMovies = jest.fn(() => []);
        await act(async () => {
            ReactDOM.render(
                <ApplicationApiContext.Provider value={{ listMovies }}> // jest.fn
                    <ListData />
                </ApplicationApiContext.Provider>,
                domElement
            );
        });
        Simulate.change(domElement.querySelector("#country-query"), {
            target: { value: "Norway" },
        });
        await act(async () => {
            await Simulate.submit(domElement.querySelector("form"));
        });
        expect(listMovies).toHaveBeenCalledWith({
            country: "Norway",
        });
    });

    it("shows error in error.toString()", async () => {
        const element = await renderListMovies(async () => {
            throw new Error("Something went wrong");
        });

        expect(element.querySelector("#error-text").innerHTML).toEqual( "Error: Something went wrong");
        expect(element.innerHTML).toMatchSnapshot();
    });

});
