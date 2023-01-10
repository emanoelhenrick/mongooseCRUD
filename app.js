const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

const linkRoute = require("./routes/linkRoute");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1/newlinks");

const db = mongoose.connection;

db.on("error", () => console.log("houve um erro"));
db.once("open", () => {
	console.log("banco carregado");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", linkRoute);


app.listen(port, () => console.log("listening on port 3000"));