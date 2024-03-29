import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import {LoginPage} from "../Pages/LoginPage";
import {ApplicationApiContext} from "../util/applicationApiContext";
import { MemoryRouter } from "react-router-dom";

describe("LoginPage", () => {
    it("redirect to log in with google", async () => {
        // replace window.location to be able to detect redirects
        const location = new URL("https://www.example.com");
        delete window.location;
        window.location = new URL(location);

        const authorization_endpoint = `https://foo.example.com/auth`;
        const client_id = `1095582733852-smqnbrhcoiasjjg8q28u0g1k3nu997b0.apps.googleusercontent.com`;

        const domElement = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <LoginPage
                    config={{
                        google: { authorization_endpoint, client_id },
                    }}
                />
            </MemoryRouter>,
            domElement
        );
        await act(async () => {
            await Simulate.click(domElement.querySelector("button"));
        });
        const redirect_uri = `${location.origin}/login/google/callback`;
        expect(window.location.origin + window.location.pathname).toEqual(
            authorization_endpoint
        );
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search.substring(1))
        );
        expect(params).toMatchObject({ client_id, redirect_uri });
    });

    it("posts received token to server", async () => {
        window.sessionStorage.setItem("expected_state", "test");
        // replace window.location to simulate returning
        const access_token = `abc`;
        const location = new URL(
            `https://www.example.com#access_token=${access_token}&state=test`
        );
        delete window.location;
        window.location = new URL(location);

        const domElement = document.createElement("div");
        const registerLogin = jest.fn();
        const reload = jest.fn();
        act(() => {
            ReactDOM.render(
                <MemoryRouter initialEntries={["/google/callback"]}>
                    <ApplicationApiContext.Provider value={{registerLogin}}>
                        <LoginPage reload={reload}/>
                    </ApplicationApiContext.Provider>
                </MemoryRouter>,
                domElement
            );
        });
        expect(registerLogin).toBeCalledWith("google", { access_token });
    });

/*    it("redirect to log in with Høyskolen Kristiania", async () => {
        // replace window.location to be able to detect redirects
        const location = new URL("https://www.example.com");
        delete window.location;
        window.location = new URL(location);

        const authorization_endpoint = "https://login.microsoftonline.com/organizations/oauth2/v2.0/token";
        const token_endpoint = "https://foo.example.com/abc"
        const client_id = `85fd18d0-24c9-4c83-98aa-edb6d4085113`;
        const code_challenge_method = "s256"
        const domElement = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <LoginPage
                    config={{
                        hk: { authorization_endpoint, client_id,code_challenge_method},
                    }}
                />
            </MemoryRouter>,
            domElement
        );
        await act(async () => {
            await Simulate.click(domElement.querySelector("button"));
        });
        const redirect_uri = `${location.origin}/login/hk/callback`;
        expect(window.location.origin + window.location.pathname).toEqual(
            authorization_endpoint
        );
        const params = Object.fromEntries(
            new URLSearchParams(window.location.search.substring(1))
        );
        expect(params).toMatchObject({ client_id, redirect_uri });
    });*/
});
