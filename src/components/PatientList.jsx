import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/patientlist.css";
import PatientModal from "./PatientModal";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch patient list from backend
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:8080/patientissues");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(); // Fetch on component mount
  }, []);

  return (
    <div className="patient-list-container">
      <header>
        <h1>Patient Queue</h1>
        <Link to="/dashboard" className="back-btn">⬅ Back to Dashboard</Link>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Patient</button>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Blood Pressure</th>
            <th>Heart Rate</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.condition}</td>
                <td>{patient.vitals.bp}</td>
                <td>{patient.vitals.hr}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No patients available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && <PatientModal onClose={() => setShowModal(false)} updatePatientList={fetchPatients} />}
    </div>
  );
};

export default PatientList;
