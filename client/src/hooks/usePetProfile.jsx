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
    } else if (petType === "Rabbit") {
      petType = 4;
    }
    return petType;
  };

  const getPetProfile = async () => {
    try {
      const result = await axios.get(
        `/userManagement/${params.userId}/pets/${params.petId}`
      );
      setPetDataById(result.data.data);
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client!",
        severity: "error",
      });
    }
  };

  const updatePetProfile = async (data) => {
    try {
      const result = await axios.put(
        `/userManagement/${params.userId}/pets/${params.petId}`,
        data,
        data.avatarFile
          ? {
              headers: { "Content-Type": "multipart/form-data" },
            }
          : null
      );
      // console.log(result.data.data);
      setPetDataById(result.data.data);
      setAlertMessage({
        message: result.data.message,
        severity: "success",
      });
      setTimeout(() => {
        setAlertMessage({
          message: "",
          severity: "",
        });
      }, 4000);
    } catch (error) {
      setAlertMessage({
        message: "Error is occurred from client!",
        severity: "error",
      });
    }
  };

  const createPetProfile = async (data) => {
    // console.log(data.avatarFile);
    try {
      const result = await axios.post(
        `/userManagement/${params.userId}/pets`,
        data,
        data.avatarFile
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : null
      );
      // console.log(result.data.message);
      setAlertMessage({
        message: result.data.message,
        severity: "success",
      });
      setTimeout(() => {
        setAlertMessage({
          message: "",
          severity: "",
        });
      }, 4000);
    } catch (error) {
      setAlertMessage({
        message: "Error is occurred from client!",
        severity: "error",
      });
    }
  };

  return { getPetProfile, createPetProfile, updatePetProfile, checkPetType };
}

export default usePetProfile;
