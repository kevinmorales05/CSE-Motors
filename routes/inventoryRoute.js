const express = require("express");
const router = new express.Router(); 
const inventoryController = require("../controllers/inventoryController");
const invController = require("../controllers/invController");
const regValidate = require("../utilities/addClassification-validation");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/", invController.buildManagement);
router.get("/addClassification", invController.buildNewClassification);
router.get("/newVehicle", invController.buildNewVehicle);
router.post("/addVehicle", inventoryController.addVehicle);
router.post("/addClassification", 
regValidate.addClassificationRules(),
regValidate.checkRegData,
inventoryController.addClassification);

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));
router.get("/edit/:inv_id", invController.editInventoryView);
router.post("/update/", invController.updateInventory)


module.exports = router;