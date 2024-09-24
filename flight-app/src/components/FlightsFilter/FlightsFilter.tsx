import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Flight } from "../../types/FlightTypes";
import FlightCard from "../FlightCard/FlightCard";

const FlightsFilter: React.FC = () => {
  const { scheduleDate } = useParams(); // Dinamik route'dan scheduleDate alıyoruz
  const location = useLocation(); // Query parametrelerini almak için

  const searchParams = new URLSearchParams(location.search);
  const departure = searchParams.get("departureState");
  const destination = searchParams.get("destination");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/flights/${scheduleDate}?departure=${departure}&destination=${destination}`
      );
      if (!response.ok) {
        // throw new Error("Uçuş verileri alınamadı");
        navigate(`/`);
      }
      const data = await response.json();

      setFlights(data); // Gelen verileri duruma ekleyin
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Hata mesajını al
      } else {
        setError("Bilinmeyen bir hata oluştu"); // Hata türü tanımlanmadıysa
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [departure, destination, scheduleDate]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div>
      <h1 className="flex justify-center text-2xl font-bold">Uçuş Sonuçları</h1>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <h1 className="text-2xl font-bold flex justify-center text-red-600 mt-4">
            Aradiginiz kriterlerde ucus bulunmamaktadir
          </h1>
        )}
      </ul>
    </div>
  );
};

export default FlightsFilter;
