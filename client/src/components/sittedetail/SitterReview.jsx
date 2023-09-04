import React from "react";
import union from "../../assets/SitterReview/Union.png"
import { useStarContext } from "../../contexts/StarRatingContext";
import { Button } from "../systemdesign/Button";
import reviewData from "../../assets/SitterReview/reviewsdata.json"; // mock review data
import ReviewComponent from "./ReviewComponent";

function SitterReview() {
  // ใช้ value จาก useStarContext (context API)
  const { starRatings } = useStarContext();

  const fiveStarRating = starRatings.fiveStar;
  const fourStarRating = starRatings.fourStar;
  const threeStarRating = starRatings.threeStar;
  const twoStarRating = starRatings.twoStar;
  const oneStarRating = starRatings.oneStar;

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
              {/* ใช้ value จาก button component + useStarContext */}
              <Button>All Reviews</Button>
              <Button>
                <h6 className="pt-1 text-body2">5</h6>
                <div className="flex gap-1 ">{fiveStarRating}</div>
              </Button>
              <Button>
                <h6 className="pt-1 text-body2">4</h6>
                <div className="flex gap-1 ">{fourStarRating}</div>
              </Button>
              <Button>
                <h6 className="pt-1 text-body2">3</h6>
                <div className="flex gap-1 ">{threeStarRating}</div>
              </Button>
            </div>
            <div className="rating-menu flex gap-2">
              <Button>
                <h6 className="pt-1 text-body2">2</h6>
                <div className="flex gap-1 ">{twoStarRating}</div>
              </Button>
              <Button>
                <h6 className="pt-1 text-body2">1</h6>
                <div className="flex gap-1 ">{oneStarRating}</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="sitter-review-list w-[100%] flex flex-col gap-4 p-6">
          {reviewData.map((review) => (
            //  ReviewComponent ใช้เพื่อดึงค่าจาก review.rating ให้เปลี่ยนเป็น star icon
            //  เพราะ mock data ของ rating กำหนดเป็นตัวเลข
            <ReviewComponent
              key={review.review_id}
              review={review}
              starRatings={{
                oneStarRating,
                twoStarRating,
                threeStarRating,
                fourStarRating,
                fiveStarRating,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SitterReview;
