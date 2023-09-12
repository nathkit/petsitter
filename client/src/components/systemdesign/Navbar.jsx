import React, { useContext, useEffect, useState } from "react";
import { SitterIconBlack } from "./Icons";
import { ButtonPrimary } from "./Button";
import { useAuth } from "../../contexts/authentication";
import frame2 from "../../assets/SitterReview/frame427320942.png";
import { UserIcon, PetIcon, ListIcon, LogOutIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import usePosts from "../../hooks/usePost";

function Navbar() {
  const navigate = useNavigate();
  const { signOut, getUserData, user, isAuthenticated } = useAuth();
  const { profileImage, getProfileImage } = usePosts();

  useEffect(() => {
    getUserData();
    // console.log(user);
    isAuthenticated && getProfileImage(user);
  }, [user.email]);

  const LoginButton = () => {
    const [hoveredItemId, setHoveredItemId] = useState(null);

    const ListItem = ({ icon: Icon, content, id, navigate }) => (
      <li
        onMouseEnter={() => setHoveredItemId(id)}
        onMouseLeave={() => setHoveredItemId(null)}
        className={`${
          hoveredItemId === id
            ? "hover:text-gray-400 hover:bg-orange-200 hover:rounded-[10px] active:bg-orange-500 active:text-etc-white"
            : ""
        } ${content === "Log Out" ? "border-t-2" : ""}`}
        onClick={navigate}>
        <a>
          <Icon
            color="#3A3B46"
            hoverColor={hoveredItemId === id ? "#7B7E8F" : "#3A3B46"}
          />
          {content}
        </a>
      </li>
    );

    const menuItems = [
      {
        icon: UserIcon,
        content: "Profile",
<<<<<<< HEAD
        navigate: () => navigate("/usermanagement"),
=======
        navigate: () => navigate(`/userManagement/${user.userId}`),
>>>>>>> 39f9a46 (set upload avatar)
      },
      {
        icon: PetIcon,
        content: "Your Pet",
        navigate: () => navigate("/yourpet"),
      },
      {
        icon: ListIcon,
        content: "History",
        navigate: () => navigate("/history"),
      },
      { icon: LogOutIcon, content: "Log Out", navigate: () => signOut() },
    ];

    if (isAuthenticated) {
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <img
              src={profileImage ? profileImage : frame2}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[10] menu pt-2 shadow bg-etc-white rounded-box w-[186px] text-etc-black text-body2">
            {menuItems.map((item, idx) => (
              <ListItem
                key={idx}
                id={idx}
                icon={item.icon}
                content={item.content}
                navigate={item.navigate}
              />
            ))}
          </ul>
        </div>
      );
    }
    return (
      <button
        className="px-6 py-4 text-body1 text-etc-black hover:text-orange-400 active:text-orange-600"
        onClick={() => navigate("/login")}>
        Login
      </button>
    );
  };

  return (
    <div className="min-w-[1440px] h-20 px-20 flex justify-between items-center flex-shrink-0">
      <button onClick={() => navigate("/")}>
        <SitterIconBlack width="131" height="40" />
      </button>
      <div
        className={
          isAuthenticated
            ? "flex items-center gap-6"
            : "flex items-center gap-4"
        }>
        <LoginButton />
        <div>
          <ButtonPrimary
            content="Find A Pet Sitter"
            width="168px"
            onClick={() => {
              navigate("/search");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
