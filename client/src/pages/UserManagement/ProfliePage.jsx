import Navbar from "../../components/systemdesign/Navbar";
import {
  UserIcon,
  ListIcon,
  PetIcon,
} from "../../components/systemdesign/Icons";
import { useState } from "react";
import Petlist from "../../components/UserManagement/Petlist";
import BookingHistory from "../../components/UserManagement/BookingHistory/BookingHistory";
import { BookingStatusProvider } from "../../contexts/BookingStatusContext";
import UserProfile from "../../components/UserManagement/UserProfile";
import ReviewButton from "../../components/UserManagement/UserReview/ReviewButton";
import YourReviewButton from "../../components/UserManagement/UserReview/YourReviewButton";

function UserManagementPage() {
  const [userIcon, setUserIcon] = useState("#ff7037");
  const [petIcon, setPetIcon] = useState(null);
  const [listIcon, setListIcon] = useState(null);

  const [userIconColor, setUserIconColor] = useState(null);
  const [petIconColor, setPetIconColor] = useState(null);
  const [listIconColor, setListIconColor] = useState(null);

  const [activeSection, setActiveSection] = useState("profile");

  return (
    <>
      <BookingStatusProvider>
        <Navbar />
        <div className=" bg-etc-bg_gray w-full px-20 pt-10 pb-20 flex">
          <div className=" flex flex-col bg-etc-white py-6 w-[292px] h-[289px] rounded-2xl shadow mr-10 text-gray-500">
            <div className="px-6 pb-3 text-headline4">
              <p className="">Account</p>
            </div>
            <button
              className={`px-6 py-5 hover:text-orange-500 text-start focus:bg-orange-100 focus:text-orange-500 text-body1 flex items-center ${
                activeSection === "profile"
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={() => {
                setActiveSection("profile");
                setListIcon(null);
                setPetIcon(null);
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
              className={`px-6 py-5 hover:text-orange-500 text-start focus:bg-orange-100 focus:text-orange-500 text-body1 flex items-center ${
                activeSection === "petlist"
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={() => {
                setActiveSection("petlist");
                setUserIcon(null);
                setListIcon(null);
              }}
              onFocus={() => {
                setPetIcon("#ff7037");
              }}
              onMouseEnter={() => {
                setPetIconColor("#ff7037");
              }}
              onMouseLeave={() => {
                setPetIconColor("#aeb1c3");
              }}
            >
              <PetIcon hoverColor={petIconColor} onFocus={petIcon} />
              <p className="ml-3">Your Pet</p>
            </button>
            <button
              className={`px-6 py-5 hover:text-orange-500 text-start  focus:text-orange-500 text-body1 flex items-center ${
                activeSection === "bookingHistory"
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={() => {
                setActiveSection("bookingHistory");
                setUserIcon(null);
                setPetIcon(null);
              }}
              onFocus={() => {
                setListIcon("#ff7037");
              }}
              onMouseEnter={() => {
                setListIconColor("#ff7037");
              }}
              onMouseLeave={() => {
                setListIconColor("#aeb1c3");
              }}
            >
              <ListIcon hoverColor={listIconColor} onFocus={listIcon} />
              <p className="ml-3">Booking History</p>
            </button>
          </div>{" "}
          <div className="p-10 bg-etc-white rounded-2xl w-[956px] h-fit">
            {activeSection === "profile" && (
              <div>
                <UserProfile />
              </div>
            )}
            {activeSection === "petlist" && <Petlist />}
            {activeSection === "bookingHistory" && <BookingHistory />}
          </div>
        </div>
        <ReviewButton />
        <YourReviewButton />
      </BookingStatusProvider>
    </>
  );
}

export default UserManagementPage;
