require("dotenv").config();
const movieRoutes = require("./routes/movies/movies");
const express = require("express");
const db = require("./db/index");

const app = new express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/movies",movieRoutes);

db();


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
} );

