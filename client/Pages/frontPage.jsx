import {Link} from "react-router-dom";
import React from "react";

export function FrontPage() {
    return (
        <>
            <div>
                <h1 style={{padding: "20px"}}>Front Page</h1>
            </div>
            <div className="flex-container">
                <div className="column">
                    <Link to={"/movies"}>List movies</Link>
                </div>
                <div className="column">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </>
    );
}