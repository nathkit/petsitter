import React, { useState } from "react";
import {
  SearchIcon,
  StarIcon,
  MapMakerIcon,
  CheckIcon,
} from "../components/systemdesign/Icons.jsx";
import {
  ButtonSecondary,
  ButtonPrimary,
} from "../components/systemdesign/Button.jsx";
import {
  DogType,
  CatType,
  BirdType,
  RabbitType,
} from "../components/systemdesign/PetType.jsx";

function SearchList() {
  // const [textSearch, setTextSearch] = useState("");
  // const [petType, setPetType] = useState("");
  // const [rating, setRating] = useState("");
  // const [experience, setExperience] = useState("");
  // const [sitterCard, setSitterCard] = useState([]);

  const handleRating = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col pt-10 pb-20 px-20 bg-gray-100">
      <div className="text-[24] font-bold">Search For Pet Sitter</div>
      <div className="flex py-[80px] gap-9">
        {/* Start Pet Sitter Search */}
        <div className="flex w-[394px] h-[604px] pr-6 bg-etc-white rounded-[16px]">
          <form action="" className="flex flex-col gap-[40px] p-6">
            {/* Start Search */}
            <div>
              <div className="text-[16px] font-medium"> Search </div>
              <div
                className="flex w-[318px] h-[48px] py-3 pl-3 pr-4 border-solid rounded-[8px]
               border-[#DCDFED] border-[1px]"
              >
                <input
                  type="text"
                  className="border-hidden w-[286px] h-[24px]"
                />
                <SearchIcon color="#AEB1C3" />
              </div>
            </div>
            {/* End Search */}

            {/* Start Pet Type */}
            <div>
              <div className="text-[16px] pb-4 font-bold">Pet Type:</div>
              <div className="flex relative text-[16px] font-medium items-center">
                <input
                  type="checkbox"
                  id="petType1"
                  name="petType1"
                  value="dog"
                  className="w-[24px] h-[24px] appearance-none peer border-solid border-[1px] rounded-[6px] border-[#DCDFED] 
                  hover:border-[#FFB899] checked:bg-orange-500 checked:border-orange-300"
                />
                <span className="absolute transition-all opacity-0 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="5.5"
                      fill="#FF7037"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.6947 7.29279C18.8822 7.48031 18.9875 7.73462 18.9875 7.99979C18.9875 8.26495 18.8822 8.51926 18.6947 8.70679L10.6947 16.7068C10.5072 16.8943 10.2529 16.9996 9.98771 16.9996C9.72255 16.9996 9.46824 16.8943 9.28071 16.7068L5.28071 12.7068C5.09855 12.5182 4.99776 12.2656 5.00004 12.0034C5.00232 11.7412 5.10749 11.4904 5.29289 11.305C5.4783 11.1196 5.72911 11.0144 5.99131 11.0121C6.25351 11.0098 6.50611 11.1106 6.69471 11.2928L9.98771 14.5858L17.2807 7.29279C17.4682 7.10532 17.7225 7 17.9877 7C18.2529 7 18.5072 7.10532 18.6947 7.29279Z"
                      fill="white"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="5.5"
                      stroke="#FFB899"
                    />
                  </svg>
                </span>
                <label for="dog" className="pl-[8px] pr-[26px]">
                  Dog
                </label>
                <input
                  type="checkbox"
                  id="petType2"
                  name="petType2"
                  value="cat"
                  className="w-[24px] h-[24px]"
                />
                <label for="dog" className="pl-[8px] pr-[26px]">
                  Cat
                </label>
                <input
                  type="checkbox"
                  id="petType3"
                  name="petType3"
                  value="bird"
                  className="w-[24px] h-[24px]"
                />
                <label for="dog" className="pl-[8px] pr-[26px]">
                  Bird
                </label>
                <input
                  type="checkbox"
                  id="petType4"
                  name="petType4"
                  value="rabbit"
                  className="w-[24px] h-[24px]"
                />
                <label for="dog" className="pl-[8px]">
                  Rabbit
                </label>
              </div>
            </div>
            {/* End Pet Type */}

            {/* Start Rating */}
            <div>
              <div className="text-[16px] pb-4 font-bold">Rating:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  id="5star"
                  className="flex items-center w-[142px] h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037]"
                  value="5star"
                  onClick={handleRating}
                >
                  <span className="pr-[3px] font-Satoshi">5</span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                </button>

                <button
                  id="4star"
                  className="flex items-center w-[120px] h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037]"
                  onClick={handleRating}
                >
                  <span className="pr-[3px]">4</span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                </button>

                <button
                  id="3star"
                  className="flex items-center w-[98px] h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037]"
                  onClick={handleRating}
                >
                  <span className="pr-[3px]">3</span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                </button>

                <button
                  id="2star"
                  className="flex items-center w-[76px] h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037]"
                  onClick={handleRating}
                >
                  <span className="pr-[3px]">2</span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                </button>

                <button
                  id="1star"
                  className="flex items-center w-[54px] h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037]"
                  onClick={handleRating}
                >
                  <span className="pr-[3px]">1</span>
                  <span>
                    <StarIcon color="#1CCD83" />
                  </span>
                </button>
              </div>
            </div>
            {/* End Rating */}

            {/* Start Experience */}
            <div className="Experience">
              <div className="text-[16px] font-bold pb-4"> Experience: </div>
              <select className="select w-[346px] text-[#7B7E8F] border-[#DCDFED]">
                <option disabled selected>
                  0-2 Years
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            {/* End Experience */}

            {/* Start Button */}
            <div className="flex gap-4">
              <ButtonSecondary content="Clear" width={165} />
              <ButtonPrimary content="Search" width={165} />
            </div>
            {/* Start Button */}
          </form>
        </div>
        {/* End Pet Sitter Search */}

        {/* Start Pet Sitter Card */}
        <a href="#">
          <div className="flex w-[848px] h-[216px] p-4 gap-10 bg-etc-white rounded-[16px]">
            <img
              src="./src/asset/sitter-house-1.png"
              alt="sitter1"
              className="object-none w-[245px] h-[184px]"
            />
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div>
                  <img
                    src="./src/asset/sitter-avatar-1.png"
                    alt="sitter-1"
                    className="object-none w-[64px] h-[64px]"
                  />
                </div>
                <div className="w-[315px] h-[32px]">
                  <span className="text-[24px] font-bold">
                    Happy House!
                    <br />
                  </span>
                  <span className="text-[18px] font-medium">
                    By Jane Maison
                  </span>
                </div>
                <div className="flex gap-1">
                  <StarIcon color="#1CCD83" />
                  <StarIcon color="#1CCD83" />
                  <StarIcon color="#1CCD83" />
                  <StarIcon color="#1CCD83" />
                  <StarIcon color="#1CCD83" />
                </div>
              </div>
              <div className="flex gap-[6px]">
                <div>
                  <MapMakerIcon color="#AEB1C3" />
                </div>
                <div className="text-[#7B7E8F] text-[16px] font-medium">
                  Senanikom, Bangkok
                </div>
              </div>
              <div className="flex gap-2">
                <DogType />
                <CatType />
                <RabbitType />
              </div>
            </div>
          </div>
        </a>
        {/* End Pet Sitter Card */}
      </div>
    </div>
  );
}

export default SearchList;
