const express = require("express");
const flightController = require("../controllers/flightController");
const router = express.Router();

// Uçuş verilerini almak için route
router.get("/", flightController.getFlights);

// Belirli bir tarihe göre uçuş verilerini almak için route
router.get("/:scheduleDate", flightController.getFlightsByScheduleDate);

// Belirli bir uçuşu ID ile almak için route
router.get("/:id", flightController.getFlightById);

module.exports = router; // Rotaları dışarı aktarma
