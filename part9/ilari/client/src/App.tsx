import React, { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import { getAll, createNew } from './services/diaries'
import Header from "./components/Header";
import Input from "./components/ui/input";

function App() {
  const initialState: NewDiaryEntry = {
    date: "",
    weather: "",
    visibility: "",
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
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Error posting diary: " + error.message);
      }
    }
    setNewDiary(initialState);
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

      <form className="flex flex-col gap-2" onSubmit={handleSumit}>
        <Input name={"date"} value={newDiary.date} onChange={handleChange} />
        <Input name={"visibility"} value={newDiary.visibility} onChange={handleChange} />
        <Input name={"weather"} value={newDiary.weather} onChange={handleChange} />
        <Input name={"comment"} value={newDiary.comment} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
