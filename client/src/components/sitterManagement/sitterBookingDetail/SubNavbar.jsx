import React, { useState } from "react";
import { ArrowLeftIcon, Dot } from "../../systemdesign/Icons";
import { ButtonPrimary, ButtonSecondary } from "../../systemdesign/Button";
import ReviewModal from "./ReviewModal";
import YourReview from "./YourReview";
import axios from "axios";
import { Link } from "react-router-dom";
import RejectModal from "./RejectModal";

function SubNavbar({
  sitterId,
  bookingId,
  userFullName,
  status,
  booking,
  setBooking,
  review_id,
}) {
  const updateStatus = async (statuses) => {
    try {
      const response = await axios.put(
        `/sitterManagement/${sitterId}/booking/${bookingId}`,
        {
          statuses: statuses,
        }
      );
      setBooking({ ...booking, statuses: statuses });
      if (response.status === 200) {
        console.log(`Booking status updated to ${statuses} successfully.`);
      }
    } catch (err) {
      console.error(
        `Error updating booking status to ${statuses} from client`,
        err
      );
    }
  };

  return (
    <div className="flex w-[1120px] h-[48px] justify-between my-6 ">
      <div className="flex justify-center items-center">
        <Link to={`/sitterManagement/${sitterId}/sitterBookingList`}>
          <ArrowLeftIcon color="#7B7E8F" />
        </Link>
        <h3 className="pl-2.5 pr-6">{userFullName}</h3>
        <div className="flex justify-center items-center gap-2">
          <Dot
            color={`${
              status === "In service"
                ? "#76D0FC"
                : status === "Waiting for confirm"
                ? "#FA8AC0"
                : status === "Waiting for service"
                ? "#FFCA62"
                : status === "Success"
                ? "#1CCD83"
                : status === "Canceled"
                ? "#EA1010"
                : ""
            }`}
          />
          <div
            className={` text-body2 ${
              status === "In service"
                ? "text-blue-500"
                : status === "Waiting for confirm"
                ? "text-pink-500"
                : status === "Waiting for service"
                ? "text-yellow-200"
                : status === "Success"
                ? "text-green-500"
                : status === "Canceled"
                ? "text-etc-red"
                : ""
            }`}
          >
            {status}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {status === "Waiting for confirm" && (
          <>
            <ButtonSecondary
              content="Reject Booking"
              width="160px"
              onClick={() => {
                document.getElementById("reject").showModal();
              }}
            />
            <RejectModal updateStatus={updateStatus} />

            <ButtonPrimary
              content="Confirm Booking"
              width="175px"
              onClick={() => {
                updateStatus("Waiting for service");
              }}
            />
          </>
        )}
        {status === "Waiting for service" && (
          <ButtonPrimary
            content="In service"
            onClick={() => updateStatus("In service")}
          />
        )}
        {status === "In service" && (
          <ButtonPrimary
            content="Success"
            onClick={() => updateStatus("Success")}
          />
        )}
        {review_id !== null ? (
          <>
            {status === "Success" && (
              <ButtonSecondary
                className="btn"
                onClick={(e) => {
                  document.getElementById("yourreview").showModal();
                }}
                content="Your Review"
              />
            )}
            <YourReview />
          </>
        ) : (
          <>
            {status === "Success" && (
              <ButtonPrimary
                className="btn"
                content="Review"
                onClick={() => document.getElementById(`review`).showModal()}
              />
            )}

            <ReviewModal booking={booking} setBooking={setBooking} />
          </>
        )}
      </div>
    </div>
  );
}

export default SubNavbar;
