import React, { useEffect, useState } from "react";
import SubNavbar from "./SubNavbar";
import ViewProfile from "./ViewProfile";
import ViewPetDetail from "./ViewPetDetail";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dateFormat, formatTime, timeFormat } from "../../../utils/timeFormat";
import { PetIcon } from "../../systemdesign/Icons";

function SitterBookingDetail() {
  const [booking, setBooking] = useState({});
  const params = useParams();

  const getBooking = async () => {
    const result = await axios.get(
      `/sitterManagement/${params.sitterId}/sitterBookingList/${params.bookingId}`
    );
    setBooking(result.data.data);
  };

  useEffect(() => {
    getBooking();
  }, []);

  let petCount = [];
  if (booking != undefined) {
    petCount = Array.isArray(booking.pet_id) ? booking.pet_id.length : 0;
  }

  return (
    <div className="flex flex-col w-[1120px] h-[1096px] gap-6 ">
      {booking != undefined ? (
        <div>
          <SubNavbar
            status={booking.statuses}
            userFullName={booking.user_full_name}
            bookingId={params.bookingId}
            booking={booking}
            setBooking={setBooking}
            review_id={booking.review_id}
            sitterId={params.sitterId}
          />

          <div className="flex flex-col px-20 py-10 gap-6 bg-etc-white rounded-2xl">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <p className="text-[#AEB1C3] text-[20px] font-bold">
                  Pet Owner Name
                </p>
                <p className="text-[#000] text-[16px] font-medium">
                  {booking.user_full_name}
                </p>
              </div>
              <div>
                <ViewProfile userId={booking.user_id} />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">Pet(s)</p>
              <p className="text-[#000] text-[16px] font-medium">{petCount}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">Pet Detail</p>
              <div className="flex gap-3">
                {booking.pet_id && Array.isArray(booking.pet_id) ? (
                  booking.pet_id.map((petId, index) => (
                    <ViewPetDetail
                      key={index}
                      petId={petId}
                      userId={booking.user_id}
                    />
                  ))
                ) : (
                  <p>No pets found</p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">Duration</p>
              <p className="text-[#000] text-[16px] font-medium">
                {booking.duration <= 1
                  ? `${booking.duration} hour`
                  : `${booking.duration} hours`}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">
                Booking Date
              </p>
              <div className="flex flex-col gap-1 text-[#000] text-[16px] font-medium">
                <div>
                  {dateFormat(booking.start_date_time)} |{" "}
                  {formatTime(booking.start_date_time)}
                  {" - "}
                </div>
                <div>
                  {dateFormat(booking.end_date_time)} |{" "}
                  {formatTime(booking.end_date_time)}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">Total Paid</p>
              <p className="text-[#000] text-[16px] font-medium">
                {booking.total_amount} THB
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">
                Transaction Date
              </p>
              <p className="text-[#000] text-[16px] font-medium">
                {timeFormat(booking.created_at)}
                {" | "} {formatTime(booking.created_at)}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">
                Booking No.
              </p>
              <p className="text-[#000] text-[16px] font-medium">
                {booking.booking_id}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#AEB1C3] text-[20px] font-bold">
                Additional Message
              </p>
              <p className="text-[#000] text-[16px] font-medium">
                {booking.message ? booking.message : "No additional message"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex text-[20px] pl-[38%] pt-[10%] gap-3">
          <PetIcon color="#FF7037" />
          Booking not found <PetIcon color="#FF7037" />
        </div>
      )}
    </div>
  );
}

export default SitterBookingDetail;
