import React from "react";
import {fetchJSON} from "../http";

export const MovieApiContext = React.createContext({
    async listMovies(query) {
        return await fetchJSON("/api/movies?" + new URLSearchParams(query));
    },
    async createMovie(movie) {
        fetch("/api/movies/new", {
            method: "post",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
});