const flightService = require("../services/flightService");

// Uçuş verilerini getirir
const getFlights = async (req, res) => {
  try {
    await flightService.fetchAndSaveFlights(res); // Uçuş verilerini çekme ve kaydetme
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Uçuşları tarih ile getirir
const getFlightsByScheduleDate = async (req, res) => {
  const scheduleDate = req.params.scheduleDate;
  const departureState = req.query.departureState;
  const destination = req.query.destination;

  try {
    // API'den uçuş verilerini çekme
    const response = await flightService.fetchWithDate(scheduleDate);
    let flights = response.data.flights;

    // Filtreleme işlemleri
    if (departureState || destination) {
      flights = flights.filter((flight) => {
        const matchesDepartureState = departureState
          ? flight.publicFlightState.flightStates.includes(departureState)
          : true;
        const matchesDestination = destination
          ? flight.route.destinations.includes(destination)
          : true;
        return matchesDepartureState && matchesDestination;
      });
    }
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Uçuşu ID ile getirir
const getFlightById = async (req, res) => {
  const flightId = req.params.id;

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Uçuş bulunamadı" });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: "Veri çekilemedi" });
  }
};

module.exports = {
  getFlights,
  getFlightsByScheduleDate,
  getFlightById,
};
