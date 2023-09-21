import Navbar from "../../components/systemdesign/Navbar";
import {
  UserIcon,
  PetIcon,
  ListIcon,
} from "../../components/systemdesign/Icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import { useParams } from "react-router-dom";
import UserProfile from "../UserManagement/UserProfile";
import BookingHistory from "./BookingHistory/BookingHistory";
import { CreatePet, EditPet } from "./PetProfile";
import { CardPet1 } from "../systemdesign/CardPet";

function Sidebar(props) {
  const [userIconColor, setUserIconColor] = useState(null);
  const [petIconColor, setPetIconColor] = useState(null);
  const [listIconColor, setListIconColor] = useState(null);
  const params = useParams();

  const isUpdatePetPage = props.children.type === EditPet;
  const isProfilePage = props.children.type === UserProfile;
  const isHistoryPage = props.children.type === BookingHistory;
  const isPetlistPage = props.children.type === CardPet1;
  const isCreatePetPage = props.children.type === CreatePet;

  const { userData } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className=" bg-etc-bg_gray min-w-full px-20 pt-10 pb-20 flex">
        <div className=" flex flex-col bg-etc-white py-6 w-[292px] h-[289px] rounded-2xl shadow mr-10 text-gray-500">
          <div className="px-6 pb-3 text-headline4">
            <p className="">Account</p>
          </div>
          <button
            className={`px-6 py-5 hover:text-orange-500 text-start 
            ${isProfilePage ? "bg-orange-100 text-orange-500" : ""}
            text-body1 flex items-center `}
            onClick={() => {
              navigate(`/userManagement/${userData.id}`);
            }}
            onMouseEnter={() => {
              setUserIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setUserIconColor("#aeb1c3");
            }}
          >
            <UserIcon
              hoverColor={userIconColor}
              onFocus={isProfilePage ? "#ff7037" : undefined}
            />
            <p className="ml-3">Profile</p>
          </button>
          <button
            className={`px-6 py-5 hover:text-orange-500 text-start  ${
              isUpdatePetPage || isCreatePetPage || isPetlistPage
                ? "bg-orange-100 text-orange-500"
                : ""
            } text-body1 flex items-center `}
            onClick={() => {
              navigate(`/userManagement/${userData.id}/pets`);
            }}
            onMouseEnter={() => {
              setPetIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setPetIconColor("#aeb1c3");
            }}
          >
            <PetIcon
              hoverColor={petIconColor}
              onFocus={
                isUpdatePetPage || isCreatePetPage || isPetlistPage
                  ? "#ff7037"
                  : undefined
              }
            />
            <p className="ml-3">Your Pet</p>
          </button>
          <button
            className={`px-6 py-5 hover:text-orange-500 text-start  ${
              isHistoryPage ? "bg-orange-100 text-orange-500" : ""
            } text-body1 flex items-center `}
            onMouseEnter={() => {
              setListIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setListIconColor("#aeb1c3");
            }}
            onClick={() => {
              navigate(`/userManagement/${params.userId}/booking`);
            }}
          >
            <ListIcon
              hoverColor={listIconColor}
              onFocus={isHistoryPage ? "#ff7037" : undefined}
            />
            <p className="ml-3">Booking History</p>
          </button>
        </div>
        <div className="p-10 bg-etc-white rounded-2xl w-[956px] h-fit">
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
