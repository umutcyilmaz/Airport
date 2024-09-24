export interface Flight {
  id: string; // Uçuş ID'si
  flightNumber: string; // Uçuş numarası
  lastUpdatedAt: string; // Son güncelleme tarihi
  actualLandingTime: string; // Gerçek iniş zamanı
  actualOffBlockTime: string; // Gerçek kalkış zamanı
  estimatedLandingTime: string; // Tahmini iniş zamanı
  expectedTimeBoarding: string; // Beklenen biniş zamanı
  expectedTimeGateClosing: string; // Beklenen kapı kapanma zamanı
  expectedTimeGateOpen: string; // Beklenen kapı açılma zamanı
  expectedTimeOnBelt: string; // Beklenen bagaj alma zamanı
  flightDirection: string; // Uçuş yönü
  flightName: string; // Uçuş adı
  gate: string; // Kapı
  pier: string; // Iskele
  isOperationalFlight: boolean; // Uçuşun operasyonel olup olmadığı
  publicEstimatedOffBlockTime: string; // Tahmini kalkış zamanı
  publicFlightState: {
    flightStates: string[]; // Kalkış durumu dizisi
  };
  route: {
    destinations: string[]; // Varış yerleri dizisi
    eu: string; // AB'ye giriş durumu
    visa: boolean; // Vize gerekliliği
  };
  aircraft: {
    registration: string; // Uçak kaydı
    type: {
      iataMain: string; // Ana IATA kodu
      iataSub: string; // Alt IATA kodu
    };
  };
  baggageClaim: {
    belts: string[]; // Bagaj alma bantları
  };
  checkinAllocations: {
    checkinAllocations: {
      startTime: string;
      endTime: string;
      rows: {
        rows: {
          position: string;
          desks: {
            desks: {
              checkinClass: {
                code: string;
                description: string;
              };
              position: number;
            }[];
          }[];
        }[];
      }[];
      remarks: {
        remarks: string[];
      };
    }[];
  };
  scheduleDateTime: string; // Planlanan kalkış zamanı
  scheduleDate: string; // Planlanan tarih
  scheduleTime: string; // Planlanan zaman
  serviceType: string; // Hizmet türü
  terminal: number; // Terminal
  transferPositions: {
    transferPositions: number[]; // Transfer pozisyonları
  };
  schemaVersion: string; // Şemaya ait versiyon
}
