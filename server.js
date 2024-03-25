/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ******************************************
 * Server host name and port
 * ***************************************** */
const HOST = 'localhost'
const PORT = 3000

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
