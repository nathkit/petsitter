import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import usePosts from "../../hooks/usePost";
import { useParams, useNavigate } from "react-router-dom";

const status = [
  "Waiting for confirm",
  "Waiting for service",
  "In service",
  "Success",
  "Canceled",
];

function SitterBookingList() {
  const {
    getSitterBookingList,
    bookings,
    searchKeywords,
    setSearchKeywords,
    bookingStatus,
    setBookingStatus,
  } = usePosts();

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setBookingStatus(event.target.value);
  };

  useEffect(() => {
    getSitterBookingList(params.sitterId, searchKeywords, bookingStatus);
  }, [searchKeywords, bookingStatus]);
  console.log(bookingStatus);
  console.log(bookings);

  return (
    <div className="list-container bg-gray-100">
      <div className="list-filter flex items-center gap-6 mb-6">
        <div className="text-headline3 text-etc-black w-[592px]">
          Booking List
        </div>
        <div>
          <input
            type="Search"
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white w-[240px]"
            placeholder="Search..."
            onChange={(e) => {
              e.preventDefault;
              setSearchKeywords(e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <label htmlFor="status-dropdown"></label>
            <select
              id="status-dropdown"
              className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white w-[240px]"
              value={bookingStatus}
              onChange={handleChange}>
              <option value="">All status</option>
              {status.map((s) => (
                <option key={s} value={s} className="hover:bg-orange-500">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="list-display ">
        <div className="flex bg-etc-black h-12 rounded-t-2xl">
          <div className="w-[240px] text-body3 text-etc-white px-4 py-3">
            Pet Owner Name
          </div>
          <div className="w-[120px] text-body3 text-etc-white px-4 py-3">
            Pet(s)
          </div>
          <div className="w-[120px] text-body3 text-etc-white px-4 py-3">
            Duration
          </div>
          <div className="w-[420px] text-body3 text-etc-white px-4 py-3">
            Booked Date
          </div>
          <div className="w-[220px] text-body3 text-etc-white px-4 py-3">
            Status
          </div>
        </div>
        {bookings.map((booking) => {
          let statusColor = "text-etc-black";
          if (booking.statuses === "Waiting for confirm") {
            statusColor = "text-pink-500";
          }
          if (booking.statuses === "Waiting for service") {
            statusColor = "text-yellow-200";
          }
          if (booking.statuses === "In service") {
            statusColor = "text-blue-500";
          }
          if (booking.statuses === "Success") {
            statusColor = "text-green-500";
          }
          if (booking.statuses === "Canceled") {
            statusColor = "text-etc-red";
          }
          return (
            <div
              key={booking.booking_no}
              onClick={() => {
                navigate(
                  `/sitterManagement/${params.sitterId}/sitterBookingList/${booking.booking_no}`
                );
              }}
              className="flex h-[76px] bg-etc-white border-b-[1px] border-b-gray-200 last:rounded-b-2xl last:border-none  ">
              <div className="w-[240px] text-body2 text-etc-black px-4 py-6">
                {booking.statuses === "Waiting for confirm" ? (
                  <div>
                    <span className="text-orange-500 text-headline4">• </span>
                    <span>{booking.user_full_name}</span>
                  </div>
                ) : (
                  booking.user_full_name
                )}
              </div>

              <div className="w-[120px] text-body2 text-etc-black px-4 py-6">
                {booking.pet_ids.length}
              </div>
              <div className="w-[120px] text-body2 text-etc-black px-4 py-6">
                {booking.duration} hours
              </div>
              <div className="w-[420px] text-body2 text-etc-black px-4 py-6">
                Booked Date
              </div>
              {}
              <div className={`w-[220px] text-body2 ${statusColor} px-4 py-6`}>
                <span className="text-headline4">•</span> {booking.statuses}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SitterBookingList;
