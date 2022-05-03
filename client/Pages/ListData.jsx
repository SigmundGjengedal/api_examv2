import {useLoading} from "../customHooks/useLoading";
import React, {useContext, useState} from "react";
import {ApplicationApiContext} from "../util/applicationApiContext";

export function ListData() {
    const {listMovies} = useContext(ApplicationApiContext);
    //state for searchbar. Første kan endres til det man trenger.
    const [country, setCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const {loading, error, data} = useLoading(async () => listMovies({country})
        , [country]);

    function handleSubmitQuery(e) {
        e.preventDefault();
        setCountry(searchQuery);
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
               {/* searchbar*/}
                <form onSubmit={handleSubmitQuery}>
                    <label>
                        Country:
                        <input
                            id="country-query"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
        <p>Year: {movie.parsedYear}</p>
        <p>Plot: {movie.plot}</p>
        <p>Directors: {movie.director}</p>
        <p>Country: {movie.countries}</p>
{/*
        {
            movie.countries.map((c, index) => {
                return (<p key={index}>Country: {c}</p>)
            })}*/}
        {movie.poster ? <img src={movie.poster} alt="pic" width={100}/> : null}
    </div>;
}