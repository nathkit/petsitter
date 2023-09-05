import React, { useState } from "react";
import Booking1 from "../components/booking/Booking1";
import Booking2 from "../components/booking/Booking2";
import Booking3 from "../components/booking/Booking3";
import Booking4 from "../components/booking/Booking4";
import Confirmation from "../components/booking/Confirmation";
import { ButtonPrimary } from "../components/systemdesign/Button";

import BookingDate from "../components/booking/BookingDate";

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';

// const steps = ['Your Pet', 'Information', 'Payment'];

function BookingPage() {
  // const [openBookingDate, setBookingDate] = useState(true);
  return (
    <>
      <nav className=" flex justify-between bg-gray-300">
        <div>Sitter</div>
        <div className=" flex">
          <div>image</div>
          <ButtonPrimary width={"168px"} content={"find a pet sitter"} />
        </div>
      </nav>
      {/* <div className=" bg-etc-bg_gray w-full h-fit px-20 pt-10 pb-20 flex">
        <div className="mr-[2.25rem] w-[68.5%]">
          <div className=" flex justify-around bg-etc-white mb-4">
            <div>Your Pet</div>
            <div>Information</div>
            <div>Payment</div>
          </div>
          <Booking1 />
          <Booking2 />
          <Booking3 />
        </div>

        <div className=" bg-etc-white w-[32.5%] rounded-2xl h-fit">
          <p className="p-6 text-center text-headline3">Booking Detail</p>
          <hr />
          <div className="p-6">
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
        </div>
      </div> */}
      {/* <Confirmation
        title={"Booking Confirmation"}
        description={"Are you sure to booking this pet sitter?"}
        secondaryContent={"Cancel"}
        secondaryWidth={"120px"}
        primaryContent={"Yes, I’m sure"}
        primaryWidth={"142px"}
      /> */}
      <Booking4 />
      {/* <BookingDate /> */}
    </>
  );
}

export default BookingPage;
