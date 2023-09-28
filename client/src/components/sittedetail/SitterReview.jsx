import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import union from "../../assets/SitterReview/Union.png";
import { StarIcon } from "../systemdesign/Icons";
import { timeFormatForSitterReviews } from "../../utils/timeFormat";
import { ArrowLeftIcon, ArrowRightIcon } from "../systemdesign/Icons";

function SitterReview() {
  const starRates = ["All Reviews", 5, 4, 3, 2, 1];
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0.0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [searchData, setSearchData] = useState({ rate: "All Reviews" });
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const params = useParams();

  const handleRating = (event, rate) => {
    event.preventDefault();
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      rate: rate === prevSearchData.rate ? "All Reviews" : rate,
    }));
    setPaging({ ...paging, currentPage: 1 });
  };

  const handlePaging = (event, page) => {
    event.preventDefault();
    setPaging({ ...paging, currentPage: page });
  };

  const getSitterReviewById = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.get(
        `/sitterManagement/${params.sitterId}/review`,
        {
          params: {
            rate:
              searchData.rate === "All Reviews" ? undefined : searchData.rate,
            page: paging.currentPage,
          },
        }
      );

      const { reviews: newReviews, totalData } = response.data;
      setReviews(newReviews);
      setAverageRating(newReviews.length > 0 ? newReviews[0].avg_rating : 0);
      setTotalReviews(totalData || 0);
      setTotalData(totalData || 0);
      setCurrentPage(response.data.paging.currentPage);
      setTotalPages(response.data.paging.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getSitterReviewById();
  }, [searchData.rate, paging.currentPage, params.sitterId]);

  useEffect(() => {
    setFilteredReviews(
      searchData.rate === "All Reviews"
        ? reviews
        : reviews.filter((review) => review.rating === searchData.rate)
    );
  }, [reviews, searchData.rate]);

  return (
    <div className="sitter-review w-full min-h-screen bg-etc-bg_gray">
      <div className="sitter-review-container p-6 bg-gray-100 w-5/6 rounded-[16px]">
        <div className="sitter-review-header p-6 bg-etc-white rounded-tl-[99px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[99px] flex items-center gap-8">
          <div className="image-wrapper relative">
            <img src={union} alt="union-icon" />
            <h1 className="average text-headline2 text-etc-white absolute top-[22%] left-[24%]">
              {averageRating || "N/A"}
            </h1>
            <h3 className="total-reviews text-body3 text-etc-white absolute top-[59%] left-[24%]">
              {totalReviews <= 1
                ? `${totalReviews} Review`
                : `${totalReviews} Reviews`}
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
                      key={rate}
                      className={`flex items-center h-[36px] px-2 py-1 gap-1 border-[1px] rounded-[8px] text-gray-400 border-gray-200 bg-etc-white hover:border-orange-500 ${
                        rate === searchData.rate
                          ? "border-orange-500 text-orange-500"
                          : ""
                      }`}
                      onClick={(e) => handleRating(e, rate)}
                    >
                      <span className="pr-[3px] font-Satoshi ">{rate}</span>
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

        <div className="sitter-review-list w-[100%] flex flex-col gap-4 p-6 pt-12 ">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(
              (
                { user_profile_image_path, full_name, date, rating, comment },
                index
              ) => (
                <div
                  className="review flex h-[204px] w-[100%] border border-gray-100 border-b-gray-200 "
                  key={index}
                >
                  <div className="flex gap-4 w-[35%] items-start">
                    <Avatar
                      alt="avatar"
                      src={user_profile_image_path}
                      className="border"
                    />
                    <div>
                      <h2 className="text-body1 text-etc-black ">
                        {full_name}
                      </h2>
                      <p className="text-body3 text-gray-400">
                        {timeFormatForSitterReviews(date)}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="rating flex flex-col w-[65%] gap-5">
                    <div className="star flex gap-1 items-center">
                      {Array.from({ length: rating }, (_, starIndex) => (
                        <StarIcon key={starIndex} color="#1CCD83" />
                      ))}
                    </div>
                    <p className="text-gray-500 text-body2">{comment}</p>
                  </div>
                </div>
              )
            )
          ) : (
            <div>No reviews available</div>
          )}
        </div>
        <div className="flex justify-center items-center gap-3 font-bold text-gray-300 py-8">
          <button
            className="p-[10px]"
            onClick={(e) => {
              if (paging.currentPage > 1) {
                handlePaging(e, paging.currentPage - 1);
              }
            }}
          >
            <ArrowLeftIcon color="#AEB1C3" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] rounded-full hover:bg-orange-100 hover:text-orange-500 ${
                index + 1 === currentPage ? "bg-orange-100 text-orange-500" : ""
              }`}
              onClick={(e) => {
                handlePaging(e, index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-[10px]"
            onClick={(e) => {
              if (currentPage < totalPages) {
                handlePaging(e, currentPage + 1);
              }
            }}
          >
            <ArrowRightIcon color="#AEB1C3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SitterReview;
