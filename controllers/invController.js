const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id);
  console.log('data de nuevo modelo ', data)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  let buildInventory =  await utilities.buildInventoryAdd();
  console.log('build inventory ', buildInventory);
  const classificationSelect = await utilities.buildClassificationList();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    buildInventory,
    classificationSelect,
    errors: null,
   

  })
  }

  invCont.buildNewVehicle = async function (req, res, next) {
    let nav = await utilities.getNav();
    let buildInventory =  await utilities.buildInventoryAddVehicle();
    res.render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      buildInventory,
      errors: null,
    })
    }

  invCont.buildNewClassification = async function (req, res, next) {
      let nav = await utilities.getNav();
      let buildInventory =  await utilities.buildInventoryAddClassification();
      res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        buildInventory,
        errors: null,
      })
      }

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


module.exports = invCont