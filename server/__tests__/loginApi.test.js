import request from "supertest";
import express from "express";
import {LoginApi} from "../LoginApi";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {ApplicationApiContext} from "../../client/util/applicationApiContext";

const { registerLogin } = useContext(ApplicationApiContext);
const app = express();
app.use(cookieParser("test secret"));
app.use(bodyParser.json());
app.use("/api/login", LoginApi);

describe("loginApi", () => {
    it("jklas", () => {
        re
    });

});
