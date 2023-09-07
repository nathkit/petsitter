import React from "react";
import { useState } from "react";
import { supabase } from "./supabase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nav = useNavigate();
  const [getEvent, setGetEvent] = useState({});
  const [role, setRole] = useState("pet_owners");
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(errorMessage);
  const handleChangeRole = (event, newRole) => {
    setRole(newRole);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // supabase handle ****************************************

  const handleLoginSubmit = async (values, formikHelpers) => {
    const newValues = { ...values, role };
    try {
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/login",
        newValues
      );

      if (
        serverRespond.data.message ===
        "User profile has been verified successfully"
      ) {
        console.log(serverRespond.data.message);
        const result = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        formikHelpers.resetForm();
        nav("/");
        if (result.error.message) {
          setErrorMessage(result.error.message);
        }
      } else {
        console.log(serverRespond.data.message);
        serverRespond.data.message;
      }
    } catch (err) {
      console.log(err.respondes);
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
    const newValues = { ...values, role };
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/register",
        newValues
      );
      // console.log(serverRespond);
    } catch (err) {
      console.log(err);
    }

    formikHelpers.resetForm();
    nav("/login");
  };

  const getUserData = async () => {
    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        // console.log(value.data);
        setUser(value.data.user);
        setIsAuthenticated(value.data.user.aud === "authenticated");
      }
    });
  };

  const sendRequestResetPassword = async (values, formikHelpers) => {
    // console.log(values.email);
    const email = values.email;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/resetPassword",
    });
    setGetEvent("");
    alert("Please check your email!");
    nav("/login");
  };

  const handleResetPasswordSubmit = async (values, formikHelpers) => {
    console.log(getEvent);
    const newValue = {
      email: getEvent.session.user.email,
      password: values.password,
      role,
    };
    if (getEvent.event !== "INITIAL_SESSION") {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: values.password,
        });
        const result = await axios.put(
          "http://localhost:4000/auth/resetPassword",
          newValue
        );
        console.log(result.data.message);
        if (data && result.data.message === "Reset password successfully") {
          alert(result.data.message);
          formikHelpers.resetForm();
          nav("/");
        }
      } catch (error) {
        alert("There was an error updating your password.");
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    nav("login");
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegisterSubmit,
        signInWithFacebook,
        signInWithGoogle,
        handleChangeRole,
        handleLoginSubmit,
        getUserData,
        sendRequestResetPassword,
        handleResetPasswordSubmit,
        signOut,
        setGetEvent,
        handleClickShowPassword,
        getEvent,
        role,
        user,
        isAuthenticated,
        showPassword,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
