import axios from "axios";
import { json, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function useUserProfile() {
  const params = useParams();
  const { setUserData } = useAuth();
  const { setAlertMessage } = useAuth();

  const updateUserData = async (data) => {
    try {
      const serverRespond = await axios.put(
        `/userManagement/${params.userId}`,
        data,
        data.avatarFile
          ? {
              headers: { "Content-Type": "multipart/form-data" },
            }
          : null
      );
      if (serverRespond.data.message === "Updated user successfully.") {
        setUserData(serverRespond.data.data);
        localStorage.setItem("user", JSON.stringify(serverRespond.data.data));
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
        }, 4000);
      } else {
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "info",
        });
      }
    } catch (err) {
      setAlertMessage({
        message: "Error is occured!",
        severity: "error",
      });
      console.log("Error is occured!");
    }
  };
  const userData = JSON.parse(window.localStorage.getItem("user"));

  return { updateUserData, userData };
}

export default useUserProfile;
