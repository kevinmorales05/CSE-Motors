/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute");
const detailRoute = require("./routes/detailRoute");


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
app.use("/inv/detail", detailRoute);

//inventory routes
app.get("/", baseController.buildHome);

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
    let nav = await utilities.getNav()
    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    res.render("errors/error", {
      title: err.status || 'Server Error',
      message: err.message,
      nav
    })
  })

  // File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, we appear to have lost that page.'})
  })
/* ***********************
* Log statement to confirm server operation
* *********************** */
app.listen(PORT, () => {
console.log(`The best cars app listening on ${HOST}:${PORT}`)
})
