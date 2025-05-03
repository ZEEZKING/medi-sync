import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserFriends,
  FaHeartbeat,
  FaProcedures,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../css/dashboard.css";
import PatientModal from "./PatientModal";  // Import the modal

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([
    { id: "001", name: "John Doe", age: 45, condition: "Flu", vitals: { bp: "120/80", hr: "72 bpm" } },
    { id: "002", name: "Jane Smith", age: 30, condition: "High Fever", vitals: { bp: "110/75", hr: "80 bpm" } },
  ]);

  const addPatient = (patientData) => {
    const newPatient = {
      id: String(patients.length + 1).padStart(3, "0"),
      ...patientData,
    };
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </button>
        <h2>MEDI-Sync</h2>
        <ul>
          <li>
            <FaHome /> Dashboard
          </li>
          <li>
            <FaUserFriends /> Patients
          </li>
          <li>
            <FaHeartbeat /> Doctors
          </li>
          <li>
            <FaProcedures /> Emergency
          </li>
          <li className="logout">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1>Dashboard</h1>
          <button className="new-patient-btn" onClick={() => setShowModal(true)}>
            ➕ New Patient
          </button>
        </header>

        <div className="widgets">
          <Link to="/patients" className="widget">
            <FaUserFriends className="card-icon" />
            <h3>Patient Queue</h3>
            <div className="summary">
              <p>{patients.length} recent patients</p>
              <p>Click to view details</p>
            </div>
          </Link>
          <div className="widget">
            <Link to="/doctors" className="widget"/>
            <FaHeartbeat className="card-icon" />
            <h3>Doctor Status</h3>
          </div>
          <div className="widget">
            <FaProcedures className="card-icon" />
            <h3>Emergency Alerts</h3>
            <p>No active emergency alerts</p>
          </div>
        </div>
      </main>

      {/* Patient Modal */}
      {showModal && <PatientModal onClose={() => setShowModal(false)} addPatient={addPatient} />}
    </div>
  );
};

export default Dashboard;
