const { curly } = require('node-libcurl');

const express = require("express");
const https = require("https");
const fs = require("fs");

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://darielbombsquad.flowgear.net";
const app = express();

const httpsOptions = {
    key: fs.readFileSync("./proxy/mycert.key"),
    cert: fs.readFileSync("./proxy/mycert.crt"),
    requestCert: false,
    rejectUnauthorized: false
};

app.options("*", async (req, res) => {
    // preflight request
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.sendStatus(204);
});

app.use("*", async (req, res) => {
    // rerender request with curl
    let headerss = [];
    Object.entries(req.headers).forEach(([key, value]) => {
        if (key === "host"
            || key === "referer"
            || key === "sec-fetch-site"
            || key === "sec-fetch-dest"
            || key === "sec-ch-ua"
            || key === "sec-ch-ua-mobile"
            || key === "vary"
            || key === "content-type"
            || key === "access-control-allow-origin"
            || key === "sec-ch-ua-platform"
            || key == "origin"
        ) return;
        headerss.push(`${key}:${value}`);
    });

    const { statusCode, data, headers } = await curly.get(BASE_URL + req.originalUrl, {
        httpHeader: headerss
    });

    console.log("RESPONSE\n",
        JSON.stringify({
            enteredUrl: BASE_URL + req.originalUrl,
            enteredHeaders: headerss,
            headers,
            status: statusCode,
            body: data,
        }, null, 2));

    res.set(headers);
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
    res.status(statusCode);
    res.send(data);
});

const server = https.createServer(httpsOptions, app);
server.listen(3001, () => {
    console.log("proxy is listening on port 3001");
});