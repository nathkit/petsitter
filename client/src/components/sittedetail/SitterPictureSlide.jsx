import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowLeftIcon } from "../systemdesign/Icons";
import { ArrowRightIcon } from "../systemdesign/Icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SitterPictureSlide() {
  const [sitterDetail, setSitterDetail] = useState({});
  const params = useParams();

  const getSitterDetail = async () => {
    try {
      const results = await axios.get(`http://localhost:4000/sitter/5`);
      console.log(params.sitterId);
      setSitterDetail(results.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getSitterDetail();
  }, []);

  return (
    <div className="justify-center items-center py-[40px]">
      <div className="w-full">
        <Swiper
          className="w-full h-[417px] relative"
          slidesPerView={2.5}
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
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <img src={sitterDetail.pet_sitter_carousel} alt="picture" />
            </div>
          </SwiperSlide>

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
