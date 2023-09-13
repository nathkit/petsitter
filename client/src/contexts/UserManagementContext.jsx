import React from "react";
import { useState } from "react";

const UserManagementContext = React.createContext();

function UserManagementProvider(props) {
  const [activeSection, setActiveSection] = useState("profile");
  const [userIcon, setUserIcon] = useState("#ff7037");
  const [petIcon, setPetIcon] = useState(null);
  const [listIcon, setListIcon] = useState(null);
  const [petId, setPetId] = useState("");
  const [showCreatePetButton, setShowCreatePetButton] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showYourPet, setShowYourPet] = useState(true);
  const [showEditPet, setShowEditPet] = useState(false);
  return (
    <UserManagementContext.Provider
      value={{
        setActiveSection,
        activeSection,
        userIcon,
        setUserIcon,
        petIcon,
        setPetIcon,
        listIcon,
        setListIcon,
        setPetId,
        petId,
        showYourPet,
        setShowYourPet,
        showEditPet,
        setShowEditPet,
        showCreatePetButton,
        setShowCreatePetButton,
        buttonClicked,
        setButtonClicked,
      }}
    >
      {props.children}
    </UserManagementContext.Provider>
  );
}

const useManagement = () => React.useContext(UserManagementContext);

export { UserManagementProvider, useManagement };
