import { useEffect, useState } from "react";
import { ButtonSecondary } from "../../systemdesign/Button";
import { StarIcon } from "../../systemdesign/Icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { timeFormat } from "../../../utils/timeFormat";

function YourReviewButton(props) {
  const [reviews, setReviews] = useState({});
  const params = useParams();

  const getReview = async () => {
    const result = await axios.get(
      `/userManagement/${params.userId}/booking/${props.bookingId}/review`
    );
    setReviews(result.data.data);
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div>
      <ButtonSecondary
        className="btn"
        onClick={(e) => {
          document.getElementById(props.bookingId).showModal();
        }}
        content="Your Review"
      />
      <dialog id={props.bookingId} className="modal">
        <div className="modal-box w-5/12 max-w-5xl h-[603px] font-bold text-[24px] text-gray-600 p-0 bg-etc-white">
          <div className="flex px-10 py-6 h-[80px]">
            <h3>Your Rating and Review</h3>
          </div>
          <hr />
          <div className="flex flex-col gap-20 p-10 h-[520px]">
            <div className="h-[312px] flex flex-col gap-4">
              <div className="flex h-[128px] px-6 pt-6 pb-10">
                <div className="flex w-[220px] h-[56px] font-medium gap-4">
                  <img
                    src={reviews.profile_image_path}
                    alt={reviews.full_name}
                    className="rounded-full"
                    width={56}
                    height={56}
                  />
                  <div>
                    <div className="text-[18px] text-[#000]">
                      {reviews.full_name}
                    </div>
                    <div className="text-[14px] text-gray-400">
                      {timeFormat(reviews.date)}
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
                    {reviews.comment}
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <form method="dialog" className="flex justify-center">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <Link to={`/sitterDetail/${props.sitterId}`}>
                <ButtonSecondary
                  className="btn"
                  content="View Pet Sitter"
                  width="157px"
                />
              </Link>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default YourReviewButton;
