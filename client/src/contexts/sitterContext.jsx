import React, { useState } from "react";

const sitterContext = React.createContext();
function SitterProvider(props) {
  const [petType, setPetType] = useState([]);
  const [imageGalleryUrls, setImageGalleryUrls] = useState([]);
  const [imageGalleryFile, setImageGalleryFile] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [sitterData, setSitterData] = useState({});

  return (
    <sitterContext.Provider
      value={{
        imageGalleryUrls,
        imageGalleryFile,
        avatarUrl,
        avatarFile,
        petType,
        sitterData,
        setSitterData,
        setPetType,
        setAvatarUrl,
        setAvatarFile,
        setImageGalleryUrls,
        setImageGalleryFile,
      }}
    >
      {props.children}
    </sitterContext.Provider>
  );
}
const useSitter = () => React.useContext(sitterContext);
export { SitterProvider, useSitter };
