import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApplicationApiContext} from "../util/applicationApiContext";

// hm AddMovie
function FormInput({ label, value, onChangeValue }) {
    return (
        <div className="form-input">
            <label>
                <strong>{label}</strong>
                <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
            </label>
        </div>
    );
}

export function AddData() {
   // henter createMovie metoden fra MovieApiContext
    const { createMovie } = useContext(ApplicationApiContext);
    // setter state for form input
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [director, setDirector] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        createMovie({title, year, plot, country,director})

        setTitle("");
        setYear("");
        setPlot("");
        setCountry("");
        setDirector("");

        navigate("/db-front-page");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Movie</h1>
            <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
            <FormInput label={"Year:"} value={year} onChangeValue={setYear} />
            <FormInput label={"Country:"} value={country} onChangeValue={setCountry} />
            <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
            <FormInput label={"Director:"} value={director} onChangeValue={setDirector} />
            <button>Submit</button>
        </form>
    );
}