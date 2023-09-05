import { useState } from "react";
import starGreen from "../assets/img/starGreen.png";
import Booking1 from "../components/booking/Booking1";
import Booking2 from "../components/booking/Booking2";
import Booking3 from "../components/booking/Booking3";
import { Step1, Step2, Step3 } from "../components/systemdesign/Icons";

import Confirmation from "../components/booking/Confirmation";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../components/systemdesign/Button";

function BookingPage() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step <= 2) {
      setStep(step - 1);
      setIsCheckboxChecked("");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };
  return (
    <>
      <nav className=" flex justify-between bg-gray-300">
        <div>Sitter</div>
        <div className=" flex">
          <div>image</div>
          <ButtonPrimary width={"168px"} content={"find a pet sitter"} />
        </div>
      </nav>
      <div className=" bg-etc-bg_gray w-full h-screen px-20 pt-10 pb-20 flex">
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
          {step === 1 && <Booking1 CheckboxStatus={setIsCheckboxChecked} />}
          {step === 2 && <Booking2 />}
          {step === 3 && <Booking3 />}
          <div className=" p-10 w-full h-fit bg-etc-white flex justify-between">
            {step >= 1 && (
              <ButtonPrimary
                content={"Back"}
                onClick={() => {
                  prevStep();
                }}
              />
            )}
            {step >= 1 && step < 3 && (
              <ButtonSecondary
                content={"Next"}
                disabled={!isCheckboxChecked}
                onClick={nextStep}
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
              />
            )}
          </div>
        </div>

        <div className=" bg-etc-white w-[32.5%] rounded-2xl h-fit relative">
          <p className="p-6 text-center text-headline3">Booking Detail</p>
          <hr />
          <div className="p-6 ">
            <div className="pb-6">
              <p className="text-body3">Pet</p>
              <p className="text-body2">Happy</p>
            </div>
            <div className="pb-6">
              <p className="text-body3">Date</p>
              <p className="text-body2">25 Aug, 2023</p>
            </div>
            <div className="pb-6">
              <p className="text-body3">Duration</p>
              <p className="text-body2">3 hours</p>
            </div>
            <div>
              <p className="text-body3">Pet</p>
              <p className="text-body2">-</p>
            </div>
            <div>
              <p className="text-body3">Additional Message </p>
              <p className="text-body2">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex justify-between p-6 bg-etc-black text-etc-white rounded-b-2xl">
            <p className="text-body2">Total</p>
            <p className="text-body1">600.00 THB</p>
          </div>
          <img
            src={starGreen}
            className=" absolute bottom-[-300px] right-[-50px] h-[250px] w-[300px]"
          />
        </div>
      </div>
    </>
  );
}

export default BookingPage;
