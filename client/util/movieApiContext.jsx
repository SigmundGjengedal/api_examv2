import React from "react";
import {fetchJSON} from "../http";
import {postJSON} from "../http";

export const MovieApiContext = React.createContext({
    async listMovies(query) {
        return await fetchJSON("/api/movies?" + new URLSearchParams(query));
    },
    async fetchLogin() {
        return await fetchJSON("/api/login");
    },
    async registerLogin(provider, login) {
        return await postJSON(`/api/login/${provider}`, login);
    },
    async endSession() {
        const res = await fetch("/api/login", { method: "DELETE" });
        if (!res.ok) {
            throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
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