import React from "react";
import { useSitter } from "../contexts/sitterContext";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { supabase } from "../contexts/supabase";
function useSitterProfile() {
  const nav = useNavigate();
  const param = useParams();
  const { setAlertMessage, setUserData } = useAuth();
  const {
    avatarUrl,
    setAvatarUrl,
    avatarFile,
    setAvatarFile,
    imageGalleryUrls,
    setImageGalleryUrls,
    imageGalleryFile,
    setImageGalleryFile,
    setSitterData,
    sitterData,
    imageGalleryName,
    setImageGalleryName,
    setPetType,
  } = useSitter();
  const newUser = JSON.parse(localStorage.getItem("user"));
  const sitterImageUrlsManage = (selectFile) => {
    const imgUrl = selectFile.map((item) => {
      return URL.createObjectURL(item);
    });
    const newImageGalleryUrls = [...imageGalleryUrls];

    for (let item of imgUrl) {
      newImageGalleryUrls.length < 10 ? newImageGalleryUrls.push(item) : null;
    }
    if (imageGalleryUrls.length < 10) {
      setImageGalleryUrls(newImageGalleryUrls);
    }
  };

  const sitterImageFileManage = (selectFile) => {
    const newImageGalleryFile = [...imageGalleryFile];
    for (let item of selectFile) {
      newImageGalleryFile.length < 10 ? newImageGalleryFile.push(item) : null;
    }
    if (imageGalleryFile.length < 10) {
      setImageGalleryFile(newImageGalleryFile);
    }
  };

  const sitterImageArrayManage = (indexParam) => {
    const newImageGalleryFile = imageGalleryFile.filter((item, index) => {
      return item !== imageGalleryFile[indexParam];
    });
    setImageGalleryFile(newImageGalleryFile);

    const newImageGalleryUrls = imageGalleryUrls.filter((item, index) => {
      return item !== imageGalleryUrls[indexParam];
    });
    setImageGalleryUrls(newImageGalleryUrls);

    const newImageGalleryName = imageGalleryName.filter((item, index) => {
      return item !== imageGalleryName[indexParam];
    });
    setImageGalleryName(newImageGalleryName);
  };

  const getSitterData = async () => {
    let result;
    try {
      const serverRespondes = await axios.get(
        `/sitterManagement/getSitterData/${newUser.sitter_id}`
      );
      const newPetType = serverRespondes.data.data.pet_type.split(",");
      setPetType(newPetType);
      setSitterData(serverRespondes.data.data);
      const galleryUrls = serverRespondes.data.data.trade_image_path.split(",");
      setImageGalleryUrls(galleryUrls);
      const galleryName = serverRespondes.data.data.trade_image_name.split(",");
      setImageGalleryName(galleryName);
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client",
        severity: "error",
      });
    }
    return result;
  };

  const createSitterProfile = async (data) => {
    if (!avatarFile || !imageGalleryFile.length) {
      setAlertMessage({
        message: "You do not have profile image or trade image gallery !",
        severity: "error",
      });
      return;
    }
    try {
      const serverRespondes = await axios.post("/sitterManagement", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (
        serverRespondes.data.message ===
        "Sitter Profile has been created successfully"
      ) {
        setUserData(serverRespondes.data.data);

        localStorage.setItem("user", JSON.stringify(serverRespondes.data.data));
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
          nav(`/sitterManagement/${serverRespondes.data.data.sitter_id}`);
        }, 4000);
      } else {
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client",
        severity: "error",
      });
    }
  };

  const updateSitterProfile = async (data) => {
    let result;
    try {
      const serverRespondes = await axios.put(
        `/sitterManagement/${newUser.sitter_id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (
        serverRespondes.data.message ===
        "Sitter Profile has been updated successfully"
      ) {
        const newPetType = serverRespondes.data.sitterData.pet_type.split(",");
        setPetType(newPetType);
        setUserData(serverRespondes.data.userData);
        setSitterData(serverRespondes.data.sitterData);
        localStorage.setItem(
          "user",
          JSON.stringify(serverRespondes.data.userData)
        );
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
          nav(`/sitterManagement/${serverRespondes.data.userData.sitter_id}`);
        }, 4000);
      } else {
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client",
        severity: "error",
      });
    }
  };

  const createFormData = (data) => {
    const formData = new FormData();
    // console.log("first");
    if (imageGalleryName.length > 0) {
      formData.append("imageGalleryName", imageGalleryName);
    }
    for (let key in data) {
      formData.append(key, data[key]);
    }
    for (let item of imageGalleryFile) {
      formData.append("imageGalleryFile", item);
    }

    return formData;
  };

  const test = async () => {
    // const { data, error } = await supabase.storage
    //   .from("avatars")
    //   .list(`tradeGallery/${44}`);
    // console.log(data);
    // console.log("kk");
    // const newImageGalleryName = imageGalleryName.map((item) => {
    //   return item.split("/")[2];
    // });
    // const filesToDelete = data.filter((item, index) => {
    //   return !newImageGalleryName.includes(item.name);
    // });
    // console.log(filesToDelete);
    // const { error } = await supabase.storage
    //   .from("avatars")
    //   .remove(["tradeGallery/44/homebbb.jfif"]);
    // console.log("kk");
  };

  return {
    test,
    sitterImageUrlsManage,
    sitterImageFileManage,
    sitterImageArrayManage,
    createSitterProfile,
    updateSitterProfile,
    getSitterData,
    createFormData,
  };
}

export default useSitterProfile;
