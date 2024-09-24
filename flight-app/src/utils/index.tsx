import { Flight } from "../types/FlightTypes";

export const getHourFromScheduleDateTime = (
  scheduleDateTime: string
): string | null => {
  if (!scheduleDateTime) {
    return "Uçuş süre bilgisi mevcut değil.";
  }

  // ScheduleDateTime formatını Date nesnesine çeviriyoruz
  const date = new Date(scheduleDateTime);

  // Saat bilgisini alıyoruz
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // AM/PM belirleme
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // 12 saat formatına çevir
  hours = hours ? hours : 12; // 0 saatini 12 yap

  // Saat ve dakikayı döndürüyoruz, dakikayı iki basamaklı hale getiriyoruz
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
};

export const calculateFlightDuration = (flight: Flight): string => {
  const { scheduleDateTime, estimatedLandingTime } = flight;

  if (!scheduleDateTime || !estimatedLandingTime) {
    return "Uçuş süre bilgisi mevcut değil.";
  }

  const departureTime = new Date(scheduleDateTime);
  const arrivalTime = new Date(estimatedLandingTime);

  const durationInMilliseconds =
    arrivalTime.getTime() - departureTime.getTime();

  if (durationInMilliseconds < 0) {
    return "Uçuş süre bilgisi mevcut değil.";
  }

  const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (hours > 0) {
    return `${hours} saat ${minutes} dakika`;
  } else {
    return `${minutes} dakika`;
  }
};
