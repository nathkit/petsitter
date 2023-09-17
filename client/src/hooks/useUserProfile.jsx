import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function useUserProfile() {
  const params = useParams();

  const { setAlertMessage } = useAuth();

  const updateUserData = async (data) => {
    try {
      const serverRespond = await axios.put(
        `http://localhost:4000/userManagement/${params.userId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
