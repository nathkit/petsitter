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
    if (petType === "dog") {
      petType = 1;
    } else if (petType === "cat") {
      petType = 2;
    } else if (petType === "bird") {
      petType = 3;
    } else if (petType === "rabbit") {
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
      console.log(result.data.data);
      setPetDataById(result.data.data);
      setAlertMessage({
        message: result.data.message,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createPetProfile = async (data) => {
    console.log(data);
    try {
      const result = await axios.post(
        `http://localhost:4000/userManagement/${params.userId}/pets`,
        data,
        data.avatarFile
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : null
      );
      console.log(result.data.message);
      // setAlertMessage({
      //   message: result.data.message,
      //   severity: "success",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return { getPetProfile, createPetProfile, updatePetProfile, checkPetType };
}

export default usePetProfile;
