import React from "react";
import { useEffect, useState } from "react";
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
        <div className="modal-box  max-w-[350px] h-fit font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
          <form method="dialog">
            <div className=" flex  px-10 py-6 h-[80px] text-headline4">
              <h3 className="flex">Your Rating and Review</h3>

              <button className="btn btn-lg flex btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </div>
          </form>
          <hr />

          <div className=" h-64 flex justify-center gap-4">
            <div className="flex h-[128px] px-6 pt-6">
              <div className="flex flex-col items-center w-[220px] h-[56px] font-medium gap-5">
                <div>
                  <img
                    className=" w-24 h-24  text-body2 text-center"
                    src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f415-200d-1f9ba.svg"
                    alt="rating successful"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: reviews.rating }, (_, index) => (
                      <StarIcon key={index} color="#1CCD83" />
                    ))}
                  </div>
                  <div className="text-[16px] text-gray-500 font-medium">
                    {/* {reviews.comment} */}
                  </div>
                </div>
                <div>
                  <div className=" text-body2 text-[#000]">
                    Booking No.{reviews.booking_id}
                  </div>
                  <div className="text-[14px] text-gray-400">
                    {timeFormat(reviews.created_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default YourReview;
