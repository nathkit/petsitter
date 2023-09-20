import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeftIcon } from "../systemdesign/Icons";
import { ArrowRightIcon } from "../systemdesign/Icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../../contexts/BookingContext";
import { tuple } from "yup";

function SitterPictureSlide() {
  const { getSitterDetail, sitterDetail } = useBooking();
  const params = useParams();

  useEffect(() => {
    getSitterDetail(params.sitterId);
  }, []);

  useEffect(() => {}, [sitterDetail]);

  function getImageArray(imageString) {
    return imageString.split(",");
  }

  return (
    <div className="justify-center items-center py-[40px]">
      <div className="w-full">
        <Swiper
          className="w-full relative swiper-container"
          slidesPerView={1.5}
          spaceBetween={16}
          centeredSlides={true}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[Navigation, Keyboard]}
          loop={true}
        >
          {sitterDetail.length > 0 && (
            <>
              {getImageArray(sitterDetail[0].trade_image_path).map(
                (imageUrl, sitterIndex) => (
                  <SwiperSlide key={sitterIndex}>
                    <div>
                      <div className="w-full">
                        <img
                          className=" w-full h-[550px] object-cover"
                          src={imageUrl}
                          alt={`Picture ${sitterIndex + 1}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </>
          )}

          <div className="custom-button-next absolute z-10 top-[45%] w-14 h-14 right-[80px] rounded-full bg-etc-white grid place-items-center">
            <ArrowRightIcon />
          </div>
          <div className="custom-button-prev absolute z-10 top-[45%] left-[80px] w-14 h-14  rounded-full bg-etc-white grid place-items-center">
            <ArrowLeftIcon />
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default SitterPictureSlide;
