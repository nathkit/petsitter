import axios from "axios";
import React, { useState } from "react";
import { supabase } from "../contexts/supabase";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function useUserProfile() {
  const params = useParams();
  const { alertMessage, setAlertMessage } = useAuth();

  const updateUserData = async (data) => {
    // console.log(data.avatarName);
    const uniqueName = Date.now();
    try {
      // delete avatar bofore upload condition ********************************
      if (data.avatarName) {
        await supabase.storage.from("avatars").remove([data.avatarName]);
        data.avatarName = `userAvatar/${uniqueName}.png`;
        await supabase.storage
          .from("avatars")
          .upload(data.avatarName, data.avatarFile);
        // console.log("1");
      } else {
        data.avatarName = `userAvatar/${uniqueName}.png`;
        await supabase.storage
          .from("avatars")
          .upload(data.avatarName, data.avatarFile);
        // console.log("2");
      }
      const serverRespond = await axios.put(
        `http://localhost:4000/userManagement/${params.userId}`,
        data
      );
      setAlertMessage({
        message: serverRespond.data.message,
        severity: "success",
      });
    } catch (err) {
      setAlertMessage({
        message: "Error is occured!",
        severity: "error",
      });
      console.log("Error is occured!");
    }
  };

  return { updateUserData };
}

export default useUserProfile;
