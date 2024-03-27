/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute");


//Controllers
const baseController = require("./controllers/baseController");

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
app.use("/inv", inventoryRoute);

//inventory routes
app.get("/", baseController.buildHome);

/* ******************************************
 * Default GET route
 * ***************************************** */


/* ***********************
* Log statement to confirm server operation
* *********************** */
app.listen(PORT, () => {
console.log(`The best cars app listening on ${HOST}:${PORT}`)
})
