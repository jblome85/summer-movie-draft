import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css"; // optional for styling

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch CSV data on component mount
useEffect(() => {
  fetch("http://localhost:4000/api/movies")
    .then((res) => {
      console.log("Fetched CSV status:", res.status);
      return res.text();
    })
    .then((csvText) => {
      console.log("CSV Text Preview:\n", csvText.slice(0, 500));
      const parsed = Papa.parse(csvText, { header: true });
      console.log("Parsed Data Example:", parsed.data[0]);
      console.log("Parsed Keys:", Object.keys(parsed.data[0] || {}));
      setMovies(parsed.data);
    })
    .catch((error) => {
      console.error("Failed to fetch movie data:", error);
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
                <td>{new Date(row["Release Date"]).toLocaleDateString()}</td>
                <td>
  {parseInt(row["Domestic Gross"].replace(/[$,]/g, ""))?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
