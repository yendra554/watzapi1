const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");

router.get("/getSignature/" , userController.getSignature);

router.get("/getAllList/", userController.getAllList);
router.get("/login/", userController.login);
router.get("/cryptoPay/", userController.cryptoPay);
router.get("/getTransaction/", userController.getTransaction);
router.get("/createInvoice/", userController.createInvoice);
router.get("/getInvoice/", userController.getInvoice);

// router.post("/login/", userController.login);

module.exports = router;