import Avatar from "@mui/material/Avatar";
import Line from "../../../assets/img/Line.png";
import BookingHistoryDetail from "./BookingHistoryDetail";
import { useContext } from "react";
import { BookingStatusContext } from "../../../contexts/BookingStatusContext";
import {
  InService,
  WaitingforConfirm,
  WaitingforService,
  Success,
  Canceled,
} from "./BookingStatusMsg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function formatDateToCustomString(dateString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return {
    data1: `${day}, ${dayOfMonth} ${month} ${year}`,
    data2: ` ${dayOfMonth} ${month}, ${year}`,
  };
}

export function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours} ${ampm}`;
}

function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const params = useParams();

  // const uniqueBookingId = [
  //   ...new Set(bookingHistory.map((card) => card.booking_no)),
  // ];

  const getBookingDetail = async () => {
    try {
      const results = await axios.get(
        `/userManagement/${params.userId}/booking`
      );
      console.log(params.userId);
      console.log(params.bookingId);
      console.log(results);
      const uniqueBookings = removeDuplicates(results.data.data, "booking_no");
      setBookingHistory(uniqueBookings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBookingDetail();
  }, []);

  // const { status, setStatus } = useContext(BookingStatusContext);
  // console.log("data", status);
  // const data = status;

  // เอาไว้ใช้ตอนที่ owner / sitter กด button เพื่อเปลี่ยน status
  const handleClick = (id) => {
    const updateStatus = bookingHistory.map((card) => {
      return card.id === id
        ? { ...card, statuses: "Waiting for service" }
        : card;
    });
    setStatus(updateStatus);
  };

  return (
    <section className="booking-history flex flex-col gap-6">
      <p className=" pb-[60px] text-headline3">Booking History</p>
      {bookingHistory.map((card) => {
        return (
          <div
            className={`booking-history-container rounded-2xl p-6 hover:shadow-2xl ${
              card.statuses === "In service"
                ? "border border-blue-500"
                : card.statuses === "Waiting for confirm"
                ? "border border-pink-500"
                : card.statuses === "Waiting for service"
                ? "border border-yellow-200"
                : card.statuses === "Success"
                ? "border border-green-500"
                : card.statuses === "Canceled"
                ? "border border-etc-red"
                : "border border-gray-200"
            }`}
            key={card.booking_no}
            onClick={() => {
              console.log(card.booking_no); // Log the booking number
              document
                .getElementById(`booking-detail-${card.booking_no}`)
                .showModal();
            }}
          >
            <BookingHistoryDetail
              key={card.booking_no}
              card={card}
              handleClick={handleClick}
            />
            <header className="booking-history-header flex justify-between border border-etc-white border-b-gray-200 pb-4">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt="avatar"
                  src={card.sitter_image_path}
                  className="border"
                />
                <div>
                  <h1 className=" text-headline3">{card.trade_name}</h1>
                  <h3 className=" text-body1">By {card.full_name}</h3>
                </div>
              </div>
              <div>
                <p className=" text-body3 text-gray-300 text-right">
                  Booking date:{" "}
                  {formatDateToCustomString(card.booking_date).data1}
                </p>
                <h5
                  className={`text-right text-body2 ${
                    card.statuses === "In service"
                      ? "text-blue-500"
                      : card.statuses === "Waiting for confirm"
                      ? "text-pink-500"
                      : card.statuses === "Waiting for service"
                      ? "text-yellow-200"
                      : card.statuses === "Success"
                      ? "text-green-500"
                      : card.statuses === "Canceled"
                      ? "text-etc-red"
                      : ""
                  }`}
                  // onClick={() => handleClick(card.id)}
                >
                  {card.statuses}
                </h5>
              </div>
            </header>
            <main className="pt-4 flex gap-x-7 items-center">
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Date & Time:</div>{" "}
                <div className="text-gray-600 text-body3 ">
                  {formatDateToCustomString(card.start_date_time).data2} |{" "}
                  {formatTime(card.start_date_time)} -{" "}
                  {formatTime(card.end_date_time)}
                </div>
              </div>
              <img src={Line} alt="line" className="h-9" />
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Duration:</div>{" "}
                <div className="text-gray-600">{card.duration} hours</div>
              </div>
              <img src={Line} alt="line" className="h-9" />
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Pet:</div>
                <div className="text-gray-600">{card.pet_names}</div>
              </div>
            </main>
            <div className=" pt-6 text-gray-400">
              <h1 className=" text-body3">Additional Message</h1>
              <p className=" text-gray-600">{card.messages}</p>
            </div>
            <div className="card-status" onClick={(e) => e.stopPropagation()}>
              {card.statuses === "Waiting for confirm" && <WaitingforConfirm />}
              {card.statuses === "Waiting for service" && <WaitingforService />}
              {card.statuses === "In service" && <InService />}
              {card.statuses === "Success" && (
                <Success
                  bookingId={card.booking_no}
                  isReview={!!card.review_id}
                  fetch={getBookingDetail}
                />
              )}
              {card.statuses === "Canceled" && <Canceled />}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default BookingHistory;

function removeDuplicates(array, key) {
  const seen = {};
  return array.filter((item) => {
    const value = item[key];
    if (!seen[value]) {
      seen[value] = true;
      return true;
    }
    return false;
  });
}
