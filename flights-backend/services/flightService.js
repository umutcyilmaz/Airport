const axios = require("axios");
const Flight = require("../models/flightModel");

// API'den uçuş verilerini çekme ve MongoDB'ye kaydetme
const fetchAndSaveFlights = async (res) => {
  const API_KEY = process.env.SCHIPHOL_API_KEY;
  const APP_ID = process.env.SCHIPHOL_APP_ID;
  const BASE_URL = "https://api.schiphol.nl/public-flights/flights";

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        ResourceVersion: "v4",
        app_id: APP_ID,
        app_key: API_KEY,
      },
      
    });

    const flights = response.data.flights;

    // MongoDB'ye uçuş verilerini kaydetme
    const bulkOps = flights.map((flight) => ({
      updateOne: {
        filter: { _id: flight.id }, // Kayıtları uçuş ID'sine göre filtrele
        update: {
          $set: {
            flightNumber: flight.flightNumber || null,
            scheduleDateTime: flight.scheduleDateTime || null,
            actualLandingTime: flight.actualLandingTime || null,
            actualOffBlockTime: flight.actualOffBlockTime || null,
            publicFlightState: flight.publicFlightState?.flightStates || [],
            route: {
              destinations: flight.route?.destinations || [],
              eu: flight.route?.eu || null,
              visa: flight.route?.visa || null,
            },
            aircraftRegistration: flight.aircraftRegistration || null,
            aircraftType: flight.aircraftType || null,
            baggageClaim: flight.baggageClaim || null,
            checkinAllocations: flight.checkinAllocations || null,
            estimatedLandingTime: flight.estimatedLandingTime || null,
            expectedTimeBoarding: flight.expectedTimeBoarding || null,
            expectedTimeGateClosing: flight.expectedTimeGateClosing || null,
            expectedTimeGateOpen: flight.expectedTimeGateOpen || null,
            expectedTimeOnBelt: flight.expectedTimeOnBelt || null,
            flightDirection: flight.flightDirection || null,
            flightName: flight.flightName || null,
            gate: flight.gate || null,
            pier: flight.pier || null,
            isOperationalFlight: flight.isOperationalFlight || null,
            mainFlight: flight.mainFlight || null,
            prefixIATA: flight.prefixIATA || null,
            prefixICAO: flight.prefixICAO || null,
            airlineCode: flight.airlineCode || null,
            publicEstimatedOffBlockTime:
              flight.publicEstimatedOffBlockTime || null,
            scheduleDate: flight.scheduleDate || null,
            scheduleTime: flight.scheduleTime || null,
            serviceType: flight.serviceType || null,
            terminal: flight.terminal || null,
            transferPositions: flight.transferPositions || null,
            lastUpdatedAt: flight.lastUpdatedAt || null,
          },
        },
        upsert: true,
      },
    }));

    await Flight.bulkWrite(bulkOps); // Toplu yazma işlemi
    res.json(flights);
  } catch (error) {
    console.error("API isteğinde hata:", error);
    throw new Error("Veri çekilemedi");
  }
};

const fetchWithDate = async (scheduleDate) => {
  const API_KEY = process.env.SCHIPHOL_API_KEY;
  const APP_ID = process.env.SCHIPHOL_APP_ID;
  const BASE_URL = "https://api.schiphol.nl/public-flights/flights";

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        ResourceVersion: "v4",
        app_id: APP_ID,
        app_key: API_KEY,
      },
      params: {
        scheduleDate, // scheduleDate parametresini API'ye geçiyoruz
      },
    });

    // API yanıtı dönüyoruz
    return response;
  } catch (error) {
    throw new Error("Veri çekilemedi: " + error.message);
  }
};

module.exports = { fetchAndSaveFlights, fetchWithDate }; // Fonksiyonu dışarı aktarma
