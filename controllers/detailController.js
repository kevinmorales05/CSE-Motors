const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByVehiculeId = async function (req, res, next) {
  const vehicle_id = req.params.inv_id
  const data = await invModel.getVehicleDetail(vehicle_id)
  const vehicleDetail = await utilities.buildVehicleCard(data)
  let nav = await utilities.getNav()
  const brand = data.inv_make
  const vehicleName = data.inv_model
  const year = data.inv_year
  res.render("./vehicleDetail/vehicle", {
    title: year + " " + brand + " " + vehicleName,
    nav,
    vehicleDetail,
  })
}

module.exports = invCont