import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { format, parseISO } from "date-fns";

const usePosts = () => {
  const [petData, setPetData] = useState();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const { userData } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [cursor, setCursor] = useState(null); // cursor for pagination
  const [searchKeywords, setSearchKeywords] = useState("");
  const [bookingStatus, setBookingStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getProfileImage = async (user) => {
    if (user) {
      setProfileImage(user.image_path);
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
        const result = await axios.get(`/userManagement/${user.id}/pets`);
        setPetData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(petData);
  };

  const createBooking = async (data) => {
    try {
      const createBookingResult = await axios.post(
        `/booking/${userData.id}/${data.pet_sitter_id}`,
        data
      );
      console.log(createBookingResult.data.bookingId);
      navigate(
        `/userManagement/${userData.id}/booking/${createBookingResult.data.bookingId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getSitterBookingList = async (
    sitterId,
    searchKeywords = "",
    status = [],
    page
  ) => {
    // console.log(searchKeywords);
    // console.log(page);
    try {
      const response = await axios.get(
        `/sitterManagement/${sitterId}/booking/`,
        {
          params: {
            searchKeywords: searchKeywords,
            status: status,
            page: page,
          },
        }
      );
      // Assuming you have a state variable 'bookings' and a setter function 'setBookings'
      const startDateFormat = "d MMM, hh:mm a";
      const endDateFormat = "hh:mm a";

      const data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        if (
          format(parseISO(data[i].start_date_time), "dd MMM yyyy") ===
          format(parseISO(data[i].end_date_time), "dd MMM yyyy")
        ) {
          data[i].bookedDate =
            format(parseISO(data[i].start_date_time), startDateFormat) +
            " - " +
            format(parseISO(data[i].end_date_time), endDateFormat);
        } else {
          data[i].bookedDate =
            format(parseISO(data[i].start_date_time), startDateFormat) +
            " - " +
            format(parseISO(data[i].end_date_time), startDateFormat);
        }
      }

      setBookings(data);
      setTotalPages(Number(response.data.totalPages));
      setCurrentPage(Number(response.data.currentPage));
      // console.log(data);
    } catch (error) {
      console.error("Error fetching bookings: ", error);
    }
  };
  return {
    profileImage,
    getProfileImage,
    getTypeStyle,
    getAllPetList,
    petData,
    createBooking,
    getSitterBookingList,
    bookings,
    setBookings,
    cursor,
    setCursor,
    searchKeywords,
    setSearchKeywords,
    bookingStatus,
    setBookingStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  };
};

export default usePosts;
