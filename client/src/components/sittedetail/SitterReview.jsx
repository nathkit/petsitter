import union from "../../assets/SitterReview/Union.png";
import reviewData from "../../assets/SitterReview/reviewsdata.json"; // mock review data
import { StarIcon } from "../systemdesign/Icons";
import { useState } from "react";

function SitterReview() {
  const starRates = [5, 4, 3, 2, 1];

  const [searchData, setSearchData] = useState({
    search: "",
    types: [],
    rate: undefined,
    exp: 0,
  });

  const handleRating = (event, rate) => {
    event.preventDefault();
    if (searchData.rate === rate) {
      setSearchData({
        ...searchData,
        rate: undefined,
      });
    } else {
      setSearchData({
        ...searchData,
        rate: rate,
      });
    }
  };

  const totalReviews = reviewData.length;

  let totalRating = 0.0;
  for (const review of reviewData) {
    totalRating += review.rating;
  }

  const averageRating = totalRating / totalReviews;

  return (
    <div className="sitter-review w-[100%] min-h-screen bg-etc-bg_gray">
      <div className="sitter-review-container p-6 bg-gray-100 w-[800px]  rounded-tl-[120px] rounded-r-[16px] rounded-b-[16px] rounded-l-[16px]">
        <div className="sitter-review-header p-6 bg-etc-white rounded-tl-[99px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[99px] flex items-center gap-8">
          <div className="image-wrapper relative">
            <img src={union} alt="union-icon" />
            <h1 className="average-rating text-headline2 text-etc-white absolute top-[27%] left-[33%]">
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
                  <button
                    className=" h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-gray-200 bg-etc-white text-gray-400 hover:border-orange-500 hover:text-orange-500 focus:border-orange-500"
                  >
                    All Reviews
                  </button>
                  {starRates.map((rate, index) => (
                    <button
                      id={rate + "star"}
                      key={index}
                      className={`flex items-center h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-gray-200 bg-etc-white hover:border-orange-500
                  ${
                    rate === searchData.rate
                      ? "border-orange-500 text-orange-500 "
                      : ""
                  }
                  `}
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
          {reviewData.map((review) => (
            <div key={review.review_id} className="review">
              <img src={review.avatar} alt="avatar" className="h-[50px]" />
              <div className="w-[20%]">
                <h2>{review.full_name}</h2>
                <p>{review.created_date}</p>
              </div>
              <p>{review.review_description}</p>
              <div className="rating">
                {Array.from({ length: review.rating }, (_, index) => (
                  <StarIcon key={index} color="#1CCD83" />
                ))}
                <p>{review.review_description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SitterReview;
