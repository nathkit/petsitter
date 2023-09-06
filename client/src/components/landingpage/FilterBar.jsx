import { BaseCheckbox } from "../systemdesign/BaseCheckbox";
import { CheckIcon } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useNavigate } from "react-router-dom";

function FilterBar() {
  const navigate = useNavigate();
  const petType = ["Dog", "Cat", "Bird", "Rabbit"];

  return (
    <div className="max-w-[1064px] mx-auto rounded-[15px]">
      <div className="w-full p-6 bg-gray-100 rounded-t-[15px] flex items-center gap-3 self-stretch">
        <div>Pet Type:</div>
        <div className="flex items-center gap-[26px]">
          {petType.map((item) => {
            return (
              <div>
                <BaseCheckbox label={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full p-6 bg-etc-white rounded-b-[15px] flex items-center gap-6 self-stretch">
        <div className="flex">
          <div>Rating:</div>
          <div>Rating:</div>
        </div>
        <div className="flex items-center gap-3">
          <div>Experience: </div>
          <select className="select w-[144px] text-gray-400 border-gray-200">
            <option disabled selected>
              0-2 Years
            </option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
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
