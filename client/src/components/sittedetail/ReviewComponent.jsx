function ReviewComponent({ review, starRatings }) {
  const rating = review.rating; // รับ prop review,starrRating from Sitter review

  let ratingComponent;

  switch (rating) {
    case 1:
      ratingComponent = starRatings.oneStarRating;
      break;
    case 2:
      ratingComponent = starRatings.twoStarRating;
      break;
    case 3:
      ratingComponent = starRatings.threeStarRating;
      break;
    case 4:
      ratingComponent = starRatings.fourStarRating;
      break;
    case 5:
      ratingComponent = starRatings.fiveStarRating;
      break;
    default:
      ratingComponent = null;
      break;
  }

  return (
    <div className="review flex gap-3 w-[100%] h-[204px] border border-gray-100 border-b-gray-200">
      <img src={review.avatar} alt="avatar" className="h-[50px]" />
      <div className="w-[20%]">
        <h2>{review.full_name}</h2>
        <p>{review.created_date}</p>
      </div>
      <div className="w-[70%]">
        <div className="flex pb-3">{ratingComponent}</div>
        <p>{review.review_description}</p>
      </div>
    </div>
  );
}

export default ReviewComponent;
