import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const [petIds, setPetIds] = useState([]);
  const [petIdsNames, setPetIdsNames] = useState({});
  const [sitterDetail, setSitterDetail] = useState([]);
  const [bookingMessage, setBookingMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const getSitterDetail = async (sitterId) => {
    try {
      const results = await axios.get(`/sitterManagement/${sitterId}`);
      // console.log(results);
      // console.log(sitterId);
      setSitterDetail(results.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        petIds,
        setPetIds,
        getSitterDetail,
        sitterDetail,
        petIdsNames,
        setPetIdsNames,
        bookingMessage,
        setBookingMessage,
        totalAmount,
        setTotalAmount,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
