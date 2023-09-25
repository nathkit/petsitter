import React from "react";
import { Close } from "../../systemdesign/Icons";
import { dateWithOutComma } from "../../../utils/timeFormat";

function ProfileModal({ sitterBookingDetail }) {
  return (
    <dialog id={`profile-${sitterBookingDetail.booking_no}`} className="modal">
      <div
        key={sitterBookingDetail.booking_no}
        className="modal-box max-w-[800px] h-auto p-0 "
      >
        <form method="dialog">
          <div className=" flex flex-row-reverse justify-between items-center w-full px-10 py-6">
            <button className="btn btn-ghost">
              <Close fill="#3A3B46" />
            </button>
            <h3 className=" text-headline3 h-fit ">
              {sitterBookingDetail.user_full_name}
            </h3>
          </div>
        </form>

        <hr className=" w-full " />
        <section className=" w-full p-10 flex flex-row items-start gap-10">
          <div className=" flex flex-col justify-center gap-4">
            <div className=" avatar">
              <div className=" w-[240px] h-[240px] bg-etc-bg_gray rounded-full">
                <img src={sitterBookingDetail.user_image} alt="Avatar" />
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-full h-auto gap-10 bg-etc-bg_gray p-6 rounded-lg">
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">
                  Pet Owner Name
                </h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.user_full_name}
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Email</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.email}
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Phone</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.phone}
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">ID Number</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.id_number}
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Date of Birth</h4>
                <h4 className=" text-body2 text-etc-black">
                  {dateWithOutComma(sitterBookingDetail.date_of_birth)}
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </dialog>
  );
}

export default ProfileModal;
