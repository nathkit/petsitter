import React, { useState } from "react";
import Booking1 from "../components/booking/Booking1";
import Booking2 from "../components/booking/Booking2";
import Booking3 from "../components/booking/Booking3";
import Booking4 from "../components/booking/Booking4";
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
      <div className=" bg-gray-100 w-full h-fit px-20 pt-10 pb-20 flex">
        <div className="mr-[2.25rem] w-[68.5%]">
          <div className=" flex justify-around bg-blue-100 mb-4">
            <div>Your Pet</div>
            <div>Information</div>
            <div>Payment</div>
          </div>
          {/* <Booking1 /> */}
          <Booking2 />
          {/* <Booking3 /> */}
          {/* <Booking4 /> */}
        </div>

        <div className=" bg-green-100 w-[32.5%]">
          <p>Booking Detail</p>
          <hr />
          <div>
            <p>Pet</p>
            <p>Happy</p>
          </div>
          <div>
            <p>Date</p>
            <p>25 Aug, 2023</p>
          </div>
          <div>
            <p>Duration</p>
            <p>3 hours</p>
          </div>
          <div>
            <p>Pet</p>
            <p>-</p>
          </div>
        </div>
      </div>
      {/* <BookingDate /> */}
    </>
  );
}

export default BookingPage;
