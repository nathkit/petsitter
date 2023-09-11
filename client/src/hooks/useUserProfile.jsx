import axios from "axios";
import React, { useState } from "react";

function useUserProfile() {
  const [user, setUser] = useState();
  const [alertUserMessage, setAlertUserMessage] = useState();

  const fetchUserData = async () => {
    const result = await axios.get("http://localhost:4000/user/:user_id");
    setUser(result.data);
    setAlertUserMessage(result.data.message);
  };

  const updateUserData = async (data) => {
    const result = await axios.put("http://localhost:4000/user/:user_id", data);
  };

  return { fetchUserData, updateUserData };
}

export default useUserProfile;
