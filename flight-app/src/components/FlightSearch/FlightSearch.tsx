import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FlightSearch: React.FC = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //Input a 3 degerin de girildiginin sorgusu
  const notActive = !departure || !destination || !scheduleDate;

  //Url ile ile gelinirse input degerlerini doldurmak icin
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryPathname = location.pathname;
    const date = queryPathname.slice(1);

    const dep = queryParams.get("departureState");
    const dest = queryParams.get("destination");

    if (dep) setDeparture(dep.toUpperCase());
    if (dest) setDestination(dest.toUpperCase());
    if (date) setScheduleDate(date);
  }, [location]);
  //Verilen girdilere gore URL e gitmek icin
  const handleSearch = () => {
    if (notActive) {
      setErrorMessage("Lütfen kalkış ve varış noktalarını doldurun.");
      return;
    }
    // Hata mesajını temizle
    setErrorMessage("");
    // URL'yi güncelle
    navigate(
      `/${scheduleDate}?departureState=${departure.toUpperCase()}&destination=${destination.toUpperCase()}`
    );
  };

  return (
    <div className="m-auto flex justify-center">
      <div className="border-4 rounded-l-md">
        <input
          className="border-r-4 h-full p-2 "
          type="text"
          placeholder="Kalkış"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          className="p-2 border-r-4"
          type="text"
          placeholder="Varış"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          className="p-2"
          type="date"
          placeholder="Tarih"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)} // Tarih inputu
        />
      </div>
      <button
        className={` bg-blue-500 p-2 px-6 text-white rounded-r-md ${
          notActive ? "opacity-40" : ""
        }`}
        onClick={handleSearch}
        disabled={notActive}
      >
        Ara
      </button>

      {/* Eğer bir hata varsa göster */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default FlightSearch;
