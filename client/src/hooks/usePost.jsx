import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const usePosts = () => {
  const [petData, setPetData] = useState();
  const [petDataById, setPetDataById] = useState({});
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const params = useParams();
  const [bookingDetail, setBookingDetail] = useState({});
  const [petBookingDetail, setPetBookingDetail] = useState([]);

  const getProfileImage = async (user) => {
    // console.log(userEmail);
    // console.log(user);
    if (user) {
      setProfileImage(user.avatar.avatarUrl);
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

  const getAllPetList = async () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      try {
        const result = await axios.get(
          `http://localhost:4000/userManagement/${user.id}/pets`
        );
        setPetData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(petData);
  };

  const getPetProfile = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/userManagement/${params.userId}/pets/${params.petId}`
      );
      setPetDataById(result.data.data);
    } catch (err) {
      console.log("Error is occured from client!");
    }
  };

  const createBooking = async (data) => {
    try {
      const createBookingResult = await axios.post(
        `http://localhost:4000/booking/:userId/:sitterId`,
        data
      );
      navigate("/userManagement/:userId/booking/:bookingId");
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingDetail = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const result = await axios.get(
        `http://localhost:4000/booking/${user.id}`
      );
      setBookingDetail(result.data.data);
      setPetBookingDetail(result.data.petNames);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    profileImage,
    getProfileImage,
    getTypeStyle,
    createPetProfile,
    updatePetProfile,
    getAllPetList,
    getPetProfile,
    petData,
    petDataById,
    createBooking,
    getBookingDetail,
    bookingDetail,
    petBookingDetail,
  };
};

export default usePosts;
