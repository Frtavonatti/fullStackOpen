import React, { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, NewDiaryEntry, Weather, Visibility, ErrorResponse } from "./types";
import { getAll, createNew } from './services/diaries'
import Header from "./components/Header";
import Radio from "./components/ui/Radio";

function App() {
  const initialState: NewDiaryEntry = {
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: ""
  }

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState(initialState)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAll().then((data) => {
        setDiaries(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
        setError("error fetching diaries" + error.message);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    setNewDiary({
      ...newDiary,
      [name]: value,
    });
  }

  const handleSumit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await createNew(newDiary);
      setDiaries(diaries.concat(response));
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error posting diary: " + err.message);
      }
    } finally {
      setNewDiary(initialState);
    }
  }

  return (
    <div className="rounded-lg bg-zinc-800 px-12 py-6 shadow-lg">
      <Header/>
      {error && <p className="text-red-700 text-lg font-bold mb-4">{error}</p>}

      <section>
        {diaries.map((diary) => (
          <div
            key={diary.id}
            className="mb-4 rounded-lg border border-solid border-white p-2 shadow-lg max-w-md"
          >
            <h3 className="mb-2 text-xl font-bold">{diary.date}</h3>
            <ul>
              <li>Visibility: {diary.visibility}</li>
              <li>Weather: {diary.weather} </li>
            </ul>
          </div>
        ))}
      </section>

      <form className="flex flex-col gap-2 bg bg-zinc-700 border border-solid border-white rounded-md p-4 my-2" onSubmit={handleSumit}>
        <input type="date" name="date" value={newDiary.date} onChange={handleChange} />

        <div className="border border-solid border-white rounded-md p-4 my-2">
          <label className="font-bold">Visibility</label>
            <div>
            <Radio name="visibility" value="great" checked={newDiary.visibility === "great"} onChange={handleChange}/>
            <Radio name="visibility" value="good" checked={newDiary.visibility === "good"} onChange={handleChange}/>
            <Radio name="visibility" value="ok" checked={newDiary.visibility === "ok"} onChange={handleChange}/> 
            <Radio name="visibility" value="poor" checked={newDiary.visibility === "poor"} onChange={handleChange}/> 
            </div>
        </div>

        <div className="border border-solid border-white rounded-md p-4 my-2">
          <label className="font-bold">Weather</label>
            <div className="flex flex-row gap-2 justify-center">
            <Radio name="weather" value="sunny" checked={newDiary.weather === "sunny"} onChange={handleChange} />
            <Radio name="weather" value="rainy" checked={newDiary.weather === "rainy"} onChange={handleChange} />
            <Radio name="weather" value="cloudy" checked={newDiary.weather === "cloudy"} onChange={handleChange} />
            <Radio name="weather" value="stormy" checked={newDiary.weather === "stormy"} onChange={handleChange} />
            <Radio name="weather" value="windy" checked={newDiary.weather === "windy"} onChange={handleChange} />
            </div>
        </div>

        <textarea name={"comment"} value={newDiary.comment} onChange={handleChange} className="textarea textarea-bordered" placeholder="Bio"></textarea>
        <button className="textarea mt-4" type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
