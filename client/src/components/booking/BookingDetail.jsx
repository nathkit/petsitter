import { useState, useEffect } from "react";
import starGreen from "../../assets/img/starGreen.png";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../../contexts/BookingContext";
import { object } from "yup";

export default function BookingDatail() {
  const {
    petIds,
    getSitterDetail,
    sitterDetail,
    petIdsNames,
    bookingMessage,
    totalAmount,
    startDateTime,
    endDateTime,
    duration,
  } = useBooking();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getSitterDetail(params.sitterId);
  }, []);

  //   console.log(params);
  //   console.log(sitterDetail);
  return (
    <div className=" bg-etc-white w-[32.5%] rounded-2xl h-fit relative">
      <p className="p-6 text-center text-headline3">Booking Detail</p>
      <hr />
      <div className="p-6 ">
        <div className="pb-6">
          <p className="text-body3">Pet Sitter:</p>
          <p className="text-body2">
            {sitterDetail[0]?.trade_name}&nbsp; By {sitterDetail[0]?.full_name}
          </p>
        </div>
        <div className="pb-6">
          <p className="text-body3">Date & Time:</p>
          <p className="text-body2">
            Check-in:&nbsp;&nbsp;&nbsp;&nbsp;{startDateTime}
          </p>
          <p className="text-body2">Check-out:&nbsp;&nbsp;{endDateTime}</p>
        </div>
        <div className="pb-6">
          <p className="text-body3">Duration</p>
          <p className="text-body2">
            {" "}
            {duration <= 1 ? `${duration} hour` : `${duration} hours`}
          </p>
        </div>
        <div>
          <p className="text-body3">Pet</p>
          <p className="text-body2">
            {Object.keys(petIdsNames).length === 0 ? (
              <span>-</span>
            ) : (
              <>
                {Object.keys(petIdsNames).map((key, index) => (
                  <span key={key}>
                    {index > 0 && ","} {petIdsNames[key]}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
        <div>
          <p className="text-body3">Additional Message </p>
          <p className="text-body2">{!bookingMessage ? "-" : bookingMessage}</p>
        </div>
      </div>
      <div className="flex justify-between p-6 bg-etc-black text-etc-white rounded-b-2xl">
        <p className="text-body2">Total</p>
        <p className="text-body1">{!totalAmount ? "-" : totalAmount} THB</p>
      </div>
      <img
        src={starGreen}
        className=" absolute bottom-[-300px] right-[-50px] h-[250px] w-[300px]"
      />
    </div>
  );
}
