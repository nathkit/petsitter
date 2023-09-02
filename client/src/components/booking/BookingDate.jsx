import { CalendarIcon, ClockIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";

function BookingDate() {
  // if (!props.open) {
  //   return null;
  // }

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
            <p className="mb-6 text">
              Select date and time you want to schedule the service.
            </p>
            <div>
              <div className=" flex items-center justify-around mb-6">
                <CalendarIcon />
                <input
                  type="date"
                  placeholder="Type here"
                  className="input input-bordered w-[27.5rem] "
                />
              </div>
              <div className=" flex items-center justify-around mb-[3.75rem]">
                <ClockIcon />
                <input type="time" className="input input-bordered w-52 " />
                -
                <input
                  type="time"
                  name="time"
                  placeholder="Type here"
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
