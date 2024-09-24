import React, { useEffect, useState } from "react";
import { Flight } from "../../types/FlightTypes";
import FlightCard from "../FlightCard/FlightCard";
import Modal from "../Modal/Modal";

const MyFlights: React.FC = () => {
  const [bookedFlights, setBookedFlights] = useState<Flight[]>([]);
  //Modal
  const [isModalOpen, setModalOpen] = useState(false); // Modal açılma durumu
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const storedFlights = localStorage.getItem("bookedFlights");
    if (storedFlights) {
      setBookedFlights(JSON.parse(storedFlights));
    }
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false); // Modal'ı kapat
  };

  const removeFlight = (id: string) => {
    const updatedFlights = bookedFlights.filter((flight) => flight.id !== id);
    setBookedFlights(updatedFlights); // Ekranı güncelle
    localStorage.setItem("bookedFlights", JSON.stringify(updatedFlights)); // localStorage'ı güncelle
    setModalContent({
      title: 'Ucunuz kaldirildi!',
      description: 'Tekrar bekleriz.'
    });
    setModalOpen(true); // Modal'ı aç
    // alert("Bilet kaldırıldı.");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold flex justify-center">Biletlerim</h1>
      {bookedFlights.length > 0 ? (
        bookedFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} onRemove={removeFlight} />
        ))
      ) : (
        <h1 className="text-2xl font-bold flex justify-center text-red-600 mt-4">
          Henuz biletiniz yok.
        </h1>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        description={modalContent.description}
      />
    </div>
  );
};

export default MyFlights;
