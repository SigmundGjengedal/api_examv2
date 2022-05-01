import React, {useEffect} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {DBFrontPage} from "./Pages/DBFrontPage";
import {ListData} from "./Pages/ListData";
import {AddMovie} from "./Pages/AddMovie";
import {fetchJSON} from "./http";
import {useLoading} from "./customHooks/useLoading";

function FrontPage() {
    return (
        <div>
            <h1>Front Page</h1>

            <div>
                <Link to="/login">Login with Google</Link>
            </div>

        </div>
    );
}

// login
function Login() {
    useEffect(async () => {
        const { authorization_endpoint } = await fetchJSON(
            "https://accounts.google.com/.well-known/openid-configuration"
        );

        const parameters = {
            response_type: "token",
            client_id:
                "963108235334-4gnm0tkdhsi0b73h818hff3jqi0f0r5v.apps.googleusercontent.com",
            scope: "email profile",
            redirect_uri: window.location.origin + "/login/callback",
        };

        window.location.href =
            authorization_endpoint + "?" + new URLSearchParams(parameters);
    }, []);

    return (
        <div>
            <h1>Please wait....</h1>
        </div>
    );
}

function LoginCallback() {
    const navigate = useNavigate();
    useEffect(async () => {
        const { access_token } = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1))
        );
        console.log(access_token);

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ access_token }),
        });
        navigate("/db-front-page");
    });

    return <h1>Please wait...</h1>;
}
function Profile() {
    const { loading, data, error } = useLoading(async () => {
        return await fetchJSON("/api/login");
    });


    if (loading) {
        return <div>Please wait...</div>;
    }
    if (error) {
        return <div>Error! {error.toString()}</div>;
    }

    return (
        <div>
            <h1>
                Profile for {data.name} ({data.email})
            </h1>
            <div>
                <img src={data.picture} alt={"Profile picture"} />
            </div>
        </div>
    );
}


export function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>

                <Route path={"/login"} element={<Login />} />
                <Route path={"/login/callback"} element={<LoginCallback />} />
                <Route path={"/profile"} element={<Profile />} />s

                <Route path={"/db-front-page"} element={<DBFrontPage/>}/>
                <Route path={"/movies"} element={<ListData/>}/>
                <Route path={"/movies/new"} element={<AddMovie/>}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application/>, document.getElementById("app"));
