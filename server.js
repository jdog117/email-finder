const express = require("express");
const cors = require("cors");
const verifyEmail = require("./verifyEmail.js").verifyEmail;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/static", { dotfiles: "allow" }));

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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
app.listen(80, () => {
    console.log("Server is running on port 80");
});
