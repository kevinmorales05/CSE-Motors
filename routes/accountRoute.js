const express = require("express");
const router = new express.Router(); 
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");
const utilities = require("../utilities/index");
// Route to build inventory by classification view
router.get("/login", accountController.buildLogin);
router.get("/register", accountController.buildRegister);
//router.post('/register', utilities.handleErrors(accountController.registerAccount))
router.post('/register', 
regValidate.registationRules(),
regValidate.checkRegData,
//utilities.handleErrors(accountController.registerAccount)
accountController.registerAccount);


module.exports = router;