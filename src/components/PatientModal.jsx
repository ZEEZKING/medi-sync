import React, { useState } from "react";
import "../css/patientmodal.css"; // Import modal styles

const PatientModal = ({ onClose, updatePatientList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !dob || !contact || !email || !symptoms || !bloodPressure || !heartRate || !temperature || !oxygenSaturation) {
      alert("All fields are required!");
      return;
    }

    const patientData = {
      name: `${firstName} ${lastName}`,
      dob,
      contact,
      email,
      symptoms,
      vitals: {
        bloodPressure,
        heartRate,
        temperature,
        oxygenSaturation,
      },
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/vitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData.vitals),
      });

      const result = await response.json();
      setLoading(false);

      if (result.priorityLevel) {
        patientData.priorityLevel = result.priorityLevel;
        alert(`Priority Level: ${result.priorityLevel}`);
      } else {
        alert("Priority assessment failed.");
      }

      // Update the patient list in PatientList
      updatePatientList();
      onClose();
    } catch (error) {
      console.error("Error submitting vitals:", error);
      alert("Error connecting to AI. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Patient Check-in</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required></textarea>
            </div>

            <h3>Vitals</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Blood Pressure</label>
                <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Heart Rate</label>
                <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Temperature</label>
                <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Oxygen Saturation</label>
                <input type="text" value={oxygenSaturation} onChange={(e) => setOxygenSaturation(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Complete Check-in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
