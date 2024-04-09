const jwt = require("jsonwebtoken");
require("dotenv").config();
const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul id='build-inventory'>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleCard = async function (data) {
  let card;
  if (data) {
    card = '<div id="vehicle-display">';
    
      card+= '<div class="vehicle-block">';
        card+= '<img src="'+ data.inv_thumbnail +'" alt="Image of ' +
        data.inv_make +
        " " +
        data.inv_model +
        ' on CSE Motors" />';

      card+= '</div>';

      card+= '<div class="vehicle-block">';
        card+= '<h2>'+ data.inv_make + " " +data.inv_model + ' Details </h2>';
        card+= '<div class="price-block">';
          card+= '<p><b>Price: ' + "<span>$" +
          new Intl.NumberFormat("en-US").format(data.inv_price) +
          "</span>" +'</b></p>';
        card+= '</div>';
        card+= '<p><b>Description: </b>'+ data.inv_description +'</p>';
        card+= '<div class="price-block">';
          card+= '<p><b>Color:</b> ' + data.inv_color +'</p>';
        card+= '</div>';
        card+= '<p><b>Miles: </b>'+ new Intl.NumberFormat("en-US").format(data.inv_miles) +'</p>';
      card+= '</div>';

    card += "</div>";
  } else {
    card += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return card;
};

Util.buildInventoryAdd = async function () {
  let block;
  block += '<ul id="inventory-options"></ul>'
  block += '<li><a href="/inv/addClassification" >Add New Classification</a></li>'
  block += '<li><a href="/inv/newVehicle" >Add New Vehicle</a></li>'
  block += '</ul>'
  return block;
}

Util.buildClassificationList = async function () {
  let data = await invModel.getClassifications();
  let classification_id = null;
  console.log('data from build ', data.rows)
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"

    return classificationList;
}

Util.buildInventoryAddVehicle = async function () {
  
  let data = await invModel.getClassifications();
  let classification_id = null;
  console.log('data from build ', data.rows)
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"

  let block = '<div class="blockAddClass" >';
  block += '<form class="blockAddClassForm" action="/inv/addVehicle" method="POST">';
  block += '<label for="classification_id">Classification:</label>';
  block += classificationList + '<br><br/>';
  block += '<label for="inv_make">Make:</label>';
  block += '<input type="text" id="inv_make" name="inv_make" required placeholder="Min of 3 characters"><br>';

  block += '<label for="inv_model">Model:</label>';
  block += '<input type="text" id="inv_model" name="inv_model" placeholder="Min of 3 characters" required><br>';

  block += '<label for="inv_description">Description:</label>';
  block += '<textarea id="inv_description" name="inv_description" required></textarea><br>';

  block += '<label for="inv_image">Image Path:</label>';
  block += '<input type="text" id="inv_image" name="inv_image" value="/images/vehicles/no-image.png" required><br>';

  block += '<label for="inv_thumbnail">Thumbnail Path:</label>';
  block += '<input type="text" id="inv_thumbnail" name="inv_thumbnail" value="/images/vehicles/no-image.png" required><br>';

  block += '<label for="inv_price">Price:</label>';
  block += '<input type="number" id="inv_price" name="inv_price" placeholder="Decimal or integer" required><br>';

  block += '<label for="inv_year">Year:</label>';
  block += '<input type="number" id="inv_year" name="inv_year" placeholder="4-digit year" required><br>';

  block += '<label for="inv_miles">Miles:</label>';
  block += '<input type="number" id="inv_miles" name="inv_miles" placeholder="digits only" required><br>';

  block += '<label for="inv_color">Color:</label>';
  block += '<input type="text" id="inv_color" name="inv_color" required><br>';

  block += '<button type="submit">Add vehicle</button>';
  block += '</form>';

  return block;
}

Util.buildInventoryAddClassification = async function () {
  let block = '<div  class="blockAddClass" >';
  block += '<form class="blockAddClassForm" action="/inv/addClassification" method="POST">';
  block += '<label for="classification_name">Classification Name:</label>';
  block += '<p>NAME MUST BE ALPHABETIC CHARACTERS ONLY.</p>';
  block += '<input type="text" id="classification_name" name="classification_name" required>';
  block += '<button type="submit">Add classification</button>';
  block += '</form>';
  block += '</div>';
  return block;
}

Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }
/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }


module.exports = Util;
