import { useState } from "react";
import type { Diaries, NewDiary, Visibility, Weather } from "../types";
import { createDiary } from "../service/diaryService";

interface DiaryFormProps {
  update: (newDiary: Diaries) => void;
}

const DiaryForm = ({ update }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState("");

  const validWeathers: Weather[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];
  const validVisibilities: Visibility[] = ["great", "good", "ok", "poor"];

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validVisibilities.includes(visibility as Visibility)) {
      setError(
        `Invalud visibility. Must be one of: ${validVisibilities.join(", ")}`
      );
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    if (!validWeathers.includes(weather as Weather)) {
      setError(`Invalid weather. Must be one of: ${validWeathers.join(", ")}`);
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const newDiary: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    createDiary(newDiary)
      .then((addedDiary) => {
        console.log("Diary added:", addedDiary);
        setSuccess("Diary added successfully");
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        update(addedDiary);
        setDate("");
        setVisibility("great");
        setWeather("sunny");
        setComment("");
      })
      .catch((error) => {
        console.error("Failed to add diary:", error);
      });
  };

  return (
    <div>
      <h2>Add New Diary</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          <label>date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Visibility: </label>
          {validVisibilities.map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          <label>Weather: </label>
          {validWeathers.map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          <label>comment: </label>

          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;
