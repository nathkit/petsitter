import { useEffect, useState } from "react";
import { SitterIconBlack } from "./Icons";
import { ButtonPrimary, ButtonSitter } from "./Button";
import { useAuth } from "../../contexts/authentication";
import frame2 from "../../assets/SitterReview/frame427320942.png";
import { UserIcon, PetIcon, ListIcon, LogOutIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import usePosts from "../../hooks/usePost";
import { supabase } from "../../contexts/supabase";

function Navbar() {
  const navigate = useNavigate();
  const {
    signOut,
    userData,
    setUserData,
    checkThirdPartyFirstSignIn,
    isPetSitter,
    petSitterId,
  } = useAuth();
  const { profileImage, getProfileImage } = usePosts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [profileImageLoaded, setProfileImageLoaded] = useState(false); // Add this state

  const authenticate = () => {
    const authToken = JSON.parse(
      window.localStorage.getItem("sb-wjxguyrdfqbtwsetylfq-auth-token")
    );
    if (authToken?.access_token) {
      setIsAuthenticated(true);
      return JSON.parse(window.localStorage.getItem("user"));
    }
    // console.log("2");
    return null;
  };
  // const effectRan = useRef(false);
  useEffect(() => {
    const user = authenticate();
    setProfileImageLoaded(false);
    if (user && !profileImageLoaded) {
      // Check if profileImage has not been loaded yet
      setUserData(user);
      getProfileImage(user);
      setProfileImageLoaded(true);
    } else if (!user) {
      // console.log("in");
      const getSession = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        // console.log(user);
        if (user) {
          const newUser = { email: user.email, id: user.id };
          await checkThirdPartyFirstSignIn(newUser);

          const userFromLocal = JSON.parse(localStorage.getItem("user"));
          setIsAuthenticated(true);
          setUserData(userFromLocal);
          getProfileImage(userFromLocal);
          setProfileImageLoaded(true);
        }
      };
      getSession();
    }
  }, [userData]);

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
        onClick={navigate}
      >
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
        navigate: () => navigate(`/userManagement/${userData.id}`),
      },
      {
        icon: PetIcon,
        content: "Your Pet",
        navigate: () => navigate(`/userManagement/${userData.id}/pets`),
      },
      {
        icon: ListIcon,
        content: "History",
        navigate: () => navigate(`/userManagement/${userData.id}/booking`),
      },
      { icon: LogOutIcon, content: "Log Out", navigate: () => signOut() },
    ];
    // console.log(profileImage);
    if (isAuthenticated) {
      return (
        <div className="dropdown dropdown-end ">
          <label tabIndex={0}>
            <img
              src={profileImage ? profileImage : frame2}
              alt=""
              className="w-12 h-12 rounded-full cursor-pointer object-cover hover:shadow-lg"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[10] menu pt-2 shadow bg-etc-white rounded-box w-[186px] text-etc-black text-body2"
          >
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
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    );
  };
  return (
    <div className="bg-etc-white min-w-[1440px] h-20 px-20 flex justify-between items-center flex-shrink-0">
      <button onClick={() => navigate("/")}>
        <SitterIconBlack width="131" height="40" />
      </button>
      <div
        className={
          isAuthenticated
            ? "flex items-center gap-6 "
            : "flex items-center gap-4"
        }
      >
        <ButtonSitter
          content={
            isPetSitter ? "Pet Sitter Management" : "Become A Pet Sitter"
          }
          width={isPetSitter ? "250px" : "240px"}
          onClick={
            isPetSitter
              ? () => navigate(`/sitterManagement/${petSitterId}`)
              : isAuthenticated
              ? () => navigate("/sitterManagement/create")
              : () => navigate("/login")
          }
        />
        <LoginButton />
        <div>
          <ButtonPrimary
            content="Find A Pet Sitter"
            width="168px"
            onClick={() => {
              isAuthenticated ? navigate("/search") : navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
