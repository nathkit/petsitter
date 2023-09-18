import { ButtonPrimary, ButtonSecondary } from "../systemdesign/Button";
import catPaw from "../../assets/img/catPaw.png";
import starCat from "../../assets/img/starCat.png";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { useEffect, useState } from "react";

function Booking4() {
  const navigate = useNavigate();
  const { getBookingDetail, petBookingDetail, bookingDetail } = usePost();

  useEffect(() => {
    getBookingDetail();
  }, []);
  console.log(bookingDetail);

  return (
    <div className="flex justify-center flex-col items-center  bg-etc-bg_gray relative h-screen">
      <div className=" absolute top-[0px] left-[16px]">
        <img src={catPaw} />
      </div>
      <div className="w-[632px]  bg-etc-white">
        <div className=" bg-etc-black text-etc-white text-center p-6 rounded-t-2xl ">
          <p className="mb-2 text-headline2">Thank You For Booking</p>
          <p className=" text-body2">
            We will send your booking information to Pet Sitter.
          </p>
        </div>
        <div className="">
          <div className="px-10 pt-10">
            <div className="pb-6 text-body2 text-gray-300 ">
              <p className="">Transaction Date: {bookingDetail.created_at}</p>
              <p className="">Transaction No. : {bookingDetail.booking_id}</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Pet Sitter:</p>
              <p className="text-body2 text-etc-black">
                {bookingDetail.trade_name} By{" "}
                {bookingDetail.pet_sitter_full_name}
              </p>
            </div>
            <div className="pb-6 flex ">
              <div className="mr-20">
                <p className="text-gray-400 text-body3">Date & Time:</p>
                <div>
                  <p className="text-body2 text-etc-black">
                    Check-in:&nbsp;&nbsp;&nbsp;&nbsp;
                    {bookingDetail.start_date_time}
                  </p>
                  <p className="text-body2 text-etc-black">
                    Check-out:&nbsp;&nbsp;{bookingDetail.end_date_time}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-body3">Duration:</p>
                <p className="text-body2 text-etc-black">
                  {bookingDetail.duration} hours
                </p>
              </div>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Pet</p>
              <p className="text-body2 text-etc-black">
                {petBookingDetail.map((pet, index) => {
                  return <span key={index}>{pet}, </span>;
                })}
              </p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 text-body3">Additional Message </p>
              <p className="text-body2 text-etc-black">
                {bookingDetail.message}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-10 pb-10 mt-4 bg-etc-white rounded-b-2xl">
            <p className="text-body2 text-etc-black">Total</p>
            <p className="text-body1 text-etc-black">
              {bookingDetail.amount} THB
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 relative flex">
        <ButtonSecondary content={"Booking History"} width={"167px"} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <ButtonPrimary
          content={"Back To Home"}
          width={"156px"}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className=" absolute right-0  bottom-0 ">
        <img src={starCat} />
      </div>
    </div>
  );
}

export default Booking4;
