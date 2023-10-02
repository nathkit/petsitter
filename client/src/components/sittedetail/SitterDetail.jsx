import SitterPictureSlide from "./SitterPictureSlide";
import SitterReview from "./SitterReview";
import BookingDate from "../booking/BookingDate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DogType,
  CatType,
  BirdType,
  RabbitType,
} from "../systemdesign/PetType.jsx";
import { useBooking } from "../../contexts/BookingContext";

function SitterDetail() {
  const { getSitterDetail, sitterDetail } = useBooking();
  const params = useParams();

  useEffect(() => {
    getSitterDetail(params.sitterId);
  }, []);

  const avgRating = parseFloat(sitterDetail[0]?.avg_rating);

  const starIcons = !isNaN(avgRating)
    ? Array.from({ length: Math.floor(avgRating || 0) }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#1CCD83"
        >
          <path d="M8.14319 1.42372C8.53185 0.777902 9.46815 0.777901 9.85681 1.42372L12.0731 5.10651C12.2128 5.33853 12.4405 5.504 12.7043 5.56509L16.8918 6.53491C17.6261 6.70498 17.9154 7.59545 17.4213 8.16466L14.6036 11.4106C14.4261 11.6151 14.3391 11.8828 14.3625 12.1526L14.7342 16.4347C14.7994 17.1857 14.0419 17.736 13.3478 17.442L9.39009 15.7653C9.14076 15.6596 8.85924 15.6596 8.60991 15.7653L4.65216 17.442C3.95813 17.736 3.20065 17.1857 3.26582 16.4347L3.63745 12.1526C3.66087 11.8828 3.57387 11.6151 3.39637 11.4106L0.578707 8.16466C0.0845982 7.59545 0.373929 6.70498 1.10824 6.53491L5.29567 5.56509C5.55948 5.504 5.78723 5.33853 5.92685 5.10652L8.14319 1.42372Z" />
        </svg>
      ))
    : null;

  const ratingDisplay = !isNaN(avgRating) ? (
    <div className="flex justify-center mt-1">{starIcons}</div>
  ) : (
    <div className="flex justify-center mt-1 text-gray-400">No rating</div>
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-etc-bg_gray">
      <SitterPictureSlide />
      <div
        className="
       flex justify-between px-[40px] gap-[16px] w-full"
      >
        {/* Detail */}
        <div className=" w-[70%] px-14 flex flex-col items-start justify-center gap-[48px]">
          <div className=" flex flex-col gap-12 px-14">
            <h1 className="text-headline1 text-etc-black">
              {" "}
              {sitterDetail[0]?.trade_name}
            </h1>

            <div className=" w-[688px]">
              <h3 className="text-headline3 mb-[12px] text-etc-black">
                Introduction
              </h3>
              <pre
                className="text-clip font-[500px] text-[16px] text-gray-500 break-all"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {sitterDetail[0]?.introduction}
              </pre>
            </div>

            <div className=" w-[688px] text-justify">
              <h3 className="text-headline3 mb-[12px] text-etc-black">
                Services
              </h3>
              <pre
                className="text-clip font-[500px] text-[16px] text-gray-500 break-all"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {" "}
                {sitterDetail[0]?.service_description}
              </pre>
            </div>
            <div className=" w-[688px]">
              <h3 className="text-headline3 mb-[12px] text-etc-black">
                My Place
              </h3>
              <pre
                className="text-clip font-[500px] text-[16px] text-gray-500 break-all"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {" "}
                {sitterDetail[0]?.place_description}
              </pre>
            </div>
          </div>
          <div className="">
            <SitterReview />
          </div>
        </div>

        {/* Sticky Sitter Card */}
        <div className="flex flex-col w-[30%] items-center text-center p-2">
          <div className=" sticky top-0 flex flex-col mx-20 pt-10 gap-6 items-center justify-center w-[100%] h-auto bg-etc-white rounded-2xl">
            <div className="avatar">
              <div className="w-[160px] h-[160px] rounded-full">
                <img src={sitterDetail[0]?.sitter_profile} alt="Avatar" />
              </div>
            </div>
            {/* detail in Card */}
            <div className="flex flex-col gap-1 mb-10">
              <h2 className="text-headline2 m-0 self-stretch text-etc-black">
                {" "}
                {sitterDetail[0]?.trade_name}
              </h2>
              <h4 className="text-[20px] m-0 text-etc-black">
                {" "}
                {sitterDetail[0]?.full_name}{" "}
                <span className="text-[16px] text-green-500">
                  {(() => {
                    const experience = sitterDetail[0]?.experience;

                    if (experience === 0) {
                      return "Newbie sitter";
                    } else if (experience > 1) {
                      return sitterDetail[0]?.experience + " Years Exp.";
                    } else if (experience === 1) {
                      return sitterDetail[0]?.experience + " Year Exp.";
                    }
                  })()}{" "}
                </span>
              </h4>
              {/* rating star use logic if number 1 render 1 star */}
              <div className="flex justify-center mt-1">{ratingDisplay}</div>
              <div className="mt-2 text-body2 text-gray-400 flex items-center justify-center">
                <div className=" flex justify-center items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 19.65C9.87 17.65 6 13.34 6 10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10C18 13.34 14.13 17.66 12 19.65ZM12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11992 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z"
                        fill="#AEB1C4"
                      />
                    </svg>
                  </span>
                  {sitterDetail[0]?.sub_district} , {sitterDetail[0]?.province}
                </div>
              </div>
              <div className="w-full h-auto mt-4 flex flex-row justify-center gap-[6px]">
                <div className="flex gap-2">
                  {sitterDetail.length > 0 && sitterDetail[0] && (
                    <div className="flex gap-2">
                      {sitterDetail[0]?.pet_type
                        ?.split(",")
                        .map((petType, index) => (
                          <span key={index}>
                            {petType.trim() === "Dog" && <DogType />}
                            {petType.trim() === "Cat" && <CatType />}
                            {petType.trim() === "Bird" && <BirdType />}
                            {petType.trim() === "Rabbit" && <RabbitType />}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* "Book Now" button */}
            <div className=" w-full border-t-[1px] border-gray-200 flex bg-etc-white justify-center rounded-b-2xl">
              <div className="  my-6 mx-0">
                <BookingDate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitterDetail;
