import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
const petContext = React.createContext();

function PetProvider(props) {
  const [petDataById, setPetDataById] = useState({});
  const [petAvatarUrl, setPetAvatarUrl] = useState("");
  const [petAvatarFile, setPetAvatarFile] = useState(null);
  const [petIds, setPetIds] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async (userId, petId, avatarName) => {
    try {
      const response = await axios.delete(
        `/userManagement/${userId}/pets/${petId}`
      );
      if (response.status === 200) {
        // delete image from supabase too ***************************
        await supabase.storage.from("avatars").remove([avatarName]);
        const newPetIds = petIds.filter((id) => id !== petId);
        setPetIds(newPetIds);
        console.log("Pet deleted successfully.");
        navigate(`/userManagement/${userId}/pets`);
      } else {
        console.error("Error deleting pet:", response.data.message);
      }
    } catch (error) {
      console.error("General Error:", error);
    }
  };

  return (
    <petContext.Provider
      value={{
        setPetAvatarUrl,
        setPetAvatarFile,
        setPetDataById,
        petAvatarUrl,
        petAvatarFile,
        petDataById,
        handleDelete,
        petIds,
        setPetIds,
      }}>
      {props.children}
    </petContext.Provider>
  );
}

const usePet = () => React.useContext(petContext);

export { PetProvider, usePet };
