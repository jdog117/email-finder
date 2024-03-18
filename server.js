const express = require("express");
const cors = require("cors");
const verifyEmail = require("./verifyEmail.js").verifyEmail;
const https = require("https");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/verifyEmail", async (req, res) => {
    const { website, personName } = req.query;

    try {
        const verifiedEmail = await verifyEmail(website, personName);
        console.log(verifiedEmail);
        res.status(200).json(verifiedEmail);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// HTTPS server
https
    .createServer(
        {
            key: fs.readFileSync(
                "/etc/letsencrypt/live/ninamori.us/privkey.pem"
            ),
            cert: fs.readFileSync(
                "/etc/letsencrypt/live/ninamori.us/fullchain.pem"
            ),
        },
        app
    )
    .listen(443, () => {
        console.log("HTTPS Server is running on port 443");
    });
