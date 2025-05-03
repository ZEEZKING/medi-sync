import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/maincontent.css";
import axios from "axios";

const LoginForm = ({ isReturningUser, setIsReturningUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: 3, // Default to Doctor (ensure it's a number)
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "role" ? Number(value) : value, // Convert role to number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Important for authentication
      });
      navigate("/dashboard", { state: { userData: response.data } });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to submit form. Please try again.");
        console.error("Error details:", error.response.data);
      } else {
        setError("Network error. Check if the server is running.");
        console.error("Network error:", error);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {!isReturningUser && (
        <>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" onChange={handleChange} required>
              <option value={3}>Doctor</option>
              <option value={1}>Attendant</option>
              <option value={2}>Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} required />
          </div>
        </>
      )}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange} required />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <button type="submit" className="submit-button">
          {isReturningUser ? "Login" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default function MainContent() {
  const [isReturningUser, setIsReturningUser] = useState(false);

  return (
    <div className="main-content">
      <div className="logo-container">
        <h1>MEDI - Sync</h1>
        <p>Seamless care, smarter systems</p>
      </div>
      <div className="login-prompt">
        <h2>Sign in to get started</h2>
      </div>
      <div className="form-container">
        <LoginForm isReturningUser={isReturningUser} setIsReturningUser={setIsReturningUser} />
        {!isReturningUser ? (
          <p onClick={() => setIsReturningUser(true)} className="returning-user-prompt">
            Click here to login if you already have an account
          </p>
        ) : (
          <p onClick={() => setIsReturningUser(false)} className="new-user-prompt">
            Sign up if you don't have an account
          </p>
        )}
      </div>
    </div>
  );
}
