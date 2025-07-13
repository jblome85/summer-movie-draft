import React, { useEffect, useState } from "react";
import { fetchCSV } from "../utils/fetchCSV";

const sheetId = "1q6gElz8_T2J_GE1j6fB3BAHIve12Vfk0s063h7TVIJY";
const gid = "0";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchCSV(sheetId, gid).then(setMovies);
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>All Movies</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Studio</th>
            <th>Release Date</th>
            <th>Gross</th>
            <th>Budget</th>
            <th>Score</th>
            <th>Drafted By</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m, i) => {
            const gross = parseInt(m["Domestic Gross"].replace(/[$,]/g, "")) || 0;
            const budget = parseInt(m["Budget"].replace(/[$,]/g, "")) || 1;
            const score = (gross / budget).toFixed(2);
            return (
              <tr key={i}>
                <td>{m.Title}</td>
                <td>{m.Studio}</td>
                <td>{m["Release Date"]}</td>
                <td>{m["Domestic Gross"]}</td>
                <td>{m.Budget}</td>
                <td>{score}</td>
                <td>{m["Drafted By"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
