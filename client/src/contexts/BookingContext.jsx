import React from "react";
import { useState } from "react";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const [petIds, setPetIds] = useState([]);
  return (
    <BookingContext.Provider
      value={{
        petIds,
        setPetIds,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
