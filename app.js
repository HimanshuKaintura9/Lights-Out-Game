
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const MIN_SIZE = 2;
const MAX_SIZE = 10;

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/game", (req, res) => {
    const rows = Number(req.body.rows);
    const cols = Number(req.body.cols);

    const valid =
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_SIZE &&
        rows <= MAX_SIZE &&
        cols >= MIN_SIZE &&
        cols <= MAX_SIZE;

    if (!valid) {
        return res.status(400).render("index", {
            error: "Choose between 2 and 10 rows and columns."
        });
    }

    res.render("game", { rows, cols });
});

app.listen(PORT, () => {
    console.log(`Lights Out running at http://localhost:${PORT}`);
});
