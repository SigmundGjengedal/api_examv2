import React, {useContext} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DBFrontPage} from "./Pages/DBFrontPage";
import {ListData} from "./Pages/ListData";
import {AddData} from "./Pages/AddData";
import {useLoading} from "./customHooks/useLoading";
import {LoginPage} from "./Pages/LoginPage";
import {ApplicationApiContext} from "./util/applicationApiContext";
import {Profile} from "./Pages/profile";
import {FrontPage} from "./Pages/frontPage";
import "./index.css"
import {ChatPage} from "./Pages/chatPage";


export function Application() {

    const {fetchLogin} = useContext(ApplicationApiContext);
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
                <Route path={"/profile"} element={<Profile/>}/>

                <Route path={"/db-front-page"} element={<DBFrontPage/>}/>
                <Route path={"/movies"} element={<ListData/>}/>
                <Route path={"/movies/new"} element={<AddData/>}/>

                <Route path={"/chat"} element= {<ChatPage/>}/>
            </Routes>
        </BrowserRouter>

    );
}

ReactDOM.render(<Application/>, document.getElementById("app"));
