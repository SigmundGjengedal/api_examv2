import {useLoading} from "../customHooks/useLoading";
import {fetchJSON} from "../http";
import React from "react";

export function Profile() {
    const {loading, data, error} = useLoading(async () => {
        return await fetchJSON("/api/login");
    });
    console.log(data)

    if (loading) {
        return <div>Please wait...</div>;
    }
    if (error) {
        return <div>Error! {error.toString()}</div>;
    }
    return (
        <div>
            <h1>User Profile</h1>
            <div>
                {data.user.google && (
                    <div>
                        <h2>Logged in as {data.user.google.name}({data.email})</h2>
                        <img src={data.user.google.picture} alt={"Profile picture"}/>
                    </div>
                )}
                {data.user.hk && (
                    <div>
                        <h2>Logged in as {data.user.hk.name}({data.email})</h2>
                        <img src={data.user.hk.picture} alt={"No Profile picture"}/>
                    </div>
                )}

            </div>
            <div>

            </div>
        </div>
    );
}