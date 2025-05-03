import React, { useState, useEffect } from "react";
import "../css/doctorlist.css"; // Import styles
/* import React from "react"; */
import PropTypes from "prop-types";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Dummy doctor data (for now)
  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      experience: 12,
      availability: "Mon - Fri",
      photo: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      specialty: "Neurologist",
      experience: 8,
      availability: "Tue, Thu, Sat",
      photo: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Dr. Alex Brown",
      specialty: "Pediatrician",
      experience: 15,
      availability: "Mon - Sat",
      photo: "https://via.placeholder.com/80",
    },
    {
      id: 4,
      name: "Dr. Emily Carter",
      specialty: "Dermatologist",
      experience: 10,
      availability: "Wed - Sun",
      photo: "https://via.placeholder.com/80",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setDoctors(dummyDoctors);
      setLoading(false);
    }, 1000);

    /*
    // Uncomment this when connecting to the API
    const fetchDoctors = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL_HERE"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch doctors.");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    */
  }, []);

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-list-container">
      <h2>Our Doctors</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Loading & Error Messages */}
      {loading && <p className="loading-text">Loading doctors...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Doctor Cards */}
      <div className="doctor-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Availability:</strong> {doctor.availability}</p>
              <button className="book-btn">Book Appointment</button>
            </div>
          ))
        ) : (
          !loading && <p className="no-doctors">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
  
/* const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.photo} alt={doctor.name} className="doctor-photo" />
      <h3>{doctor.name}</h3>
      <p className="specialty">{doctor.specialty}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Availability:</strong> {doctor.availability}</p>
      <button className="book-btn">Book Appointment</button>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    availability: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoctorCard; */