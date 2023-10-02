import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { TextField, Box, Tabs, Tab, IconButton, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ButtonPrimary, ButtonGhost } from "../components/systemdesign/Button";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.jsx";
import { supabase } from "../contexts/supabase";

function ResetPassword() {
  const nav = useNavigate();
  const [initialValues, setInitialValues] = useState({});

  // supabase handle ****************************************
  const {
    sendRequestResetPassword,
    handleResetPasswordSubmit,
    handleClickShowPassword,
    showPassword,
    getEvent,
    setGetEvent,
    alertMessage,
    setAlertMessage,
  } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setAlertMessage({
        message: "",
        severity: "",
      });
      // input init values **************************
      if (event === "INITIAL_SESSION") {
        setInitialValues({
          email: "",
        });
      }
      if (event === "PASSWORD_RECOVERY") {
        setInitialValues({
          password: "",
        });
      }
      console.log(event);
      // console.log(session);
      setGetEvent({ event, session });
    });
  }, []);

  return (
    <div className="bg-etc-white m-0 py-[10%]  min-h-screen w-full relative flex justify-center ">
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

        <Box className="w-full">
          {/* alert box *************************************** */}
          {alertMessage ? (
            <Alert severity={alertMessage.severity}>
              {alertMessage.message}
            </Alert>
          ) : null}
        </Box>
        {/* form ************************************* */}
        {getEvent.event === "INITIAL_SESSION" ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              sendRequestResetPassword(values, formikHelpers);
            }}
            validationSchema={object({
              email: string()
                .required("Please enter email")
                .email("Invalid email"),
            })}>
            {({ errors, isValid, touched, dirty }) => {
              return (
                <Form className="flex flex-col gap-5 text-left w-full">
                  {/* email ********************************* */}
                  <label
                    className="text-lg text-etc-black font-medium"
                    htmlFor="email">
                    Email address
                  </label>
                  <Field
                    className="TextField"
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    color="primary"
                    label="Email"
                    as={TextField}
                    error={Boolean(errors.email) && Boolean(touched.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />

                  {/* submit button ************************** */}
                  <ButtonPrimary
                    content="Send request to your email"
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
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              handleResetPasswordSubmit(values, formikHelpers, getEvent);
            }}
            validationSchema={object({
              password: string()
                .required("Please enter password")
                .min(12, "Password should have atleast 12 character"),
            })}>
            {({ errors, isValid, touched, dirty }) => {
              return (
                <Form className="flex flex-col gap-5 text-left w-full">
                  {/* password ********************************* */}
                  <label
                    className="text-lg text-etc-black font-medium"
                    htmlFor="passsword">
                    New password
                  </label>
                  <Box className="relative">
                    <Field
                      className="w-full TextField"
                      id="passsword"
                      name="password"
                      variant="outlined"
                      color="primary"
                      label="password"
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        Boolean(touched.password) && errors.password
                      }></Field>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "1rem",
                        color: `${showPassword ? "red" : null}`,
                      }}>
                      <VisibilityIcon />
                    </IconButton>
                  </Box>

                  {/* submit button ************************** */}
                  <ButtonPrimary
                    content="Reset your password"
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
        )}

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
