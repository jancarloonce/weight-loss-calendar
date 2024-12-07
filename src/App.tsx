import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

interface MarkedDay {
  date: Date;
  weight: number;
}

const App: React.FC = () => {
  // State to store marked days with weights
  const [markedDays, setMarkedDays] = useState<MarkedDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState<number | "">("");

  // Handle marking a date and setting its weight
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleWeightSubmit = () => {
    if (selectedDate && weight !== "") {
      setMarkedDays((prev) => [
        ...prev,
        { date: selectedDate, weight: Number(weight) },
      ]);
      setWeight(""); // Reset weight input after submission
    }
  };

  // Check if a date is marked
  const isMarked = (date: Date) => {
    return markedDays.some((marked) => marked.date.toDateString() === date.toDateString());
  };

  // Get weight for a marked day
  const getWeightForDate = (date: Date) => {
    const markedDay = markedDays.find(
      (marked) => marked.date.toDateString() === date.toDateString()
    );
    return markedDay ? markedDay.weight : null;
  };

  return (
    <div className="App">
      <h1>JC Weight Loss Calendar</h1>
      <div className="goal-note">
        <p><strong>68 KG goal on Dec 31</strong></p>
        <p>Prize: New pet!</p>
      </div>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          if (isMarked(date)) {
            return "marked-day";
          }
          return "";
        }}
      />
      {selectedDate && (
        <div className="weight-input">
          <h3>{`Enter your weight for ${selectedDate.toDateString()}:`}</h3>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight in kg"
          />
          <button onClick={handleWeightSubmit}>Submit</button>
        </div>
      )}
      <div className="weight-display">
        <h3>Weight Records:</h3>
        {markedDays.length > 0 ? (
          markedDays.map((record, index) => (
            <div key={index}>
              <span>{record.date.toDateString()}: </span>
              <strong>{record.weight} kg</strong>
            </div>
          ))
        ) : (
          <p>No weight records yet.</p>
        )}
      </div>
    </div>
  );
};

export default App;
