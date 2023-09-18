import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookingHistoryDetail() {
  const [bookingHistory, setBookingHistory] = useState([]);

  const params = useParams();

  const getBookingDetail = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/userManagement/${params.userId}/booking`
      );
      console.log(params.userId);
      console.log(params.bookingId);
      setBookingHistory(results.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBookingDetail();
  }, []);

  return (
    <dialog id="booking-detail" className="modal">
      <div key={bookingHistory.booking_no} className="modal-box bg-etc-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-etc-white">
            ✕
          </button>
        </form>
        <h3 className=" text-gray-600 text-2xl pt-0 pb-6 font-bold">
          Booking Detail
        </h3>
        <hr className=" w-full" />
        <div className="booking-detail-wraaper flex flex-col gap-6">
          <h5 className="font-Satoshi text-base font-medium leading-6 pt-6">
            <ul>
              <li
                className={` list-inside list-disc ${
                  bookingHistory.statuses === "In service"
                    ? "text-blue-500"
                    : ""
                } ${
                  bookingHistory.statuses === "Waiting for confirm"
                    ? "text-pink-500"
                    : bookingHistory.statuses === "Waiting for service"
                    ? "text-yellow-200"
                    : bookingHistory.statuses === "Success"
                    ? "text-green-500"
                    : bookingHistory.statuses === "Canceled"
                    ? "text-etc-red"
                    : ""
                }`}
              >
                {bookingHistory.statuses}
              </li>
            </ul>
          </h5>
          <div className=" text-gray-300 text-body2 ">
            <p>
              {/* Booking date: {formatDateToCustomString(bookingHistory.booking_date).data1} */}
            </p>
            <p>Booking No. : {bookingHistory.booking_no}</p>
          </div>
          <div className="">
            <h5 className=" text-body3 text-gray-400">Pet Sitter: </h5>
            <h4 className=" text-body2 text-gray-600 ">
              {bookingHistory.trade_name} {bookingHistory.full_name}
            </h4>
          </div>
          <main className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className=" flex flex-col gap-1">
                <div className=" text-body3 text-gray-400">Date & Time:</div>{" "}
                <div className=" text-body3 text-gray-600">
                  {/* {formatDateToCustomString(bookingHistory.booking_date).data2} |{" "}
                  {formatTime(bookingHistory.start_date_time)} -{" "}
                  {formatTime(bookingHistory.end_date_time)} */}
                </div>
              </div>
              <div className="flex flex-col  w-[50%]">
                <div className=" text-body3 text-gray-400">Duration:</div>{" "}
                <div className=" text-body2 text-gray-600 ">
                  {bookingHistory.duration} hours
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className=" text-body3 text-gray-400">Pet:</div>
              <div className=" text-body2 text-gray-600">
                {bookingHistory.pet_names}
              </div>
            </div>
          </main>
          <hr />
          <div className="flex justify-between">
            <h1 className="text-body2">Total: </h1>
            <p className="text-body1"> {bookingHistory.total_amount} THB</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default BookingHistoryDetail;
