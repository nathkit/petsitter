import { BaseCheckbox } from "../systemdesign/BaseCheckbox";
import { StarIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/authentication";

function FilterBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchData, setSearchData] = useState({
    types: [],
    rate: undefined,
    exp: 3,
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

  return (
    <div className="max-w-[1064px] mx-auto rounded-[15px]">
      <div className="w-full p-6 bg-gray-100 rounded-t-[15px] flex items-center gap-3 self-stretch">
        <div className="font-bold">Pet Type:</div>
        <div className="flex items-center gap-[26px]">
          {petType.map((type) => (
            <BaseCheckbox
              key={type}
              label={type}
              isChecked={searchData.types.includes(type)}
              onChanged={(e) => handleCheckBox(e, type)}
            />
          ))}
        </div>
      </div>
      <div className="w-full p-6 bg-etc-white rounded-b-[15px] flex items-center gap-6 self-stretch">
        <div className="flex justify-center items-center">
          <div className="w-[70px] pr-3 font-bold">Rating:</div>
          <div className="flex gap-2">
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
        <div className="flex items-center gap-3 w-[244px]">
          <div className="font-bold">Experience: </div>
          <select
            className="select w-full text-[#7B7E8F] border-[#DCDFED] bg-etc-white"
            onChange={(e) => handleExperience(e)}
            value={searchData.exp}
          >
            <option value={3}>All Experiences</option>
            {allExp.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <ButtonPrimary
            content="Search"
            onClick={() => {
              const searchParams = new URLSearchParams();
              if (searchData !== undefined) {
                if (searchData?.search) {
                  searchParams.append("search", searchData.search);
                }

                if (searchData?.types.length > 0) {
                  searchParams.append("petType", searchData.types);
                }

                if (searchData?.rate) {
                  searchParams.append("rate", searchData.rate);
                }

                if (searchData?.exp) {
                  searchParams.append("exp", searchData.exp);
                }
              }
              isAuthenticated
                ? navigate("/search?" + searchParams.toString())
                : navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
