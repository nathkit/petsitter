import { useEffect, useState } from "react";
import { StarIcon } from "../systemdesign/Icons";
import { ButtonSecondary, ButtonPrimary } from "../systemdesign/Button";

function ReviewButton() {
  const [review, setReview] = useState({
    text: "",
    rating: 0,
  });

  useEffect(() => {
    console.log(review);
  }, [review]);

  const handleRatingReview = (event, index) => {
    event.preventDefault();
    if (review.rating === index + 1) {
      setReview({
        ...review,
        rating: 0,
      });
    } else {
      setReview({
        ...review,
        rating: index + 1,
      });
    }
  };

  const handleReviewText = (event) => {
    let text = event.target.value;
    setReview({
      ...review,
      text: text,
    });
  };

  const handleClear = (event) => {
    event.preventDefault();
    setReview({
      text: "",
      rating: 0,
    });
  };

  return (
    <div>
      <ButtonPrimary
        className="btn"
        onClick={(e) => {
          document.getElementById("my_modal_4").showModal();
          handleClear(e);
        }}
        content="Review"
      />
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[800px] font-bold text-[24px] text-gray-600 px-10 pt-[24px] pb-[40px]">
          <div className="flex justify-between">
            <h3>Rating & Review</h3>
          </div>
          <div className="flex flex-col gap-20 pt-[64px]">
            <div className="flex flex-col gap-6 items-center">
              <h3>What is your rate?</h3>
              <div className="flex gap-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleRatingReview(e, index)}
                  >
                    <StarIcon
                      color={`${index + 1 <= review.rating ? "#1ccd83" : ""}`}
                      height="60px"
                      width="60px"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-6 items-center">
              <h3>Share more about your experience</h3>
              <input
                type="text"
                id="seacrh"
                className="outline-none w-full h-[243px] p-3 border-solid rounded-[8px] text-[16px]
              border-[#DCDFED] border-[1px] focus:border-orange-300"
                placeholder="Your Review"
                onChange={(e) => handleReviewText(e)}
                value={review.text}
              />
            </div>
            <form method="dialog">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="flex justify-between">
                <ButtonSecondary className="btn" content="Cancel" />
                <ButtonPrimary
                  content="Send Review&Rating"
                  width="202px"
                  className="btn"
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ReviewButton;
