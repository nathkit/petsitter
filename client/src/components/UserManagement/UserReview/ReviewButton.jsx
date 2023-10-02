import { useEffect, useState } from "react";
import { StarIcon } from "../../systemdesign/Icons";
import { ButtonSecondary, ButtonPrimary } from "../../systemdesign/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReviewButton(props) {
  const params = useParams();

  const [review, setReview] = useState({
    comment: "",
    rating: 5,
  });

  useEffect(() => {
    console.log(review);
  }, [review]);

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

  const handleReviewText = (event) => {
    let comment = event.target.value;
    setReview({
      ...review,
      comment: comment,
    });
  };

  const handleClear = (event) => {
    event.preventDefault();
    setReview({
      comment: "",
      rating: 5,
    });
  };

  const addNewReview = async () => {
    const apiUrl = `/userManagement/${params.userId}/booking/${props.bookingId}/review`;
    console.log(apiUrl);
    await axios
      .post(apiUrl, review)
      .then(function (response) {
        console.log("Success:", response.data);
        props.fetch();
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <ButtonPrimary
        className="btn"
        onClick={(e) => {
          document.getElementById("my_modal_1").showModal();
          handleClear(e);
        }}
        content="Review"
      />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[800px] font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
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
            <div className="w-full flex flex-col gap-6 items-center">
              <h3>Share more about your experience</h3>
              <textarea
                id="search"
                className="outline-none bg-etc-white w-full h-[243px] p-3 border-solid rounded-[8px] text-[16px]
                     borde border-[1px] focus:border-orange-300 resize-none"
                placeholder="Your Review..."
                onChange={(e) => handleReviewText(e)}
                value={review.text}
                style={{ verticalAlign: "top" }}
              ></textarea>
            </div>
            <form method="dialog">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
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
    </div>
  );
}

export default ReviewButton;
