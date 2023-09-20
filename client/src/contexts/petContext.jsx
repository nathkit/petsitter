import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const petContext = React.createContext();

function PetProvider(props) {
  const [petDataById, setPetDataById] = useState({});
  const [petAvatarUrl, setPetAvatarUrl] = useState("");
  const [petAvatarFile, setPetAvatarFile] = useState(null);
  const [petIds, setPetIds] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const handleDelete = async (params) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/userManagement/${params.userId}/pets/${params.petId}`
      );
      if (response.status === 200) {
        const newPetIds = petIds.filter((id) => id !== params.petId);
        setPetIds(newPetIds);
        console.log("Pet deleted successfully.");
        navigate("/");
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
      }}
    >
      {props.children}
    </petContext.Provider>
  );
}

const usePet = () => React.useContext(petContext);

export { PetProvider, usePet };
