import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./src/components/Splashscreen";
import MainContent from "./src/components/MainContent";
import Dashboard from "./src/components/Dashboard";
import PatientList from "./src/components/PatientList";
import DoctorList from "./src/components/DoctorList";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/doctors" element={<DoctorList />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
