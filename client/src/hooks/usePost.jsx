import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usePosts = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const getProfileImage = async (user) => {
    const userEmail = user.email;
    // console.log(userEmail);
    // console.log(user);
    if (user) {
      setProfileImage(user.avatar);
    }
    // else {
    //   try {
    //     const result = await axios.get(
    //       `http://localhost:4000/accounts/${userEmail}`
    //     );
    //     setProfileImage(result.data.data.pet_owner_image);
    //     console.log(result.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  const createPetProfile = async (user, data) => {
    const userEmail = user.email;
    try {
      const result = await axios.post(
        `http://localhost:4000/accounts/${userEmail}/pets/`,
        data
      );
      navigate("/usermanagement");
    } catch (error) {
      console.log(error);
    }
  };

  const updatePetProfile = async (user, data) => {
    const userEmail = user.email;
    try {
      const result = await axios.put(
        `http://localhost:4000/accounts/${userEmail}/pets/`,
        data
      );
      navigate("/usermanagement");
    } catch (error) {
      console.log(error);
    }
  };

  const getTypeStyle = (type) => {
    let textStyle = "";
    let bgColor = "";
    let border = "";

    switch (type) {
      case "Dog":
        textStyle = "text-green-500";
        border = "border-green-500";
        bgColor = "bg-green-100";
        break;
      case "Cat":
        textStyle = "text-pink-500";
        border = "border-pink-500";
        bgColor = "bg-pink-100";
        break;
      case "Bird":
        textStyle = "text-blue-500";
        border = "border-blue-500";
        bgColor = "bg-blue-100";
        break;
      case "Rabbit":
        textStyle = "text-orange-500";
        border = "border-orange-500";
        bgColor = "bg-orange-100";
        break;
      default:
        textStyle = "";
        border = "";
        bgColor = "";
        break;
    }

    return { textStyle, border, bgColor };
  };

  return {
    profileImage,
    getProfileImage,
    getTypeStyle,
    createPetProfile,
    updatePetProfile,
  };
};

export default usePosts;
