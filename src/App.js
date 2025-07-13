import React from "react";
import MovieTable from "./components/MovieTable";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="container" style={{ padding: "1rem 2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>2025 Summer Movie Draft</h1>
      <p style={{ marginBottom: "2rem", color: "#555" }}>Box office tracker for Jonathan and friends</p>
      <MovieTable />
      <Scoreboard />
    </div>
  );
}

export default App;
