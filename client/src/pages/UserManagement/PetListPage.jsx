import Navbar from "../../components/systemdesign/Navbar";
import {
  UserIcon,
  PetIcon,
  ListIcon,
} from "../../components/systemdesign/Icons";
import { CardPet1 } from "../../components/systemdesign/CardPet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PetListPage() {
  const [listIcon, setListIcon] = useState(null);
  const [userIcon, setUserIcon] = useState(null);
  const [userIconColor, setUserIconColor] = useState(null);
  const [listIconColor, setListIconColor] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className=" bg-etc-bg_gray w-full px-20 pt-10 pb-20 flex">
        <div className=" flex flex-col bg-etc-white py-6 w-[292px] h-[289px] rounded-2xl shadow mr-10 text-gray-500">
          <div className="px-6 pb-3 text-headline4">
            <p className="">Account</p>
          </div>
          <button
            className={`px-6 py-5 hover:text-orange-500 text-start focus:bg-orange-100 focus:text-orange-500 text-body1 flex items-center `}
            onClick={() => {
              navigate("/");
            }}
            onFocus={() => {
              setUserIcon("#ff7037");
            }}
            onMouseEnter={() => {
              setUserIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setUserIconColor("#aeb1c3");
            }}
          >
            <UserIcon hoverColor={userIconColor} onFocus={userIcon} />
            <p className="ml-3">Profile</p>
          </button>
          <button
            className={`px-6 py-5 text-orange-500 text-start bg-orange-100 text-body1 flex items-center `}
            onClick={() => {
              navigate("/");
            }}
          >
            <PetIcon hoverColor={"#ff7037"} />
            <p className="ml-3">Your Pet</p>
          </button>
          <button
            className={`px-6 py-5 hover:text-orange-500 text-start  focus:text-orange-500 text-body1 flex items-center`}
            onFocus={() => {
              setListIcon("#ff7037");
            }}
            onMouseEnter={() => {
              setListIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setListIconColor("#aeb1c3");
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListIcon hoverColor={listIconColor} onFocus={listIcon} />
            <p className="ml-3">Booking History</p>
          </button>
        </div>
        <div className="p-10 bg-etc-white rounded-2xl w-[956px] h-fit">
          <CardPet1 />
        </div>
      </div>
    </>
  );
}

export default PetListPage;
