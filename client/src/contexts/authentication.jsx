import React from "react";
import { useState } from "react";
import { supabase } from "./supabase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object } from "yup";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const nav = useNavigate();
  const [getEvent, setGetEvent] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    severity: "",
  });
  const [userData, setUserData] = useState(null);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // supabase handle ****************************************

  const handleLoginSubmit = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/login",
        values
      );
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
        setUser(serverRespond.data.data);
        // console.log(serverRespond.data.data);
        localStorage.setItem("user", JSON.stringify(serverRespond.data.data));
        formikHelpers.resetForm();
        nav("/");
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

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signInWithFacebook = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  };

  const handleRegisterSubmit = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/register",
        values
      );
      if (
        serverRespond.data.message ===
        "User profile has been created successfully and please confirm you email first"
      ) {
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        formikHelpers.resetForm();
        setTimeout(() => {
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

  const sendRequestResetPassword = async (values, formikHelpers) => {
    try {
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/requestResetPassword",
        values
      );
      if (serverRespond.data.message === "Please check your email!") {
        setGetEvent("");
        setAlertMessage({
          message: serverRespond.data.message,
          severity: "success",
        });
        formikHelpers.resetForm();
        setTimeout(() => {
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
        const serverRespond = await axios.put(
          "http://localhost:4000/auth/resetPassword",
          newValue
        );
        if (serverRespond.data.message === "Reset password successfully") {
          setAlertMessage({
            message: serverRespond.data.message,
            severity: "success",
          });
          formikHelpers.resetForm();
          setTimeout(() => {
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

  return (
    <AuthContext.Provider
      value={{
        handleRegisterSubmit,
        signInWithFacebook,
        signInWithGoogle,
        handleLoginSubmit,
        sendRequestResetPassword,
        handleResetPasswordSubmit,
        signOut,
        setGetEvent,
        handleClickShowPassword,
        setAlertMessage,
        setIsAuthenticated,
        getEvent,
        isAuthenticated,
        showPassword,
        alertMessage,
        user,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
