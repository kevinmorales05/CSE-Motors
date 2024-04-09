const invModel = require("../models/inventory-model");
const utilities = require("../utilities/index");
/* ****************************************
*  Process Classification
* *************************************** */
async function addClassification(req, res) {
    let nav = await utilities.getNav();
    console.log('this is the body ', req.body)
    const { classification_name } = req.body
  
    const regResult = await invModel.addClassification(
      classification_name
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you created a new vechicle classification`
      )
      console.log('New vehicle classification created succesfully!')
      res.status(201).render("/inv", {
        title: "Vehicle Management",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("/inv", {
        title: "Error adding a new classification!",
        nav,
      })
    }
  }
async function addVehicle(req, res) {
    let nav = await utilities.getNav();
    console.log('this is the body ', req.body)
    const { classification_id,inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, inv_image, inv_thumbnail } = req.body
    
    const regResult = await invModel.addVehicle(
        inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    )
  console.log('this is the result ', regResult);
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you created a new vehicle ${inv_model}.`
      )
      console.log('Vehicle created succesfully!')
      res.status(201).render("inventory/management", {
        title: "Login",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the  vehicle add failed.")
      res.status(501).render("inventory/management", {
        title: "Registration",
        nav,
      })
    }
  }

module.exports = { addClassification, addVehicle}