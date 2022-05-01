import {useLoading} from "../customHooks/useLoading";
import React, {useContext, useState} from "react";
import {MovieApiContext} from "../util/movieApiContext";

export function ListData() {
    const {listMovies} = useContext(MovieApiContext);
    //state for searchbar
    const [country, setCountry] = useState("");
    const [countryQuery, setCountryQuery] = useState("");

    const {loading, error, data} = useLoading(async () => listMovies({country})
        , [country]);

    function handleSubmitQuery(e) {
        e.preventDefault();
        setCountry(countryQuery);
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div id="error-text">{error.toString()}</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Movies in the DataBase</h1>

            <div>
                <form onSubmit={handleSubmitQuery}>
                    <label>
                        Country:
                        <input
                            id="country-query"
                            value={countryQuery}
                            onChange={(e) => setCountryQuery(e.target.value)}
                        />
                        <button>Filter</button>
                    </label>
                </form>
            </div>

            {data.map((movie, index) => (
                <MovieCard key={index} movie={movie}/>
            ))}
        </div>
    );
}

function MovieCard({movie}) {
    return <div>
        <h3>Title: {movie.title}</h3>
        <p>Year: {movie.year}</p>
        <p>Plot: {movie.plot}</p>
        <p>Directors: {movie.directors}</p>
        {
            movie.countries.map((c, index) => {
                return (<p key={index}>Country: {c}</p>)
            })}
        {movie.poster ? <img src={movie.poster} alt="pic" width={100}/> : null}
    </div>;
}