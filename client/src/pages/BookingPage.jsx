import { useState, useEffect } from "react";
import starGreen from "../assets/img/starGreen.png";
import Booking1 from "../components/booking/Booking1";
import Booking2 from "../components/booking/Booking2";
import Booking3 from "../components/booking/Booking3";
import BookingDatail from "../components/booking/BookingDetail";
import { Step1, Step2, Step3 } from "../components/systemdesign/Icons";
import Navbar from "../components/systemdesign/Navbar";
import Confirmation from "../components/booking/Confirmation";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../components/systemdesign/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { useBooking } from "../contexts/BookingContext";
import usePosts from "../hooks/usePost";

function BookingPage() {
  const navigate = useNavigate();
  const { createBooking } = usePosts();
  const {
    sitterDetail,
    startDateTime,
    endDateTime,
    totalAmount,
    bookingMessage,
    paymentMethod,
    petIdsNames,
    setTotalAmount,
    setPetIdsNames,
    setPetIds,
    setBookingMessage,
    setPaymentMethod,
    confirmbooking,
    setConfirmbooking,
  } = useBooking();
  const [disableButtonBooking1, setDisableButtonBooking1] = useState([]);
  // const [disableButtonBooking3, setDisableButtonBooking3] = useState(true);
  const [step, setStep] = useState(1);
  const { userData } = useAuth();
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step <= 2) {
      setDisableButtonBooking1("");
      setTotalAmount();
      setPetIds([]);
      setPetIdsNames({});
      setBookingMessage("");
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const bookingData = {
    user_id: userData?.id,
    pet_sitter_id: sitterDetail[0]?.id,
    pet_id: Object.keys(petIdsNames),
    start_date_time: startDateTime,
    end_date_time: endDateTime,
    amount: totalAmount,
    message: bookingMessage,
    payment_method: paymentMethod,
  };
  // console.log(bookingData);

  return (
    <>
      <Navbar />
      <div className=" bg-etc-bg_gray w-full min-h-screen px-20 pt-10 pb-20 flex">
        <div className="mr-[2.25rem] w-[68.5%]">
          <div className=" flex justify-around bg-etc-white mb-4 p-6 text-body1 text-gray-500 items-center">
            <div className=" flex items-center">
              <Step1
                colorBg={step === 1 ? "#ff7037" : "#000"}
                colorNum={step === 1 ? "#fff" : "#ff7037"}
              />
              <span className="ml-4">Your Pet</span>
            </div>
            <div className=" flex items-center">
              <Step2
                colorBg={(step === 2 && "#ff7037") || (step === 3 && "#000")}
                colorNum={(step === 2 && "#fff") || (step === 3 && "#ff7037")}
              />
              <span className="ml-4">Information</span>
            </div>
            <div className=" flex items-center">
              <Step3
                colorBg={step === 3 ? "#ff7037" : ""}
                colorNum={step === 3 ? "#fff" : ""}
              />
              <span className="ml-4">Payment</span>
            </div>
          </div>
          {step === 1 && (
            <Booking1 setDisableButtonBooking1={setDisableButtonBooking1} />
          )}
          {step === 2 && <Booking2 />}
          {step === 3 && (
            // <Booking3 setDisableButtonBooking3={setDisableButtonBooking3} />
            <Booking3 />
          )}
          <div className=" p-10 w-full h-fit bg-etc-white flex justify-between">
            {step === 1 ? (
              <ButtonPrimary
                content={"Back"}
                onClick={() => {
                  navigate(-1);
                }}
              />
            ) : (
              <ButtonPrimary
                content={"Back"}
                onClick={() => {
                  // setDisableButtonBooking1("");
                  prevStep();
                }}
              />
            )}
            {step >= 1 && step < 3 && (
              <ButtonSecondary
                content={"Next"}
                onClick={() => {
                  nextStep();
                  setPaymentMethod("Cash");
                }}
                disabled={disableButtonBooking1.length <= 0}
              />
            )}
            {step === 3 && (
              <Confirmation
                title={"Booking Confirmation"}
                description={"Are you sure to booking this pet sitter?"}
                secondaryContent={"Cancel"}
                secondaryWidth={"120px"}
                primaryContent={"Yes, I’m sure"}
                primaryWidth={"142px"}
                buttonName={"Confirm Booking"}
                buttonWidth={"175px"}
                // disabled={disableButtonBooking3}
                disabled={
                  confirmbooking !== "successful" && paymentMethod !== "Cash"
                }
                onClick={() => {
                  createBooking(bookingData);
                  setConfirmbooking("");
                }}
              />
            )}
          </div>
        </div>
        <BookingDatail />
      </div>
    </>
  );
}

export default BookingPage;
