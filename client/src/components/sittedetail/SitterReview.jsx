// import union from "../../assets/SitterReview/Union.png";
import React from "react";
import { StarIcon } from "../systemdesign/Icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import union from "../../assets/SitterReview/Union.png";

function SitterReview() {
  const starRates = ["All Reviews", 5, 4, 3, 2, 1];
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const params = useParams();

  const [searchData, setSearchData] = useState({
    search: "",
    types: [],
    rate: undefined,
    exp: 0,
  });

  const handleRating = (event, rate) => {
    event.preventDefault();

    if (searchData.rate === rate || rate === "All Reviews") {
      setSearchData({
        ...searchData,
        rate: searchData.rate === rate ? undefined : "All Reviews",
      });

      if (rate === "All Reviews") {
        setFilteredReviews(reviews);
      } else {
        const filtered = reviews.filter(
          (review) => review.rating_review_star === rate
        );
        setFilteredReviews(filtered);
      }
    } else {
      setSearchData({
        ...searchData,
        rate,
      });

      const filtered = reviews.filter(
        (review) => review.rating_review_star === rate
      );
      setFilteredReviews(filtered);
    }
  };

  const getSitterReviewById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/sitter/${params.sitterId}`
      );
      console.log(response);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Request error occurred", error);
    }
  };

  useEffect(() => {
    getSitterReviewById();
  }, []);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  console.log("Result");
  console.log(reviews);

  const totalReviews = reviews.length;

  let totalRating = 0.0;
  for (const review of reviews) {
    totalRating += review.rating_review_star;
  }

  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  return (
    <div className="sitter-review w-[100%] min-h-screen bg-etc-bg_gray">
      <div className="sitter-review-container p-6 bg-gray-100 w-[800px] rounded-tl-[120px] rounded-r-[16px] rounded-b-[16px] rounded-l-[16px]">
        <div className="sitter-review-header p-6 bg-etc-white rounded-tl-[99px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[99px] flex items-center gap-8">
          <div className="image-wrapper relative">
            <img src={union} alt="union-icon" />
            <h1 className="average text-headline2 text-etc-white absolute top-[27%] left-[33%]">
              {averageRating.toFixed(1)}
            </h1>
            <h3 className="total-reviews text-body3 text-etc-white absolute top-[59%] left-[26%]">
              {totalReviews} Reviews
            </h3>
          </div>

          <div className="rating-wrapper flex flex-col gap-4">
            <h1 className="text-headline3 text-etc-black">Rating & Reviews</h1>
            <div className="rating-menu flex gap-2">
              <div>
                <div className="flex flex-wrap gap-2">
                  {starRates.map((rate, index) => (
                    <button
                      type="button"
                      id={`${rate}star`}
                      key={index}
                      className={`flex items-center h-[36px] px-2 py-1 gap-1 border-[1px] rounded-[8px] border-gray-200 bg-etc-white hover:border-orange-500 ${
                        rate === searchData.rate
                          ? "border-orange-500 text-orange-500"
                          : ""
                      }`}
                      onClick={(e) => handleRating(e, rate)}
                    >
                      <span className="pr-[3px] font-Satoshi text-gray-400">
                        {rate}
                      </span>
                      {Array.from({ length: rate }, (_, index) => (
                        <StarIcon key={index} color="#1CCD83" />
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sitter-review-list w-[100%] flex flex-col gap-4 p-6">
          {filteredReviews && filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div className="review flex" key={index}>
                <div className="flex gap-4">
                  <Avatar
                    alt="avatar"
                    src={review.pet_owner_image}
                    className="border"
                  />
                  <div>
                    <h2 className="text-body1">{review.pet_owner_name}</h2>
                    <p className="text-body3 text-gray-400">
                      {review.created_at}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="rating flex flex-col">
                  <div className="star flex gap-1">
                    {Array.from(
                      { length: review.rating_review_star },
                      (_, starIndex) => (
                        <StarIcon key={starIndex} color="#1CCD83" />
                      )
                    )}
                  </div>
                  <p className="text-gray-500 text-body2">
                    {review.rating_review_text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SitterReview;
