import React, { useState } from "react";

const petContext = React.createContext();

function PetProvider(props) {
  const [petDataById, setPetDataById] = useState({});
  const [petAvatarUrl, setPetAvatarUrl] = useState("");
  const [petAvatarFile, setPetAvatarFile] = useState(null);

  return (
    <petContext.Provider
      value={{
        setPetAvatarUrl,
        setPetAvatarFile,
        setPetDataById,
        petAvatarUrl,
        petAvatarFile,
        petDataById,
      }}
    >
      {props.children}
    </petContext.Provider>
  );
}

const usePet = () => React.useContext(petContext);

export { PetProvider, usePet };
