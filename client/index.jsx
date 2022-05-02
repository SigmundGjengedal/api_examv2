import React, {useContext, useEffect} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {DBFrontPage} from "./Pages/DBFrontPage";
import {ListData} from "./Pages/ListData";
import {AddMovie} from "./Pages/AddMovie";
import {fetchJSON} from "./http";
import {useLoading} from "./customHooks/useLoading";
import {LoginPage} from "./Pages/LoginPage";
import {MovieApiContext} from "./util/movieApiContext";


function FrontPage() {
    return (
        <div>
            <h1>Front Page</h1>
            <div>
                <Link to={"/movies"}>List movies</Link>
            </div>

            <div>
                <Link to="/login">Login</Link>
            </div>

        </div>
    );
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

export function Application() {

    const {fetchLogin} = useContext(MovieApiContext);
    const {data, error, loading, reload} = useLoading(fetchLogin);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error.toString()}</div>
    }
    return (

        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>
                <Route
                    path={"/login/*"}
                    element={<LoginPage config={data.config} reload={reload}/>}
                />
                <Route path={"/profile"} element={<Profile/>}/>s

                <Route path={"/db-front-page"} element={<DBFrontPage/>}/>
                <Route path={"/movies"} element={<ListData/>}/>
                <Route path={"/movies/new"} element={<AddMovie/>}/>
            </Routes>
        </BrowserRouter>

    );
}

ReactDOM.render(<Application/>, document.getElementById("app"));
