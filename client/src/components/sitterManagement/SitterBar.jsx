import { useState } from "react";
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
import { Ellipse21 } from "../systemdesign/image";

function SitterBar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [userIconColor, setUserIconColor] = useState(null);
  const [paymentIconColor, setPaymentIconColor] = useState(null);
  const [listIconColor, setListIconColor] = useState(null);
  const [logOutIconColor, setLogOutIconColor] = useState(null);

  const isPayoutOptionPage = props.children.type === PayoutOption;
  const isSitterBookingDetailPage = props.children.type === SitterBookingDetail;
  const isSitterBookingListPage = props.children.type === SitterBookingList;
  const isSitterProfilePage = props.children.type === SitterProfile;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className=" flex ">
        {sidebarOpen && (
          <aside className="sidebar  h-screen pt-4 flex flex-col justify-between text-gray-500 bg-etc-bg_gray text-body1 border-r border-gray-200">
            <ul className="sidebar-links flex flex-col  w-60 ">
              <li className=" px-6 pt-6 pb-10 ">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <SitterIconBlack width="132" height="40" />
                </div>
              </li>
              <li
                className={`flex px-6 py-4 cursor-pointer hover:text-orange-500 ${
                  isSitterProfilePage ? "bg-orange-100 text-orange-500" : ""
                }`}
                onClick={() => {
                  navigate("/sitterManagement/:sitterId");
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
                <p className="ml-4">Pet Sitter Profile</p>
              </li>
              <li
                className={`flex items-center px-6 py-4 cursor-pointer hover:text-orange-500 ${
                  isSitterBookingDetailPage || isSitterBookingListPage
                    ? "bg-orange-100 text-orange-500"
                    : ""
                }`}
                onClick={() => {
                  navigate("/sitterManagement/:sitterId/sitterBookingList");
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
                <p className="ml-4 mr-1">Booking List</p>
                <Ellipse21 />
              </li>
              <li
                className={`flex px-6 py-4 cursor-pointer hover:text-orange-500 ${
                  isPayoutOptionPage ? "bg-orange-100 text-orange-500" : ""
                }`}
                onClick={() => {
                  navigate("/sitterManagement/:sitterId/payoutOption");
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
                <p className="ml-4">Payout Option</p>
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
              <p className="ml-4">Log Out</p>
            </div>
          </aside>
        )}
        <div className="flex flex-col w-full">
          <nav className="w-full h-[72px] flex items-center py-4 text-gray-600 bg-etc-bg_gray text-body2">
            <div className="px-[30px]">
              <button
                className="hover:text-orange-500 text-3xl"
                onClick={toggleSidebar}
              >
                ☰
              </button>
            </div>
            <div className="flex items-center">
              <img
                src="https://i0.wp.com/www.korseries.com/wp-content/uploads/2021/05/rose-blackpink-photo.jpeg?resize=700%2C874&ssl=1"
                className="object-cover w-10 h-10 relative rounded-[999px]"
              />
              <p className="ml-4">Park Chaeyoung</p>
            </div>
          </nav>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default SitterBar;
