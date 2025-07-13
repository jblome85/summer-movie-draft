// utils/fetchCSV.js
import Papa from 'papaparse';

export const fetchCSV = async (sheetId, gid) => {
  const url = `https://docs.google.com/spreadsheets/d/1q6gElz8_T2J_GE1j6fB3BAHIve12Vfk0s063h7TVIJY/edit?gid=0#gid=0`;
  const response = await fetch(url);
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
};
