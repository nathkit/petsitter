import React from "react";
import { timeFormat, dateFormat, formatTime } from "../../../utils/timeFormat";

function BookingHistoryDetail({ card }) {
  return (
    <dialog id={`booking-detail-${card.booking_no}`} className="modal ">
      <div key={card.booking_no} className="modal-box bg-etc-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5 text-etc-black bg-etc-white">
            ✕
          </button>
        </form>
        <h3 className=" text-gray-600 text-2xl pt-0 pb-6 font-bold">
          Booking Detail
        </h3>
        <hr className=" w-full" />
        <div className={`booking-detail-wraaper flex flex-col gap-6`}>
          <h5 className="font-Satoshi text-base font-medium leading-6 pt-6">
            <ul>
              <li
                className={` list-inside list-disc gap-2 ${
                  card.statuses === "In service" ? "text-blue-500" : ""
                } ${
                  card.statuses === "Waiting for confirm"
                    ? "text-pink-500"
                    : card.statuses === "Waiting for service"
                    ? "text-yellow-200"
                    : card.statuses === "Success"
                    ? "text-green-500"
                    : card.statuses === "Canceled"
                    ? "text-etc-red"
                    : ""
                }`}
              >
                {card.statuses}
              </li>
            </ul>
          </h5>
          <div className=" text-gray-300 text-body2 ">
            <p>Booking date: {timeFormat(card.booking_date)}</p>
            <p>Booking No.: {card.booking_no}</p>
          </div>
          <div>
            <h5 className=" text-body3 text-gray-400">Pet Sitter: </h5>
            <h4 className=" text-body2 text-gray-600 ">
              {card.trade_name} By {card.pet_sitter_full_name}
            </h4>
          </div>
          <main className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className=" flex flex-col gap-1">
                <div className=" text-body3 text-gray-400">Date & Time:</div>{" "}
                <div className=" text-body3 text-gray-600">
                  {dateFormat(card.start_date_time)} |{" "}
                  {formatTime(card.start_date_time)}
                </div>
                <div className=" text-body3 text-gray-600">
                  {dateFormat(card.end_date_time)} |{" "}
                  {formatTime(card.end_date_time)}
                </div>
              </div>
              <div className="flex flex-col  w-[50%]">
                <div className=" text-body3 text-gray-400">Duration:</div>{" "}
                <div className=" text-body2 text-gray-600 ">
                  {card.duration <= 1
                    ? `${card.duration} hour`
                    : `${card.duration} hours`}
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className=" text-body3 text-gray-400">Pet:</div>
              <div className=" text-body2 text-gray-600">{card.pet_names}</div>
            </div>
          </main>
          <div className=" pb-2 text-gray-400">
            <h1 className=" text-body3">Additional Message</h1>
            <p className="text-gray-600">
              {card.message || "No additional message"}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h1 className="text-body2 text-etc-black">Total: </h1>
            <p className="text-body1 text-etc-black">
              {" "}
              {card.total_amount} THB
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default BookingHistoryDetail;
