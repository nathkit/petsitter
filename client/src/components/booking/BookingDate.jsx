import { CalendarIcon, ClockIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useState } from "react";

function BookingDate() {
  const [startTime, setstartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  console.log(`booking on date ${date} time ${startTime} to ${endTime}`);

  return (
    <>
      {" "}
      <button className="btn" onClick={() => window.my_modal_3.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_3" className="modal ">
        <form method="dialog" className="modal-box max-w-[560px] px-10 py-0">
          <div className="flex justify-between my-6">
            <h3 className="text-headline3">Booking</h3>
            <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
          </div>

          <hr />
          <div className="my-10">
            <p className="mb-6 text-body1">
              Select date and time you want to schedule the service.
            </p>
            <div>
              <div className=" flex items-center justify-around mb-6">
                <CalendarIcon />
                <input
                  type="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className="input input-bordered w-[27.5rem] "
                />
              </div>
              <div className=" flex items-center justify-around mb-[3.75rem]">
                <ClockIcon />
                <input
                  type="time"
                  onChange={(e) => {
                    setstartTime(e.target.value);
                  }}
                  className="input input-bordered w-52 "
                />
                -
                <input
                  type="time"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  className="input input-bordered w-52"
                />
              </div>
            </div>
            <ButtonPrimary width={"100%"} content={"Continue"} />
          </div>
        </form>
      </dialog>
    </>
  );
}

export default BookingDate;
