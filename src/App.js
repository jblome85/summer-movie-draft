import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then((res) => {
        console.log("Fetched CSV status:", res.status);
        return res.text();
      })
      .then((csvText) => {
        console.log("CSV Text Preview:\n", csvText.slice(0, 500));
        const parsed = Papa.parse(csvText, {
          header: true,
          transformHeader: header => header.trim()
        });
        console.log("Parsed Data Example:", parsed.data[0]);
        console.log("Parsed Keys:", Object.keys(parsed.data[0] || {}));
        setMovies(parsed.data);
        setLoading(false); // ✅ fix here
      })
      .catch((error) => {
        console.error("Failed to fetch movie data:", error);
        setLoading(false); // also add fallback
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
      <td>{row["Movie"]}</td>
      <td>{row["Player"]}</td>
      <td>{new Date(row["Release Date"]).toLocaleDateString()}</td>
      <td>
  {Number(row["Domestic Gross"])
    ? Number(row["Domestic Gross"]).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    : ""}
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
