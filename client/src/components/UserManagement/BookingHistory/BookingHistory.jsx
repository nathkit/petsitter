import Avatar from "@mui/material/Avatar";
import Line from "../../../assets/img/Line.png";
import BookingHistoryDetail from "./BookingHistoryDetail";
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
import { timeFormat, dateFormat, formatTime } from "../../../utils/timeFormat";
import { useAuth } from "../../../contexts/authentication";
import { ArrowLeftIcon, ArrowRightIcon } from "../../systemdesign/Icons";

function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const { userData } = useAuth();

  const getBookingDetail = async (currentPage) => {
    try {
      const results = await axios.get(
        `/userManagement/${userData.id}/booking?page=${currentPage}`
      );
      console.log("userData", userData.id);
      console.log(params.bookingId);
      console.log(results);
      const uniqueBookings = removeDuplicates(results.data.data, "booking_no");
      setBookingHistory(uniqueBookings);
      setCurrentPage(results.data.pagination.currentPage);
      setTotalPages(results.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBookingDetail(currentPage);
  }, [userData, currentPage]);

  // เอาไว้ใช้ตอนที่ owner / sitter กด button เพื่อเปลี่ยน status //เอาไปใช้ต่อ
  // const handleClick = (id) => {
  //   const updatedBookingHistory = bookingHistory.map((card) => {
  //     if (card.booking_no === id) {
  //       switch (card.statuses) {
  //         case "Waiting for confirm":
  //           return { ...card, statuses: "Waiting for service" };
  //         case "Waiting for service":
  //           return { ...card, statuses: "In service" };
  //         case "In service":
  //           return { ...card, statuses: "Success" };
  //         default:
  //           return card;
  //       }
  //     } else {
  //       return card;
  //     }
  //   });
  //   setBookingHistory(updatedBookingHistory);
  // };

  return (
    <section className="booking-history flex flex-col gap-6">
      <p className=" pb-[60px] text-headline3 text-etc-black">
        Booking History
      </p>
      {bookingHistory && bookingHistory.length > 0 ? (
        bookingHistory.map((card) => (
          <div
            className={`booking-history-container rounded-2xl p-6 hover:shadow-md transform transition-transform hover:scale-105   ${
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
              document
                .getElementById(`booking-detail-${card.booking_no}`)
                .showModal();
            }}
          >
            <BookingHistoryDetail
              key={card.booking_no}
              card={card}
              // handleClick={handleClick}
            />
            <header className="booking-history-header flex justify-between border border-etc-white border-b-gray-200 pb-4">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt="avatar"
                  src={card.sitter_image_path}
                  className="border"
                />
                <div>
                  <h1 className=" text-headline3 text-etc-black">
                    {card.trade_name}
                  </h1>
                  <h3 className=" text-body1 text-etc-black">
                    By {card.pet_sitter_full_name}
                  </h3>
                </div>
              </div>
              <div>
                <p className=" text-body3 text-gray-300 text-right">
                  Booking date: {timeFormat(card.booking_date)}
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
                  onClick={() => handleClick(card.booking_no)}
                >
                  {card.statuses}
                </h5>
              </div>
            </header>
            <main className="pt-4 flex  gap-x-7 items-start">
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Date & Time:</div>{" "}
                <div className=" text-body3 text-gray-600">
                  {dateFormat(card.start_date_time)} |{" "}
                  {formatTime(card.start_date_time)}{" "}
                </div>
                <div className=" text-body3 text-gray-600">
                  {dateFormat(card.end_date_time)} |{" "}
                  {formatTime(card.end_date_time)}
                </div>
              </div>
              <img src={Line} alt="line" className=" mt-5 h-9" />
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Duration:</div>{" "}
                <div className="text-gray-600">
                  {card.duration <= 1
                    ? `${card.duration} hour`
                    : `${card.duration} hours`}
                </div>
              </div>
              <img src={Line} alt="line" className=" mt-5 h-9" />
              <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                <div className=" text-body3">Pet:</div>
                <div className="text-gray-600">{card.pet_names}</div>
              </div>
            </main>
            <div className=" pt-6 text-gray-400">
              <h1 className=" text-body3">Additional Message</h1>
              {/* format to array and split choose only [0] */}
              <p className="text-gray-600">
                {card.message || "No additional message"}
              </p>
            </div>
            <div className="card-status" onClick={(e) => e.stopPropagation()}>
              {card.statuses === "Waiting for confirm" && <WaitingforConfirm />}
              {card.statuses === "Waiting for service" && <WaitingforService />}
              {card.statuses === "In service" && <InService />}
              {card.statuses === "Success" && (
                <Success
                  bookingId={card.booking_no}
                  sitterId={card.id}
                  isReview={!!card.review_id}
                  fetch={getBookingDetail}
                  successDate={card.success_date_time}
                />
              )}
              {card.statuses === "Canceled" && <Canceled />}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center"> No available booking 🐾 </p>
      )}
      <div className="flex justify-center items-center gap-3 font-bold text-gray-300">
        {currentPage > 1 ? (
          <button
            className="previous-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ArrowLeftIcon color="#AEB1C3" />
          </button>
        ) : null}

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`w-[40px] h-[40px] rounded-full hover:bg-orange-100 hover:text-orange-500 ${
              index + 1 === currentPage ? "bg-orange-100 text-orange-500" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages ? (
          <button
            className="next-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ArrowRightIcon color="#AEB1C3" />
          </button>
        ) : null}
      </div>
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
