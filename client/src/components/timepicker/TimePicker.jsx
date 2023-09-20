import React, { useState, useEffect } from "react";

function TimePicker() {
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [validTimes, setValidTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Calculate the time 3 hours from now
    const threeHoursLater = new Date(currentTime);
    threeHoursLater.setHours(currentTime.getHours() + 3);

    // Generate valid time slots
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour % 12 || 12;
        const ampm = hour < 12 ? "AM" : "PM";
        const timeString = `${formattedHour}:${
          minute === 0 ? "00" : minute
        } ${ampm}`;

        // Check if the time slot is valid (at least 3 hours from now)
        const timeSlot = new Date(
          currentTime.toDateString() + " " + timeString
        );
        if (timeSlot >= threeHoursLater) {
          timeOptions.push(timeString);
        }
      }
    }

    setValidTimes(timeOptions);
  }, [currentTime]);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div>
      <h1>Time Picker</h1>
      <select value={selectedTime} onChange={handleTimeChange}>
        {validTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      <p>You selected: {selectedTime}</p>
    </div>
  );
}

export default TimePicker;
