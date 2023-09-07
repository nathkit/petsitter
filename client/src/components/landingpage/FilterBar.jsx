import { BaseCheckbox } from "../systemdesign/BaseCheckbox";
import { StarIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FilterBar() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    search: "",
    types: [],
    rate: undefined,
    exp: 0,
  });

  const petType = ["Dog", "Cat", "Bird", "Rabbit"];
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
  const handleCheckBox = (event, type) => {
    setSearchData({
      ...searchData,
      types: searchData.types.includes(type)
        ? searchData.types.filter((eachType) => eachType !== type)
        : [...searchData.types, type],
    });
  };

  const handleExperience = (event) => {
    event.preventDefault();
    setSearchData({
      ...searchData,
      exp: event.target.value,
    });
  };

  const handleRating = (event, rate) => {
    event.preventDefault();
    setSearchData({
      ...searchData,
      rate: searchData.rate === rate ? undefined : rate,
    });
  };
  console.log(searchData);

  return (
    <div className="max-w-[1064px] mx-auto rounded-[15px]">
      <div className="w-full p-6 bg-gray-100 rounded-t-[15px] flex items-center gap-3 self-stretch">
        <div className="text-body2">Pet Type:</div>
        <div className="flex items-center gap-[26px]">
          {petType.map((item, index) => {
            return (
              <div key={index}>
                <BaseCheckbox
                  label={item}
                  isChecked={searchData.types.includes(item)}
                  onChanged={(e) => handleCheckBox(e, item)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full p-6 bg-etc-white rounded-b-[15px] flex items-center justify-between self-stretch">
        <div className="flex items-center gap-3">
          <div className="w-[70px] text-body2">Rating:</div>
          <div className="flex flex-wrap gap-2">
            {starRates.map((rate, index) => (
              <button
                id={rate + "star"}
                key={index}
                className={`flex items-center h-[36px] px-2 py-1 gap-[2px] border-[1px] 
                  rounded-[8px] border-[#DCDFED] bg-etc-white hover:border-orange-500
                  ${
                    rate === searchData.rate
                      ? "border-orange-500 text-orange-500"
                      : ""
                  }
                  `}
                onClick={(e) => handleRating(e, rate)}>
                <span className="pr-[3px] font-Satoshi text-gray-400">
                  {rate}
                </span>
                {Array.from({ length: rate }, (_, index) => (
                  <StarIcon key={index} color="#1CCD83" />
                ))}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-body2">Experience: </div>
          <select
            className="select w-[144px] text-gray-400 border-gray-200"
            defaultValue={allExp[0].value}
            onChange={(e) => handleExperience(e)}>
            {allExp.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <ButtonPrimary content="Search" onClick={() => navigate("/search")} />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
