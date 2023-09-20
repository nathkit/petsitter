import React, { useState, useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";

function TimePicker({ selectedDate, scheduledAppointments, isStart }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [validTimes, setValidTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { setStartTime, setEndTime } = useBooking();
  // console.log(scheduledAppointments);
  useEffect(() => {
    // Check if selectedDate is provided and not null
    if (selectedDate) {
      // Parse selectedDate into a Date object
      const [year, month, day] = selectedDate.split("-").map(Number);
      const selectedDateObject = new Date(year, month - 1, day);

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
            selectedDateObject.getFullYear(),
            selectedDateObject.getMonth(),
            selectedDateObject.getDate(),
            hour,
            minute
          );

          // Check if the selectedDate matches the current date
          const isToday =
            selectedDateObject.toDateString() === currentTime.toDateString();

          // Check if the time slot conflicts with any scheduled appointments
          const isTimeSlotAvailable = !scheduledAppointments.some(
            (appointment) => {
              const appointmentStart = new Date(appointment.startDateTime);
              const appointmentEnd = new Date(appointment.endDateTime);
              return timeSlot > appointmentStart && timeSlot <= appointmentEnd;
            }
          );

          if (
            (isToday && timeSlot >= threeHoursLater && isTimeSlotAvailable) ||
            (!isToday && isTimeSlotAvailable)
          ) {
            timeOptions.push(timeString);
          }
        }
      }

      setValidTimes(timeOptions);
    }
  }, [currentTime, selectedDate, scheduledAppointments]);

  const handleTimeChange = (e) => {
    isStart ? setStartTime(e.target.value) : setEndTime(e.target.value);
    setSelectedTime(e.target.value);
  };

  return (
    <div>
      <h1>Time Picker</h1>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 w-[208.5px] ">
          {selectedTime}
        </label>
        <ul
          onChange={handleTimeChange}
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[208.5px] h-[264px] overflow-y-scroll grid"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}>
          {validTimes.map((time, index) => (
            <li key={index} value={time}>
              <a>{time}</a>
            </li>
          ))}
        </ul>
      </div>
      <select
        className="text-body2 appearance-none py-3 px-4 gap-2 w-[208.5px] bg-etc-white border-gray-200 border-2 rounded-[8px]"
        value={selectedTime}
        onChange={handleTimeChange}>
        <option className="h-[264px]" value="">
          Select a time
        </option>
        {validTimes.map((time, index) => (
          <option className="h-[264px]" key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      <p>You selected: {selectedTime || "No time selected"}</p>
    </div>
  );
}

export default TimePicker;
