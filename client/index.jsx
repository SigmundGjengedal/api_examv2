import React, {useContext, useEffect} from "react";
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
                <Link to={"/movies"}>List movies</Link>
            </div>

            <div>
                <Link to="/login">Login with Google</Link>
            </div>

        </div>
    );
}

// login
function Login() {
    const {discovery_endpoint, client_id, response_type} = useContext(LoginContext)
    useEffect(async () => {
        const {authorization_endpoint} = await fetchJSON(discovery_endpoint);

        const parameters = {
            response_type,
            client_id,
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
        const {access_token} = Object.fromEntries(
            new URLSearchParams(window.location.hash.substring(1))
        );
        console.log(access_token);

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({access_token}),
        });
        navigate("/db-front-page");
    });

    return <h1>Please wait...</h1>;
}

function Profile() {
    const {loading, data, error} = useLoading(async () => {
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
                <img src={data.picture} alt={"Profile picture"}/>
            </div>
        </div>
    );
}

const LoginContext = React.createContext();


export function Application() {
    const {loading, error, data} = useLoading(() => fetchJSON("/api/login/config"))
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error.toString()}</div>
    }
    return (
        <LoginContext.Provider value={data}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<FrontPage/>}/>

                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/login/callback"} element={<LoginCallback/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>s

                    <Route path={"/db-front-page"} element={<DBFrontPage/>}/>
                    <Route path={"/movies"} element={<ListData/>}/>
                    <Route path={"/movies/new"} element={<AddMovie/>}/>
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

ReactDOM.render(<Application/>, document.getElementById("app"));
