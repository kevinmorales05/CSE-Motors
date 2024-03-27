const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/detailController");
// Route to build inventory by classification view
router.get("/:inv_id", invController.buildByVehiculeId);

module.exports = router;