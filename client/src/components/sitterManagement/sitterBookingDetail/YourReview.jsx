import React from "react";
import { useEffect, useState } from "react";
import { ButtonSecondary } from "../../systemdesign/Button";
import { StarIcon } from "../../systemdesign/Icons";
import { useParams } from "react-router-dom";
import { timeFormat } from "../../../utils/timeFormat";
import axios from "axios";

function YourReview() {
  const [reviews, setReviews] = useState({});
  const params = useParams();

  const getReview = async () => {
    const result = await axios.get(
      `/sitterManagement/${params.userId}/booking/${params.bookingId}/review`
    );
    setReviews(result.data.data);
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div>
      <dialog id="yourreview" className="modal">
        <div className="modal-box  max-w-fit h-fit font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
          <div className="flex px-10 py-6 h-[80px]">
            <h3>Your Rating and Review</h3>
          </div>
          <hr />
          <div className="flex flex-col gap-20 p-10 h-[520px]">
            <div className="h-[312px] flex flex-col gap-4">
              <div className="flex h-[128px] px-6 pt-6 pb-10">
                <div className="flex w-[220px] h-[56px] font-medium gap-4">
                  <div>
                    <div className=" text-body2 text-[#000]">
                      Booking No.{reviews.booking_id}
                    </div>
                    <div className="text-[14px] text-gray-400">
                      {timeFormat(reviews.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: reviews.rating }, (_, index) => (
                      <StarIcon key={index} color="#1CCD83" />
                    ))}
                  </div>
                  <div className="text-[16px] text-gray-500 font-medium">
                    {/* {reviews.comment} */}
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <form method="dialog" className="flex justify-center">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default YourReview;
