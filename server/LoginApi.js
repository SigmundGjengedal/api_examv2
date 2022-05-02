import express from "express";
import fetch from "node-fetch";

async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed ${res.status}`);
    }
    return await res.json();
}

export function LoginApi(){
    const router = new express.Router();

    // variables som gjenbrukes
    const discoveryEndpoint = "https://accounts.google.com/.well-known/openid-configuration";

    // henter userinnfo fra discovery endpointet
    router.get("/", async (req, res) => {
        const { access_token } = req.signedCookies;

        const { userinfo_endpoint } = await fetchJSON(
            discoveryEndpoint
        );
        const userinfo = await fetchJSON(userinfo_endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        res.json(userinfo);
    });

    // sender config til clienten
    router.get("/config",(req,res)=>{
        res.json(
            {
                response_type: "token",
                client_id:
                    "579407329923-c6fpd0pfhsk5afbr6a3d4mbelvbu39eh.apps.googleusercontent.com",
                discovery_endpoint:
                discoveryEndpoint,
            }
        )
    })

    router.post("/", (req, res) => {
        const { access_token } = req.body;
        res.cookie("access_token", access_token, { signed: true });
        res.sendStatus(200);
    });

    // endpoint handleLogout funksjonen
    router.delete("/", (req,res) =>{
        res.clearCookie("access_token");
        res.sendStatus(200);
    })

    return router;
}

