import React from "react";
import { StarIcon } from "../../systemdesign/Icons";
import { ButtonSecondary, ButtonPrimary } from "../../systemdesign/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReviewModal({ setBooking, booking }) {
  const params = useParams();
  const [review, setReview] = useState({
    rating: 5,
  });

  useEffect(() => {
    console.log(review);
  }, []);

  const handleRatingReview = (event, index) => {
    event.preventDefault();
    if (review.rating === index + 1) {
      setReview({
        ...review,
        rating: 5,
      });
    } else {
      setReview({
        ...review,

        rating: index + 1,
      });
    }
  };

  const addNewReview = async () => {
    const apiUrl = `/sitterManagement/${params.userId}/booking/${params.bookingId}/review`;

    try {
      const response = await axios.post(apiUrl, review);
      console.log("Success:", response.data);

      const updatedBooking = { ...booking, review_id: response.data.review_id };
      setBooking(updatedBooking);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <dialog id={`review`} className="modal">
      <div className="modal-box max-w-[800px] font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
        <div className="flex px-10 py-6">
          <h3>Rating & Review</h3>
        </div>
        <hr />
        <div className="flex flex-col gap-20 p-10">
          <div className="flex flex-col gap-6 items-center">
            <h3>What is your rate?</h3>
            <div className="flex gap-4">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleRatingReview(e, index)}
                >
                  <StarIcon
                    color={`${
                      index + 1 <= review.rating ? "#1ccd83" : "#DCDFED"
                    }`}
                    height="60px"
                    width="60px"
                  />
                </button>
              ))}
            </div>
          </div>
          <form method="dialog">
            <div className="flex justify-between">
              <ButtonSecondary className="btn" content="Cancel" />

              <ButtonPrimary
                content="Send Review & Rating"
                width="220px"
                className="btn"
                onClick={() => addNewReview()}
              />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ReviewModal;
