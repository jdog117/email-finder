import express from "express";
import cors from "cors";
import { verifyEmail } from "../src/lib/verifyEmail.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/verifyEmail", async (req, res) => {
    const { website, personName } = req.query;

    try {
        const verifiedEmail = await verifyEmail(website, personName);
        res.status(200).send(verifiedEmail);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

export default app;