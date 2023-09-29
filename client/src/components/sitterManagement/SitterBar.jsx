import { useEffect, useState } from "react";
import {
  UserIcon,
  SitterIconBlack,
  ListIcon,
  CreditCardIcon,
  LogOutIcon,
} from "../systemdesign/Icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import PayoutOption from "./PayoutOption";
import SitterBookingDetail from "./sitterBookingDetail/SitterBookingDetail";
import SitterBookingList from "./SitterBookingList";
import SitterProfile from "./SitterProfile";
import { useBooking } from "../../contexts/BookingContext";
import frame2 from "../../assets/SitterReview/frame427320942.png";
import { Vector } from "../systemdesign/image";

const SitterBar = (props) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { signOut, petSitterId, userData, setUserData } = useAuth();

  const [userIconColor, setUserIconColor] = useState(null);
  const [paymentIconColor, setPaymentIconColor] = useState(null);
  const [listIconColor, setListIconColor] = useState(null);
  const [logOutIconColor, setLogOutIconColor] = useState(null);

  const isPayoutOptionPage = props.children.type === PayoutOption;
  const isSitterBookingDetailPage = props.children.type === SitterBookingDetail;
  const isSitterBookingListPage = props.children.type === SitterBookingList;
  const isSitterProfilePage = props.children.type === SitterProfile;
  const { sitterDetail } = useBooking();

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user"));
    setUserData(newUser);
  }, []);

  return (
    <div className="flex">
      <aside
        className={` ${
          open ? "w-72" : "w-20 "
        } pt-4 flex flex-col justify-between text-gray-500 bg-etc-bg_gray text-body1 border-r border-gray-200 h-screen relative duration-300`}
      >
        <ul
          className={`sidebar-links flex flex-col ${
            open ? "w-60" : "w-full "
          } `}
        >
          {open ? (
            <li className=" px-6 pt-6 pb-10 ">
              <div
                className={`cursor-pointer ${!open && "scale-0"}`}
                onClick={() => {
                  navigate("/");
                }}
              >
                <SitterIconBlack width="132" height="40" />
              </div>
            </li>
          ) : (
            <div
              className={`pt-6 pb-10 flex justify-center }`}
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="cursor-pointer">
                <Vector width="40" height="40" />
              </div>
            </div>
          )}
          <li
            className={`flex px-6 py-4 cursor-pointer hover:text-orange-500 ${
              isSitterProfilePage ? "bg-orange-100 text-orange-500" : ""
            }`}
            onClick={() => {
              navigate(`/sitterManagement/${petSitterId}`);
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
              onFocus={isSitterProfilePage ? "#ff7037" : undefined}
            />
            <p className={`${!open && "hidden"} origin-left duration-200 ml-4`}>
              Pet Sitter Profile
            </p>
          </li>
          <li
            className={`flex items-center px-6 py-4 cursor-pointer hover:text-orange-500 ${
              isSitterBookingDetailPage || isSitterBookingListPage
                ? "bg-orange-100 text-orange-500"
                : ""
            }`}
            onClick={() => {
              navigate(`/sitterManagement/${petSitterId}/sitterBookingList`);
            }}
            onMouseEnter={() => {
              setListIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setListIconColor("#aeb1c3");
            }}
          >
            <ListIcon
              hoverColor={listIconColor}
              onFocus={
                isSitterBookingDetailPage || isSitterBookingListPage
                  ? "#ff7037"
                  : undefined
              }
            />
            <p
              className={`${
                !open && "hidden"
              } origin-left duration-200 ml-4 mr-1`}
            >
              Booking List
            </p>
          </li>
          <li
            className={`flex px-6 py-4 cursor-pointer hover:text-orange-500 ${
              isPayoutOptionPage ? "bg-orange-100 text-orange-500" : ""
            }`}
            onClick={() => {
              navigate(`/sitterManagement/${petSitterId}/payoutOption`);
            }}
            onMouseEnter={() => {
              setPaymentIconColor("#ff7037");
            }}
            onMouseLeave={() => {
              setPaymentIconColor("#aeb1c3");
            }}
          >
            <CreditCardIcon
              hoverColor={paymentIconColor}
              onFocus={isPayoutOptionPage ? "#ff7037" : undefined}
            />
            <p className={`${!open && "hidden"} origin-left duration-200 ml-4`}>
              Payout Option
            </p>
          </li>
        </ul>
        <div
          className="flex px-6 py-4 cursor-pointer hover:text-orange-500 border-t border-gray-200"
          onClick={() => {
            signOut();
          }}
          onMouseEnter={() => {
            setLogOutIconColor("#ff7037");
          }}
          onMouseLeave={() => {
            setLogOutIconColor("#aeb1c3");
          }}
        >
          <LogOutIcon hoverColor={logOutIconColor} />
          <p className={`${!open && "hidden"} origin-left duration-200 ml-4`}>
            Log Out
          </p>
        </div>
      </aside>

      <div className="flex flex-col w-full">
        <nav className="w-full h-[72px] flex items-center py-4 text-gray-600 bg-etc-bg_gray text-body2">
          <div className="px-[30px]">
            <button
              className="hover:text-orange-500 text-3xl text-gray-300"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
          <div className="flex items-center">
            {petSitterId ? (
              <div className="flex items-center">
                <img
                  src={userData.sitter_image_path}
                  className="object-cover w-10 h-10 relative rounded-[999px]"
                />
                <p className="ml-4 text-headline4">{userData.fullName}</p>
              </div>
            ) : (
              <p className=" text-headline4">Welcome to Sitter Profile</p>
            )}
          </div>
        </nav>
        <div className="bg-gray-100 pt-10 pb-20 px-10">{props.children}</div>
      </div>
    </div>
  );
};
export default SitterBar;
