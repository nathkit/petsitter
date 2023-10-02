import React from "react";
import { useState } from "react";
import { supabase } from "./supabase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { boolean } from "yup";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [userData, setUserData] = useState({});
  const nav = useNavigate();
  const [getEvent, setGetEvent] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    severity: "",
  });
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // supabase handle ****************************************

  const handleLoginSubmit = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post("/auth/login", values);
      if (
        serverRespond.data.message === "User has been verified successfully"
      ) {
        // sign in to supabase auth table *******************************
        // must be sign in by client if sign in server it will not set token to local storage
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        // console.log(serverRespond.data.data);
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
          setUserData(serverRespond.data.data);
          localStorage.setItem("user", JSON.stringify(serverRespond.data.data));
          formikHelpers.resetForm();
          nav("/");
        }, 1000);
      } else {
        // console.log(serverRespond.data.message);
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "info",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkThirdPartyFirstSignIn = async (data) => {
    try {
      // console.log("1");
      let serverRespond = await axios.post("/auth/login", data);
      if (
        serverRespond.data.message === "User has been verified successfully"
      ) {
        setUserData(serverRespond.data.data);
        localStorage.setItem("user", JSON.stringify(serverRespond.data.data));
      } else {
        // console.log("2");
        serverRespond = await axios.post("/auth/googleRegister", data);
        setUserData(serverRespond.data.data);
        localStorage.setItem("user", JSON.stringify(serverRespond.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    const data = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signInWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  };

  const handleRegisterSubmit = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post("/auth/register", values);
      if (
        serverRespond.data.message ===
        "User profile has been created successfully and please confirm you email first"
      ) {
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
          formikHelpers.resetForm();
          nav("/login");
        }, 1500);
      } else {
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "info",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequestResetPassword = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post(
        "/auth/requestResetPassword",
        values
      );
      if (serverRespond.data.message === "Please check your email!") {
        setGetEvent("");
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
          formikHelpers.resetForm();
          nav("/login");
        }, 3000);
      } else {
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "info",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetPasswordSubmit = async (values, formikHelpers) => {
    // console.log(getEvent);
    const newValue = {
      email: getEvent.session.user.email,
      password: values.password,
    };
    if (getEvent.event !== "INITIAL_SESSION") {
      try {
        const serverRespond = await axios.put("/auth/resetPassword", newValue);
        if (serverRespond.data.message === "Reset password successfully") {
          setAlertMessage({
            message: serverRespond.data.message,
            severity: "success",
          });
          setTimeout(() => {
            setAlertMessage({
              message: "",
              severity: "",
            });
            formikHelpers.resetForm();
            nav("/login");
          }, 3000);
        } else {
          setAlertMessage({
            message: serverRespond.data.message,
            severity: "info",
          });
        }
      } catch (error) {
        setAlertMessage({
          message: "There was an error updating your password.",
          severity: "error",
        });
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    window.localStorage.removeItem("user");
    nav("login");
  };

  const isAuthenticated = JSON.parse(
    localStorage.getItem("sb-wjxguyrdfqbtwsetylfq-auth-token")
  );

  const isPetSitter = JSON.parse(localStorage.getItem("user"))?.sitter_authen;
  const petSitterId = JSON.parse(localStorage.getItem("user"))?.sitter_id;

  return (
    <AuthContext.Provider
      value={{
        handleRegisterSubmit,
        signInWithDiscord,
        signInWithGoogle,
        checkThirdPartyFirstSignIn,
        handleLoginSubmit,
        sendRequestResetPassword,
        handleResetPasswordSubmit,
        signOut,
        setGetEvent,
        handleClickShowPassword,
        setAlertMessage,
        setUserData,
        getEvent,
        showPassword,
        alertMessage,
        userData,
        isAuthenticated,
        isPetSitter,
        petSitterId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
