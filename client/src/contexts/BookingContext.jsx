import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const BookingContext = React.createContext();

function BookingProvider(props) {
  const [petIds, setPetIds] = useState([]);
  const [petIdsNames, setPetIdsNames] = useState({});
  const [sitterDetail, setSitterDetail] = useState([]);
  const [bookingMessage, setBookingMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");

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
  const bookingTime = JSON.parse(window.localStorage.getItem("bookingTime"));
  let startDateTime = null;
  let endDateTime = null;
  let duration = null;
  const dateFormat = "dd MMM yyyy, hh:mm a";
  if (bookingTime?.startDateTime) {
    startDateTime = format(parseISO(bookingTime.startDateTime), dateFormat);
    endDateTime = format(parseISO(bookingTime.endDateTime), dateFormat);
    duration = bookingTime.duration;
  }
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
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startDateTime,
        endDateTime,
        duration,
        paymentMethod,
        setPaymentMethod,
      }}>
      {props.children}
    </BookingContext.Provider>
  );
}

const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
