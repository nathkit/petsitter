import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const usePosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const getProfileImage = async (email) => {
    const userEmail = email;

    if (user.user_metadata.email_verified) {
      console.log(user);
      setProfileImage(user.user_metadata.avatar_url);
    } else {
      try {
        const result = await axios.get(
          `http://localhost:4000/accounts/${userEmail}`
        );
        setProfileImage(result.data.pet_owner_image);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    profileImage,
    getProfileImage,
  };
};

export default usePosts;
