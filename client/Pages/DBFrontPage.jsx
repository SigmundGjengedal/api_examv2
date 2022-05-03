import {Link, useNavigate} from "react-router-dom";
import React from "react";

export function DBFrontPage() {
    const navigate = useNavigate();
    async function handleLogout() {
        await fetch("/api/login", { method: "delete" });
        navigate("/")
    }
    return (
        <div>
            <h1>Movie Database</h1>
            <ul>
                <div>
                    <Link to={"/movies"}>List movies</Link>
                </div>
                <div>
                    <Link to={"/movies/new"}>Add new movie</Link>
                </div>
                <div>
                    <Link to="/profile">Your Profile</Link>
                </div>
                <div>
                    <Link to="/chat">Chat</Link>
                </div>
                <div>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </ul>
        </div>
    );
}