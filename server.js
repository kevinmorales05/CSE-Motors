/* ******************************************
 * This is the application server
 * ******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session")
const pool = require('./database/')
const env = require("dotenv").config()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute");
const detailRoute = require("./routes/detailRoute");
const accountRoute = require("./routes/accountRoute");
const bodyParser = require("body-parser");
const utilities = require("./utilities/");


//Controllers
const baseController = require("./controllers/baseController");

/* ******************************************
 * Server host name and port
 * ***************************************** */
const PORT = process.env.PORT
const HOST = process.env.HOST


const app = express();

/* ***********************
 * Middleware
 * ************************/
app.use(session({
    store: new (require('connect-pg-simple')(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
  }))


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.use(static);
app.use("/inv", inventoryRoute);
app.use("/inv/detail", detailRoute);
app.use("/account", accountRoute);

//inventory routes
app.get("/", utilities.handleErrors(baseController.buildHome));

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
      nav,
      errors: null,
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
