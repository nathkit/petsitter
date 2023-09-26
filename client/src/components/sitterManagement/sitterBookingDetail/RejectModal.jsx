import React from "react";
import { Close } from "../../systemdesign/Icons";
import { ButtonPrimary } from "../../systemdesign/Button";
import { ButtonSecondary } from "../../systemdesign/Button";

function RejectModal({updateStatus}) {

  return (
    <dialog id={`reject`} className="modal">
      <div className="modal-box p-0 max-w-[400px] bg-etc-white ">
        <form method="dialog">
          <div className=" flex justify-between  items-center px-6 py-4 text-[#2A2E3F]">
            <h3 className=" text-headline4 ">Reject Confirmation</h3>
            <button className="btn btn-ghost">
              <Close fill="#AEB1C3"/>
            </button>
          </div>
        </form>

        <hr className=" w-full" />
        <section className=" w-full p-6 flex flex-col items-start gap-6">
            <p className=" text-body2 text-gray-400 w-full " >Are you sure to reject this booking?</p>
            <div className=" flex flex-row w-full justify-between">
              <form method="dialog">
                <ButtonSecondary content="Cancel"  />
                </form>
                <ButtonPrimary content="Reject Booking" width="auto" onClick={()=>updateStatus("Canceled")}/>
            </div>
        </section>
      </div>
    </dialog>
  );
}

export default RejectModal;
