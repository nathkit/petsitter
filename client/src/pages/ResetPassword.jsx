import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { TextField, Box, Tabs, Tab } from "@mui/material";
import { ButtonPrimary, ButtonGhost } from "../components/systemdesign/Button";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.jsx";
import { supabase } from "../contexts/supabase";
import axios from "axios";

function ResetPassword() {
  const nav = useNavigate();
  const [getEvent, setGetEvent] = useState({});

  // supabase handle ****************************************
  const { handleLoginSubmit, handleChangeRole, role } = useAuth();

  const handleResetSubmit = async (values, formikHelpers) => {
    console.log(getEvent);
    const newValue = {
      email: getEvent.session.user.email,
      password: values.password,
    };
    if (getEvent.event === "PASSWORD_RECOVERY") {
      const { data, error } = await supabase.auth.updateUser({
        password: values.password,
      });
      const result = await axios.put(
        "http://localhost:4000/auth/resetPassword",
        newValue
      );
      console.log(result);
      if (data && result.data.message === "Reset password successfully") {
        alert(result.data.message);
        formikHelpers.resetForm();
        nav("/");
      }
      if (error) {
        alert("There was an error updating your password.");
      }
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
      console.log(session);
      setGetEvent({ event, session });
    });
  }, []);

  const initialValues = {
    password: "",
  };

  return (
    <div className="bg-etc-white m-0 py-[10%]  h-[100vh] w-full relative flex justify-center ">
      {/* image ************************************* */}

      <div className="h-[45%] w-[30%]  absolute bottom-0 left-0 overflow-hidden">
        <div className="absolute top-0 left-7 rotate-45">
          <Ellipse15 />
        </div>
        <div className="absolute w-auto bottom-[-5.5rem] left-[-5rem] rotate-90">
          <Star1 width="310" height="310" />
        </div>
      </div>
      <div className="h-[45%] w-[15%]  absolute top-0 right-0 overflow-hidden">
        <div className="absolute top-10 left-0 rotate-[-90deg]">
          <Vector color="#FFCA62" width="245" height="245" />
        </div>
      </div>

      {/* input box ************************************ */}
      <Box className="w-[30%] my-[5%] text-center pb-[24px] gap-[32px] flex flex-col items-center">
        {/* header **************************************** */}
        <Box className="mb-[1rem] ">
          <p className="text-headline1 text-etc-black">Reset Password</p>
          <p className="text-headline4">Are you ready to reset your password</p>
        </Box>

        {/* form ************************************* */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            handleResetSubmit(values, formikHelpers);
          }}
          validationSchema={object({
            password: string()
              .required("Please enter password")
              .min(12, "Password should have atleast 12 character"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form className="flex flex-col gap-5 text-left w-full">
                {/* select role tap ******************************* */}
                <p className="text-lg text-etc-black font-medium text-center">
                  Select Role
                </p>
                <Tabs
                  value={role}
                  onChange={handleChangeRole}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  sx={{ width: "full" }}
                >
                  <Tab
                    value="pet_owners"
                    label="Pet User"
                    sx={{ width: "50%" }}
                  />
                  <Tab
                    value="pet_sitters"
                    label="Pet Sitter"
                    sx={{ width: "50%" }}
                  />
                </Tabs>

                {/* password ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="passsword"
                >
                  New password
                </label>
                <Field
                  id="passsword"
                  name="password"
                  type="password"
                  variant="outlined"
                  color="primary"
                  label="Password"
                  as={TextField}
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />

                {/* submit button ************************** */}
                <ButtonPrimary
                  content="Reset"
                  width="100%"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={!dirty || !isValid}
                />
              </Form>
            );
          }}
        </Formik>

        <ButtonGhost
          content="Login"
          onClick={(e) => {
            nav("/login");
          }}
        />
      </Box>
    </div>
  );
}

export default ResetPassword;
