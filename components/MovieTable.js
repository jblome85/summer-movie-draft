import React, { useEffect, useState } from "react";
import { fetchCSV } from "./utils/fetchCSV";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const sheetId = "1q6gElz8_T2J_GE1j6fB3BAHIve12Vfk0s063h7TVIJY";
    const gid = "0";
    fetchCSV(sheetId, gid).then(setMovies);
  }, []);

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Studio</th>
          <th>Release Date</th>
          <th>Domestic Gross</th>
          <th>Budget</th>
          <th>Score</th>
          <th>Drafted By</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((m, i) => {
          const gross = parseInt(m["Domestic Gross"].replace(/\$|,/g, ""));
          const budget = parseInt(m["Budget"].replace(/\$|,/g, ""));
          const score = gross && budget ? (gross / budget).toFixed(2) : "N/A";
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
  );
};

export default MovieTable;
