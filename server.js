/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config()
const static = require("./routes/static")

/* ******************************************
 * Server host name and port
 * ***************************************** */
const PORT = process.env.PORT
const HOST = process.env.HOST


const app = express();

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.use(static);



/* ******************************************
 * Default GET route
 * ***************************************** */
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
    //res.send("Welcome home!");
})

/* ***********************
* Log statement to confirm server operation
* *********************** */
app.listen(PORT, () => {
console.log(`The best cars app listening on ${HOST}:${PORT}`)
})
