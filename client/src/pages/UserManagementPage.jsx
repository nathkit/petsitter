import ReviewButton from "../components/Management/ReviewButton";
import YourReviewButton from "../components/Management/YourReviewButton";
import Navbar from "../components/systemdesign/Navbar";
import { UserIcon, ListIcon, PetIcon } from "../components/systemdesign/Icons";
import { useState } from "react";
import Petlist from "../components/UserManagement/Petlist";
import BookingHistory from "../components/UserManagement/BookingHistory/BookingHistory";
import { BookingStatusProvider } from "../contexts/BookingStatusContext";

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
          <div className=" flex flex-col bg-etc-white py-6 w-[292px] h-[289px] rounded-2xl shadow mr-10">
            <div className="px-6 pb-3 text-headline4">
              <p className="">Account</p>
            </div>
            <button
              className={`px-6 py-5 hover:text-orange-500 text-start focus:bg-orange-100 focus:text-orange-500 text-body1 flex items-center ${
                activeSection === "profile"
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={() => setActiveSection("profile")}
              onFocus={() => {
                setUserIcon("#ff7037");
              }}
              onBlur={() => {
                setUserIcon("#3A3B46");
              }}
            >
              <UserIcon color={userIcon} />
              <p className="ml-3">Profile</p>
            </button>
            <button
              className={`px-6 py-5 hover:text-orange-500 text-start focus:bg-orange-100 focus:text-orange-500 text-body1 flex items-center ${
                activeSection === "petlist"
                  ? "bg-orange-100 text-orange-500"
                  : ""
              }`}
              onClick={() => setActiveSection("petlist")}
              onFocus={() => {
                setPetIcon("#ff7037");
              }}
              onBlur={() => {
                setPetIcon("#3A3B46");
              }}
            >
              <PetIcon color={petIcon} />
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
              }}
              onFocus={() => {
                setListIcon("#ff7037");
              }}
              onBlur={() => {
                setListIcon("#3A3B46");
              }}
            >
              <ListIcon color={listIcon} />
              <p className="ml-3">Booking History</p>
            </button>
          </div>{" "}
          <div className="p-10 bg-etc-white rounded-2xl w-[956px] h-fit">
            {activeSection === "profile" && <div>Profile</div>}
            {activeSection === "petlist" && <Petlist />}
            {activeSection === "bookingHistory" && <BookingHistory />}
          </div>
        </div>
      </BookingStatusProvider>
    </>
  );
}

export default UserManagementPage;
