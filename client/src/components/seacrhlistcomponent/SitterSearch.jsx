import React, { useState } from "react";
import { StarIcon, SearchIcon } from "../systemdesign/Icons.jsx";
import { ButtonSecondary, ButtonPrimary } from "../systemdesign/Button.jsx";
import { BaseCheckbox } from "../systemdesign/BaseCheckbox.jsx";

function SitterSearch() {
  const handleRating = (event) => {
    event.preventDefault();
  };
  // Array ชนิดของสัตว์
  const [petType, setPetType] = useState([]);

  const allPetTypes = ["Dog", "Cat", "Bird", "Rabbit"];

  const starRates = [5, 4, 3, 2, 1];

  const handleCheckBox = (event, type) => {
    if (petType.includes(type)) {
      setPetType(petType.filter((eachType) => eachType !== type));
    } else {
      setPetType([...petType, type]);
    }
    console.log(petType);
  };

  return (
    <div className="flex w-[394px] h-[604px] pr-6 bg-etc-white rounded-[16px]">
      <form action="" className="flex flex-col gap-[40px] p-6">
        {/* Start Search */}
        <div>
          <div className="text-[16px] font-medium"> Search </div>
          <div
            className="flex w-[318px] h-[48px] py-3 pl-3 pr-4 border-solid rounded-[8px]
               border-[#DCDFED] border-[1px]"
          >
            <input type="text" className="border-hidden w-[286px] h-[24px]" />
            <SearchIcon color="#AEB1C3" />
          </div>
        </div>
        {/* End Search */}

        {/* Start Pet Type */}
        <div>
          <div className="text-[16px] pb-4 font-bold">Pet Type:</div>
          <div className="flex relative text-[16px] font-medium items-center justify-between">
            {allPetTypes.map((type) => (
              <BaseCheckbox
                key={type}
                label={type}
                isChecked={petType.includes(type)}
                onChanged={(e) => handleCheckBox(e, type)}
              />
            ))}
          </div>
        </div>
        {/* End Pet Type */}

        {/* Start Rating */}
        <div>
          <div className="text-[16px] pb-4 font-bold">Rating:</div>
          <div className="flex flex-wrap gap-2">
            {starRates.map((rate) => (
              <button
                id={rate + "star"}
                className="flex items-center h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-[#f0c2b1] focus:border-[#FF7037] focus:text-[#FF7037]"
                value="5star"
                onClick={handleRating}
              >
                <span className="pr-[3px] font-Satoshi">{rate}</span>
                {Array.from({ length: rate }, (_, index) => (
                  <StarIcon key={index} color="#1CCD83" />
                ))}
              </button>
            ))}
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
  );
}

export default SitterSearch;
