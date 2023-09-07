import React, { useEffect, useState } from "react";
import { StarIcon, SearchIcon } from "../systemdesign/Icons.jsx";
import { ButtonSecondary, ButtonPrimary } from "../systemdesign/Button.jsx";
import { BaseCheckbox } from "../systemdesign/BaseCheckbox.jsx";

function SitterSearch({ onSearch }) {
  const [searchData, setSearchData] = useState({
    search: "",
    types: [],
    rate: undefined,
    exp: 0,
  });

  const allPetTypes = ["Dog", "Cat", "Bird", "Rabbit"];

  const starRates = [5, 4, 3, 2, 1];

  const allExp = [
    {
      label: "0-2 Years",
      value: 0,
    },
    {
      label: "3-5 Years",
      value: 1,
    },
    {
      label: "5+ Years",
      value: 2,
    },
  ];

  const handleSearchText = (event) => {
    let text = event.target.value;
    setSearchData({
      ...searchData,
      search: text,
    });
  };

  const handleCheckBox = (event, type) => {
    if (searchData.types.includes(type)) {
      setSearchData({
        ...searchData,
        types: searchData.types.filter((eachType) => eachType !== type),
      });
    } else {
      setSearchData({
        ...searchData,
        types: [...searchData.types, type],
      });
    }
  };

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

  const handleExperience = (event) => {
    setSearchData({
      ...searchData,
      exp: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchData);
    onSearch(searchData);
  };

  const handleClear = (event) => {
    event.preventDefault();
    const clearedSearchData = {
      search: "",
      types: [],
      rate: undefined,
      exp: 0,
    };
    setSearchData(clearedSearchData);
    onSearch(clearedSearchData);
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
            <input
              type="text"
              id="seacrh"
              className="border-hidden w-[286px] h-[24px]"
              onChange={(e) => handleSearchText(e)}
              value={searchData.search}
            />
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
                isChecked={searchData.types.includes(type)}
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
            {starRates.map((rate, index) => (
              <button
                id={rate + "star"}
                key={index}
                className={`flex items-center h-[36px] px-2 py-1 gap-[2px] border-[1px] text-gray-400
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-orange-500
                  ${
                    rate === searchData.rate
                      ? "border-orange-500 text-orange-500"
                      : ""
                  }
                  `}
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
        {/* End Rating */}

        {/* Start Experience */}
        <div className="Experience">
          <div className="text-[16px] font-bold pb-4"> Experience: </div>
          <select
            className="select w-[346px] text-[#7B7E8F] border-[#DCDFED]"
            defaultValue={allExp[0].value}
            onChange={(e) => handleExperience(e)}
          >
            {allExp.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>
        {/* End Experience */}

        {/* Start Button */}
        <div className="flex gap-4">
          <ButtonSecondary content="Clear" width={165} onClick={handleClear} />
          <ButtonPrimary content="Search" width={165} onClick={handleSubmit} />
        </div>
        {/* Start Button */}
      </form>
    </div>
  );
}

export default SitterSearch;
