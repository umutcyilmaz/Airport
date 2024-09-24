import React, { useEffect, useState } from "react";
import axios from "axios";
// import FlightDetails from "./FlightDetails"; // FlightDetails bileşenini içe aktar
import FlightsFilter from "./FlightsFilter/FlightsFilter";
import FlightSearch from "./FlightSearch/FlightSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FlightCard from "./FlightCard/FlightCard";
import { Flight } from "../types/FlightTypes";

const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/flights");
        setFlights(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleFlightClick = (id: string) => {
    setSelectedFlightId(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div>
      <div className="text-2xl font-bold flex items-center justify-center">Bugunun Ucuslari</div>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id}>
              <FlightCard key={flight.id} flight={flight} />
            </div>
          ))
        ) : (
          <p>Sonuç bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default FlightList;
