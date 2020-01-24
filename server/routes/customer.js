const express = require("express");
const router = express.Router();
const {
	addCustomer,
	addAppointment
} = require("../controller/customerController");

// middleware that is specific to this router

// define the home page route

// define the about route
router.post("/add_customer", addCustomer);
router.post("/add_appointment", addAppointment);

module.exports = router;
