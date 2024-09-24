const mongoose = require("mongoose");

// Mongoose Flight Schema oluşturma
const flightSchema = new mongoose.Schema({
  _id: String,
  flightNumber: String,
  lastUpdatedAt: String,
  actualLandingTime: String,
  actualOffBlockTime: String,
  estimatedLandingTime: String,
  expectedTimeBoarding: String,
  expectedTimeGateClosing: String,
  expectedTimeGateOpen: String,
  expectedTimeOnBelt: String,
  flightDirection: String,
  flightName: String,
  gate: String,
  pier: String,
  isOperationalFlight: Boolean,
  publicEstimatedOffBlockTime: String,
  publicFlightState: {
    flightStates: [String],
  },
  route: {
    destinations: [String],
    eu: String,
    visa: Boolean,
  },
  aircraft: {
    registration: String,
    type: {
      iataMain: String,
      iataSub: String,
    },
  },
  baggageClaim: {
    belts: [String],
  },
  checkinAllocations: {
    checkinAllocations: [
      {
        startTime: String,
        endTime: String,
        rows: {
          rows: [
            {
              position: String,
              desks: {
                desks: [
                  {
                    checkinClass: {
                      code: String,
                      description: String,
                    },
                    position: Number,
                  },
                ],
              },
            },
          ],
        },
        remarks: {
          remarks: [String],
        },
      },
    ],
  },
  scheduleDateTime: String,
  scheduleDate: String,
  scheduleTime: String,
  serviceType: String,
  terminal: Number,
  transferPositions: {
    transferPositions: [Number],
  },
  schemaVersion: String,
});

// Flight modelini oluşturma
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight; // Modeli dışarı aktarma
