// src/App.tsx
import React from "react";
import FlightList from "./components/FlightList";
import { Route, Routes, useLocation } from "react-router-dom";
import MyFlights from "./components/MyFlights/MyFlights";
import FlightSearch from "./components/FlightSearch/FlightSearch";
import FlightsFilter from "./components/FlightsFilter/FlightsFilter";
import Layout from "./layout";

const App: React.FC = () => {
  const location = useLocation();
  const ok = "/my-flights" !== location.pathname;

  return (
    <div>
      <Layout>
        <div className="mt-6">
          {ok && <FlightSearch />}
          <div className="px-4 py-12">
            <Routes>
              <Route path="/" element={<FlightList />} />
              <Route path="/:scheduleDate" element={<FlightsFilter />} />
              <Route path="/my-flights" element={<MyFlights />} />
            </Routes>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default App;
