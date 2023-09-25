import React from "react";
import Avatar from "@mui/material/Avatar";
import { Close } from "../../systemdesign/Icons";

function PetDetailModal({ sitterBookingDetail }) {
  console.log("sitterBookingDetail:", sitterBookingDetail);

  return (
    <dialog id={`pet-${sitterBookingDetail.booking_no}`} className="modal">
      <div
        key={sitterBookingDetail.booking_no}
        className="modal-box max-w-[800px] h-auto p-0 "
      >
        <form method="dialog">
          <div className=" flex flex-row-reverse justify-between items-center w-full px-10 py-6">
            <button className="btn btn-ghost">
              <Close />
            </button>
            <h3 className=" text-headline3 h-fit ">
              {sitterBookingDetail.pet_names}
            </h3>
          </div>
        </form>

        <hr className=" w-full " />
        <section className=" w-full p-10 flex flex-row items-start gap-10">
          <div className=" flex flex-col justify-center gap-4">
            <div className=" avatar">
              <div className=" w-[240px] h-[240px] bg-etc-bg_gray rounded-full">
                <img src={sitterBookingDetail.pet_image} alt="Avatar" />
              </div>
            </div>
            <h4 className=" w-full text-center text-headline4 ">
              {sitterBookingDetail.pet_names}
            </h4>
          </div>
          <div className=" flex flex-col w-full h-auto gap-10 bg-etc-bg_gray p-6 rounded-lg">
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Pet Type</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.pet_type_id === 1
                    ? "Dog"
                    : sitterBookingDetail.pet_type_id === 2
                    ? "Cat"
                    : sitterBookingDetail.pet_type_id === 3
                    ? "Bird"
                    : sitterBookingDetail.pet_type_id === 4
                    ? "Rabbit"
                    : "Unknown"}
                </h4>
              </div>
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Breed</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.breed}
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Sex</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.sex}
                </h4>
              </div>
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Age</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.age} Month
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Color</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.color}
                </h4>
              </div>
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">Weight</h4>
                <h4 className=" text-body2 text-etc-black">
                  {sitterBookingDetail.weight} Kilogram
                </h4>
              </div>
            </div>
            <div className=" flex flex-row gap-10 w-full h-auto">
              <div className=" space-y-1 w-full h-auto ">
                <h4 className=" text-headline4 text-gray-300">About</h4>
                <h4
                  className={`text-body2 ${
                    sitterBookingDetail.description
                      ? "text-etc-black"
                      : " text-gray-300"
                  }`}
                >
                  {sitterBookingDetail.description ||
                    "-No additional information available-"}
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </dialog>
  );
}

export default PetDetailModal;
