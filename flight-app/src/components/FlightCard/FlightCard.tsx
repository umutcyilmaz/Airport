import React, { useEffect, useState } from "react";
import { Flight } from "../../types/FlightTypes";
import {
  calculateFlightDuration,
  getHourFromScheduleDateTime,
} from "../../utils";
import { FaPlane } from "react-icons/fa";
import { RiFlightLandFill, RiFlightTakeoffFill } from "react-icons/ri";
import Modal from "../Modal/Modal";

interface FlightCardProps {
  flight: Flight;
  onRemove?: (id: string) => void; // Remove butonu için prop ekliyoruz
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onRemove }) => {
  const [bookedFlights, setBookedFlights] = useState<Flight[]>([]);

  //Modal
  const [isModalOpen, setModalOpen] = useState(false); // Modal açılma durumu
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const handleCloseModal = () => {
    setModalOpen(false); // Modal'ı kapat
  };

  useEffect(() => {
    // LocalStorage'dan rezervasyonlu uçuşları al
    const storedBookedFlights = localStorage.getItem("bookedFlights");
    if (storedBookedFlights) {
      setBookedFlights(JSON.parse(storedBookedFlights));
    }
  }, []);

  const bookFlight = () => {
    const storedFlights = localStorage.getItem("bookedFlights");
    let bookedFlights: Flight[] = storedFlights
      ? JSON.parse(storedFlights)
      : [];

    if (!bookedFlights.some((f) => f.id === flight.id)) {
      bookedFlights.push(flight);
      localStorage.setItem("bookedFlights", JSON.stringify(bookedFlights));
      setBookedFlights(bookedFlights);
      setModalContent({
        title: 'Gule Gule Ucun!',
        description: 'Biletiniz biletlerim kismina eklendi.'
      });
      setModalOpen(true); // Modal'ı aç
      // alert("Bilet başarıyla eklendi!");
    }
  };

  const isFlightBooked = (flightId: string) => {
    return bookedFlights.some((flight) => flight.id === flightId);
  };

  const arriveTime = getHourFromScheduleDateTime(flight.estimatedLandingTime);
  const startTime = getHourFromScheduleDateTime(flight.scheduleDateTime);
  const flightDuration = calculateFlightDuration(flight);

  return (
    <div className="bg-white rounded-xl m-10 p-6 py-4 flex flex-col justify-between shadow-md">
      <div className="font-bold flex justify-between mb-4">
        <div>
          {flight.publicFlightState.flightStates.join(", ")} -{" "}
          {flight.route.destinations.join(", ")}
        </div>
        <div>
          <div className="font-bold">{flight.flightName}</div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            Kalkis <RiFlightTakeoffFill />
          </div>
          <div className="flex gap-2 items-center">
            Havaalani:{" "}
            <p className="font-semibold">
              {flight.publicFlightState.flightStates.join(", ")}
            </p>{" "}
          </div>
          <div className="font-semibold">{startTime}</div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div>
            <FaPlane size={24} />{" "}
          </div>
          <div>{flightDuration}</div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            Varis <RiFlightLandFill />
          </div>
          <div>Havaalani: {flight.route.destinations.join(", ")}</div>
          <div className="font-semibold">{arriveTime}</div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          Ucret: <p className="font-bold">230$</p>{" "}
        </div>
        <div>
          {onRemove ? ( // Eğer onRemove fonksiyonu varsa Kaldır butonunu göster
            <button
              className="bg-red-500 p-2 rounded-md text-white font-medium"
              onClick={() => onRemove(flight.id)}
            >
              Remove
            </button>
          ) : (
            <div>
              {isFlightBooked(flight.id) ? (
                <button
                  disabled
                  className="bg-gray-500 p-2 rounded-md text-white"
                >
                  Already Booked
                </button>
              ) : (
                <button
                  onClick={bookFlight}
                  className="bg-blue-500 p-2 rounded-md text-white font-medium"
                >
                  Book Flight
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        description={modalContent.description}
      />
    </div>
  );
};

export default FlightCard;
