import React, { useEffect, useState } from "react";
import { fetchCSV } from "../utils/fetchCSV";

const sheetId = "1q6gElz8_T2J_GE1j6fB3BAHIve12Vfk0s063h7TVIJY";
const gid = "0";

const Scoreboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchCSV(sheetId, gid).then(data => {
      const scores = {};
      data.forEach(row => {
        const player = row["Drafted By"];
        const gross = parseInt(row["Domestic Gross"].replace(/[$,]/g, "")) || 0;
        const budget = parseInt(row["Budget"].replace(/[$,]/g, "")) || 1;

        if (!scores[player]) {
          scores[player] = { gross: 0, budget: 0 };
        }

        scores[player].gross += gross;
        scores[player].budget += budget;
      });

      const final = Object.entries(scores).map(([player, { gross, budget }]) => ({
        player,
        gross,
        budget,
        score: (gross / budget).toFixed(2),
      }));

      setPlayers(final.sort((a, b) => b.gross - a.gross));
    });
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Gross</th>
            <th>Total Budget</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i}>
              <td>{p.player}</td>
              <td>${p.gross.toLocaleString()}</td>
              <td>${p.budget.toLocaleString()}</td>
              <td>{p.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
