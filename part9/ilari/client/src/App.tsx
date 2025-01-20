import axios from "axios";
import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import reactLogo from "./assets/react.svg";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
        setError("error fetching diaries" + error.message);
      });
  }, []);

  return (
    <div className="rounded-lg bg-zinc-800 px-12 py-6 shadow-lg">
      <div className="mb-8 flex justify-center">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo h-20 w-20" alt="React logo" />
        </a>
      </div>
      <h1 className="mb-8">Ilari Flights</h1>
      {error && <p>{error}</p>}
      <section>
        {diaries.map((diary) => (
          <div
            key={diary.id}
            className="mb-4 rounded-lg border border-solid border-white p-2 shadow-lg"
          >
            <h3 className="mb-2 text-xl font-bold">{diary.date}</h3>
            <ul>
              <li>Visibility: {diary.visibility}</li>
              <li>Weather: {diary.weather} </li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
