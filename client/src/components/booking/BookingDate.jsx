import { CalendarIcon, ClockIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns-tz";

function BookingDate() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isTimeValid = startTime < endTime;

  return (
    <>
      {" "}
      <button onClick={() => window.my_modal_3.showModal()}>
        <ButtonPrimary content="Book Now" width=" 250px" />
      </button>
      <dialog id="my_modal_3" className="modal ">
        <form method="dialog" className="modal-box max-w-[560px] px-10 py-0 bg-etc-white">
          <div className="flex justify-between my-6">
            <h3 className="text-headline3">Booking</h3>
            <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
          </div>
          <hr />
          <div className="my-10 h-[20%]">
            <p className="mb-6 text-body1">
              Select date and time you want to schedule the service.
            </p>
            <div>
              <div className=" flex items-center justify-around mb-6">
                <CalendarIcon />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd MMM yyyy"
                  minDate={new Date()}
                  placeholderText={format(new Date(), "dd MMMM yyyy")}
                  className="input input-bordered w-[27.5rem]"
                />
              </div>
              <div className="flex items-center justify-around mb-[3.75rem]">
                <ClockIcon />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input input-bordered w-52"
                />
                -
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input input-bordered w-52"
                />
              </div>
            </div>
            {isTimeValid ? (
              <ButtonPrimary width={"100%"} content={"Continue"} />
            ) : (
              <ButtonPrimary
                width={"100%"}
                content={"Continue"}
                disabled={!isTimeValid}
              />
            )}
          </div>
        </form>
      </dialog>
    </>
  );
}

export default BookingDate;
