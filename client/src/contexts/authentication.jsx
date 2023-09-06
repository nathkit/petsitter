import React from "react";
import { useState } from "react";
import { supabase } from "./supabase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const nav = useNavigate();
  // const [facebookLogin, SetFacebookLogin] = useState(false);
  // const [googleLogin, SetGoogleLogin] = useState(false);
  const [role, setRole] = useState("pet_owners");
  const [user, setUser] = useState({});

  const handleChangeRole = (event, newRole) => {
    setRole(newRole);
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
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      } else {
        console.log(serverRespond.data.message);
        return serverRespond.data.message;
      }
    } catch (err) {
      console.log(err.respondes);
    }

    // formikHelpers.resetForm();
    // nav("/");
    // return;
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
      // const { data, error } = await supabase.auth.signUp({
      //   email: values.email,
      //   password: values.password,
      // });
      const serverRespond = await axios.post(
        "http://localhost:4000/auth/register",
        newValues
      );
      console.log(serverRespond);
    } catch (err) {
      console.log(err);
    }

    // formikHelpers.resetForm();
    nav("/login");
    return;
  };

  const getUserData = async () => {
    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        // console.log(value.data.user.user_metadata);
        setUser(value.data.user.user_metadata);
      }
    });
  };

  const resetPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://example.com/update-password",
    });
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
        resetPassword,
        signOut,
        role,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
