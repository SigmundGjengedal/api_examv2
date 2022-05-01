import {AddMovie} from "../Pages/AddMovie";
import React from "react";
import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {MovieApiContext} from "../util/movieApiContext";
import {Simulate} from "react-dom/test-utils";

// kun front-end testing. Er ikke knyttet til db

// sjekker innhold i strong-tag i FormInput i AddMovie
describe("AddMovie component", () => {
    it("show form", () => {
        const element = document.createElement("div");
        ReactDOM.render(<MemoryRouter><AddMovie/></MemoryRouter>, element);
        expect(element.innerHTML).toMatchSnapshot();
        expect(
            Array.from(element.querySelectorAll("form label strong")).map(title => title.innerHTML)
        ).toEqual(["Title:", "Year:", "Country:","Plot:", "Director:"]);// rekkefølge FormInputLabel

    });
    // tester submit med jest.fn og angir en title i eventData
    it("adds movie on submit", () => {
        const createMovie = jest.fn();
        const title = "Test Movie";
        const year1 = 2022;
        const director= "Sigmund";
        const country= "Norway";
        const plot = "Sigmund tester form label";
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
             <MovieApiContext.Provider value={{createMovie}}>
                <AddMovie/>
             </MovieApiContext.Provider>
            </MemoryRouter>,
            element
        );
        Simulate.change(element.querySelector(".form-input input"), {
            target: {value: title},
        });
        Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"),{
            target : { value : year1 },
        });
        Simulate.change(element.querySelector(".form-input:nth-of-type(3) input"),{
            target : { value : country },
        });
        Simulate.change(element.querySelector(".form-input:nth-of-type(4) input"),{
            target : { value : plot },
        });
        Simulate.change(element.querySelector(".form-input:nth-of-type(5) input"),{
            target : { value : director },
        });

        Simulate.submit(element.querySelector("form"));
        expect(createMovie).toBeCalledWith({
            title: title,
            year1: year1,
            country: country,
            plot: plot,
            director: director,
        });
        // merk rekkefølge på disse fra AddMovie

    });
});