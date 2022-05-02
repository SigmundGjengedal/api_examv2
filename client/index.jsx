import React, {useContext} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DBFrontPage} from "./Pages/DBFrontPage";
import {ListData} from "./Pages/ListData";
import {AddMovie} from "./Pages/AddMovie";
import {useLoading} from "./customHooks/useLoading";
import {LoginPage} from "./Pages/LoginPage";
import {MovieApiContext} from "./util/movieApiContext";
import {Profile} from "./Pages/profile";
import {FrontPage} from "./Pages/frontPage";
import "./index.css"


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
