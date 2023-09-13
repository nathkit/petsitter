import axios from "axios";
import React, { useState } from "react";
import { supabase } from "../contexts/supabase";
import { useParams } from "react-router-dom";

function useUserProfile() {
  const params = useParams();
  const [user, setUser] = useState();
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
    // console.log(data);
    // console.log(params.ownerId);
    // const { user, error } = await supabase.auth.updateUser({
    //   data: {
    //     first_name: "555555555",
    //     last_name: "55555555",
    //     age: 5555555,
    //   },
    // });
    try {
      const result = await axios.put(
        `http://localhost:4000/accounts/${params.ownerId}`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = async () => {
    const result = await axios.get(
      `http://localhost:4000/accounts/${params.ownerId}`
    );
    setUser(result.data);
    setAlertUserMessage(result.data.message);
  };

  return { fetchUserData, updateUserData, handleAvatar };
}

export default useUserProfile;
