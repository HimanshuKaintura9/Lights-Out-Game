
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Home page: choose grid dimensions
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Game page: display the selected grid
app.post("/game", (req, res) => {
    const rows = Number(req.body.rows);
    const cols = Number(req.body.cols);

    if (
        !Number.isInteger(rows) ||
        !Number.isInteger(cols) ||
        rows < 1 || rows > 15 ||
        cols < 1 || cols > 15
    ) {
        return res.status(400).send("Choose rows and columns from 1 to 15.");
    }

    res.render("game.ejs", { rows, cols });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
