import {AddData} from "../Pages/AddData";
import React from "react";
import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import {ApplicationApiContext} from "../util/applicationApiContext";
import {Simulate} from "react-dom/test-utils";

// kun front-end testing. Er ikke knyttet til db

// sjekker innhold i strong-tag i FormInput i AddMovie
describe("AddMovie component", () => {
    it("show form", () => {
        const element = document.createElement("div");
        ReactDOM.render(<MemoryRouter><AddData/></MemoryRouter>, element);
        expect(element.innerHTML).toMatchSnapshot();
        expect(
            Array.from(element.querySelectorAll("form label strong")).map(title => title.innerHTML)
        ).toEqual(["Title:", "Year:", "Country:","Plot:", "Director:"]);// rekkefølge FormInputLabel

    });
    // tester submit med jest.fn.
    it("adds movie on submit", () => {
        const createMovie = jest.fn();
        const title = "Test Movie";
        const year = 2022;
        const director= "Sigmund";
        const country= "Norway";
        const plot = "Sigmund tester form label";
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
             <ApplicationApiContext.Provider value={{createMovie}}>
                <AddData/>
             </ApplicationApiContext.Provider>
            </MemoryRouter>,
            element
        );
        Simulate.change(element.querySelector(".form-input input"), {
            target: {value: title},
        });
        Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"),{
            target : { value : year },
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
            title,
            year,
            country,
            plot,
            director,
        });
        // merk rekkefølge på disse fra AddMovie

    });
});