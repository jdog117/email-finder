import express from "express";
import cors from "cors";
import { verifyEmail } from "./src/lib/verifyEmail.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/verifyEmail", async (req, res) => {
    const { website, personName } = req.query;

    try {
        const verifiedEmail = await verifyEmail(website, personName);
        res.status(200).send(verifiedEmail);
    } catch (error) {
        res.status(400).send("Email verification failed: " + error.message);
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// node server.js TO RUN
// http://localhost:3001/verifyEmail?website=example.com&personName=john.doe
