import "./modal.css";
import { useState } from "react";
import ButtonPrimary from "../Buttons/ButtonPrimary";

// Dynmaic places for select dropdown
const places = ["Mumbai", "Delhi", "Ahmedabad", "Bangalore"];

const ModalNewDetails = ({ setModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    place: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  // Main Payload function with validation
  const saveDetails = () => {
    // Simple Name validation
    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    // DOB validation
    if (!formData.dob) {
      setError("Please select Date of Birth");
      return;
    }

    const selectedDate = new Date(formData.dob);
    const today = new Date();

    if (selectedDate > today) {
      setError("DOB cannot be a future date");
      return;
    }

    // Place validation
    if (!formData.place) {
      setError("Please select a place");
      return;
    }

    // If everything valid
    setError("");

    const payload = {
      name: formData.name.trim(),
      dob: formData.dob,
      place: formData.place,
      createdAt: new Date().toISOString(),
    };

    console.log("Final Payload:", payload);

    setModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-content">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="modal-input"
            value={formData.name}
            onChange={handleChange}
          />

          {/* DOB */}
          <input
            type="date"
            name="dob"
            className="modal-input"
            value={formData.dob}
            onChange={handleChange}
          />

          {/* Place Select */}
          <select
            name="place"
            className="modal-input"
            value={formData.place}
            onChange={handleChange}
          >
            <option value="">Select Place</option>

            {places.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button className="modal-close" onClick={() => setModalOpen(false)}>
          &#10006;
        </button>

        <div className="button-and-error-container">
          {error && <p className="error-text">{error}</p>}
          <ButtonPrimary buttonText="Create" onClick={() => saveDetails()} />
        </div>
      </div>
    </div>
  );
};

export default ModalNewDetails;
