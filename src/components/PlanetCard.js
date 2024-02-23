// src/components/PlanetCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css"; // Import the styles

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentsData = await Promise.all(
          planet.residents.map((residentUrl) => axios.get(residentUrl))
        );

        // Extract relevant information (name, height, mass, gender) from each resident
        const residentsDetails = residentsData.map((resident) => ({
          name: resident.data.name,
          height: resident.data.height,
          mass: resident.data.mass,
          gender: resident.data.gender,
        }));

        setResidents(residentsDetails);
      } catch (error) {
        console.error("Error fetching residents:", error.message);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  const openModal = (resident) => {
    setSelectedResident(resident);
  };

  const closeModal = () => {
    setSelectedResident(null);
  };

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p className="planet-info">Climate: {planet.climate}</p>
      <p className="planet-info">Population: {planet.population}</p>
      <p className="planet-info">Terrain: {planet.terrain}</p>

      <div>
        <h3 className="residents-heading">Residents:</h3>
        <table className="residents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.name}>
                <td>{resident.name}</td>
                <td>
                  <button
                    className="info-button"
                    onClick={() => openModal(resident)}
                  >
                    Show Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedResident && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{selectedResident.name}</h3>
            <table>
              <tbody>
                <tr>
                  <td>Height:</td>
                  <td>{selectedResident.height}</td>
                </tr>
                <tr>
                  <td>Mass:</td>
                  <td>{selectedResident.mass}</td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>{selectedResident.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;
