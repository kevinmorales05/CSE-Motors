const express = require("express");
const router = new express.Router(); 
const inventoryController = require("../controllers/inventoryController");
const invController = require("../controllers/invController");
const regValidate = require("../utilities/addClassification-validation");

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

module.exports = router;