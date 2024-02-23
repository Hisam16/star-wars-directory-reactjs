// src/App.js
import React, { useState, useEffect } from "react";
import { fetchPlanets } from "./api/swapi";
import PlanetCard from "./components/PlanetCard";

function App() {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPlanets = async () => {
      const data = await fetchPlanets(currentPage);
      setPlanets(data.results);
    };

    loadPlanets();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>

      <div className="planets-container">
        {planets.map((planet) => (
          <PlanetCard key={planet.url} planet={planet} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
