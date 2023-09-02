import React, { useState } from "react";
import Booking1 from "../components/booking/Booking1";
import Booking2 from "../components/booking/Booking2";
import Booking3 from "../components/booking/Booking3";
import Booking4 from "../components/booking/Booking4";
import { ButtonPrimary } from "../components/systemdesign/Button";

import BookingDate from "../components/booking/BookingDate";

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
      {/* <Booking1 /> */}
      {/* <Booking2 /> */}
      {/* <Booking3 /> */}
      {/* <Booking4 /> */}
      <BookingDate />
    </>
  );
}

export default BookingPage;
