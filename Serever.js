const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/chat", async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: req.body.message }
            ],
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Chat failed" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
