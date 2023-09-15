import axios from "axios";
import React, { useState } from "react";
import { supabase } from "../contexts/supabase";
import { useParams } from "react-router-dom";

function useUserProfile() {
  const params = useParams();
  const [alertUserMessage, setAlertUserMessage] = useState();

  // send img to storage *****************************
  const handleAvatar = async (file) => {
    const uniqueName = Date.now();
    const uploadAvatar = await supabase.storage
      .from("avatars")
      .upload(`userAvatar/${uniqueName}.png`, file);
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`userAvatar/${uniqueName}.png`);
    // return URL ************************************
    return { avatarUrl: data.publicUrl };
  };

  const updateUserData = async (data) => {
    const newData = data;
    const { user, error } = await supabase.auth.updateUser({
      data: newData,
    });
    try {
      const result = await axios.put(
        `http://localhost:4000/userManagement/${params.userId}`,
        newData
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { updateUserData, handleAvatar };
}

export default useUserProfile;
