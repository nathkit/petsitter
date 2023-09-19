import React from "react";
import axios from "axios";
import { usePet } from "../contexts/petContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function usePetProfile() {
  const { setPetDataById } = usePet();
  const { setAlertMessage } = useAuth();
  const params = useParams();

  const checkPetType = (petType) => {
    if (petType === "Dog") {
      petType = 1;
    } else if (petType === "Cat") {
      petType = 2;
    } else if (petType === "Bird") {
      petType = 3;
    } else {
      petType = 4;
    }
    return petType;
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

  const updatePetProfile = async (data) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/userManagement/${params.userId}/pets/${params.petId}`,
        data,
        data.avatarFile
          ? {
              headers: { "Content-Type": "multipart/form-data" },
            }
          : null
      );
      setPetDataById(result.data.data);
      setAlertMessage({
        message: result.data.message,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
    }
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

  return { getPetProfile, createPetProfile, updatePetProfile, checkPetType };
}

export default usePetProfile;
