import { CalendarIcon, ClockIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingDate() {
  const [startTime, setstartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  console.log(`booking on date ${date} time ${startTime} to ${endTime}`);

  return (
    <>
      {" "}
      <button onClick={() => window.my_modal_3.showModal()}>
        <ButtonPrimary content="Book Now" width=" 250px" />
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
            <div onClick={() => navigate("/booking")}>
              <ButtonPrimary width={"100%"} content={"Continue"} />
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default BookingDate;
