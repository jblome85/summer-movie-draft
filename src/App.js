import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css"; // optional for styling

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch CSV data on component mount
  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        setMovies(parsed.data.filter(row => row.Movie && row.Player)); // Filter blank rows
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch movie data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>2025 Summer Movie Draft</h1>
      {loading ? (
        <p>Loading movie data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Player</th>
              <th>Release Date</th>
              <th>Domestic Gross</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((row, index) => (
              <tr key={index}>
                <td>{row.Movie}</td>
                <td>{row.Player}</td>
                <td>{row.ReleaseDate}</td>
                <td>{row.DomesticGross}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
