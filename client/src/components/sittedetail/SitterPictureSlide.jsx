import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "../systemdesign/Icons";
import { useBooking } from "../../contexts/BookingContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

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

  const imageArray = getImageArray(
    sitterDetail && sitterDetail.length > 0
      ? sitterDetail[0].trade_image_path
      : ""
  );
  const slidesPerView = imageArray.length <= 2 ? 1 : 1.5;
  const spaceBetween = imageArray.length <= 2 ? 0 : -450;
  const autoplay = imageArray.length <= 3 ? false : true;

  return (
    <div className="justify-center items-center py-[40px]">
      <div className="w-full">
        <Swiper
          className="w-full relative swiper-container"
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          centeredSlides={true}
          modules={[Navigation, Keyboard, Autoplay]}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          keyboard={{
            enabled: true,
          }}
          autoplay={autoplay}
          loop={true}
        >
          {sitterDetail !== null && sitterDetail.length > 0 ? (
            <>
              {sitterDetail[0].trade_image_path
                .split(",")
                .map((imageUrl, sitterIndex) => (
                  <SwiperSlide key={sitterIndex}>
                    <div>
                      <div className=" flex justify-center ">
                        <img
                          className=" w-[640px] h-[400px] object-cover"
                          src={imageUrl}
                          alt={`Picture ${sitterIndex + 1}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </>
          ) : (
            <div className=" flex justify-center items-center w-full h-[400px] text-headline3">
              No picture available 🐶
            </div>
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
