import React, { createContext, useEffect, useState } from "react";
// import { petData } from "../components/UserManagement/BookingHistory/BookingHistory"; // Adjust the import path as needed

const BookingStatusContext = createContext({});

function BookingStatusProvider({ children }) {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    console.log(status);
  }, []);

  return (
    <BookingStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </BookingStatusContext.Provider>
  );
}

export { BookingStatusContext, BookingStatusProvider };
