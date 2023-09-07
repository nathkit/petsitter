import React from "react";
import { useState } from "react";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const [disableButtonBooking1, setDisableButtonBooking1] = useState([]);
  const [disableButtonBooking2, setDisableButtonBooking2] = useState();
  const [disableButtonBooking3, setDisableButtonBooking3] = useState(true);
  return (
    <BookingContext.Provider
      value={{
        disableButtonBooking1,
        setDisableButtonBooking1,
        disableButtonBooking2,
        setDisableButtonBooking2,
        disableButtonBooking3,
        setDisableButtonBooking3,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
