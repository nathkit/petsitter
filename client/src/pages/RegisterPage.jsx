import * as React from "react";
import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { TextField, Box, Tabs, Tab, IconButton, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ButtonPrimary,
  ButtonSocial,
  ButtonGhost,
} from "../components/systemdesign/Button";
import { FacebookIcon, GoogleIcon } from "../components/systemdesign/Icons";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.jsx";
import { BsDiscord } from "react-icons/bs";

function Register() {
  const nav = useNavigate();
  const {
    handleRegisterSubmit,
    signInWithDiscord,
    signInWithGoogle,
    handleClickShowPassword,
    showPassword,
    alertMessage,
    setAlertMessage,
  } = useAuth();

  useEffect(() => {
    setAlertMessage({
      message: "",
      severity: "",
    });
  }, []);

  return (
    <div className="bg-etc-white h-auto w-full relative flex justify-center ">
      {/* image ************************************* */}
      <div className="h-[32%] w-[30%]  absolute bottom-0 left-0 overflow-hidden">
        <div className="absolute top-0 left-7 rotate-45 scale-90">
          <Ellipse15 width="100%" color="#76D0FC" />
        </div>
        <div className="absolute bottom-[-5.5rem] left-[-4.5rem] rotate-90">
          <Star1 width="100%" height="310" />
        </div>
      </div>
      <div className="h-[32%] w-[15%]  absolute top-0 right-0 overflow-hidden">
        <div className="absolute top-10 left-0 rotate-[-90deg]">
          <Vector color="#FFCA62" width="245" height="245" />
        </div>
      </div>

      {/* input box ************************************ */}
      <Box className="w-[30%] my-[5%] text-center pb-[24px] gap-[32px] flex flex-col">
        {/* header **************************************** */}
        <Box>
          <p
            className="text-headline1 text-etc-black cursor-pointer"
            onClick={() => {
              nav("/");
            }}
          >
            Join Us!
          </p>
          <p className="text-headline4">Find your perfect pet stter with us</p>
        </Box>

        {/* form ************************************* */}
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            phone: "",
            password: "",
          }}
          onSubmit={(values, formikHelpers) => {
            handleRegisterSubmit(values, formikHelpers);
          }}
          validationSchema={object({
            email: string()
              .required("Please enter email")
              .email("Invalid email"),
            fullName: string()
              .required("Please enter name")
              .min(6, "Name is too short")
              .max(20, "Name is too long"),
            phone: string()
              .matches(
                /^0\d+$/,
                "Phone number must start with 0 and contain only numeric characters"
              )
              .required("Phone number is required")
              .test(
                "isExactlyTenCharacters",
                "Phone numbers should have exactly 10 characters",
                (value) => {
                  if (value) {
                    return value.length === 10;
                  }
                  return true; // Allow empty value (optional phone number)
                }
              ),
            password: string()
              .required("Please enter password")
              .min(12, "Password should have atleast 12 character"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form className="flex flex-col gap-5 text-left ">
                {/* alert box *************************************** */}
                {alertMessage ? (
                  <Alert
                    severity={alertMessage.severity}
                    sx={alertMessage.severity ? { boxShadow: 1 } : null}
                  >
                    {alertMessage.message}
                  </Alert>
                ) : null}

                {/* email ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="email"
                >
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

                {/* full name ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="fullName"
                >
                  Your name
                </label>
                <Field
                  className="TextField"
                  id="fullName"
                  name="fullName"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Full Name"
                  as={TextField}
                  error={Boolean(errors.fullName) && Boolean(touched.fullName)}
                  helperText={Boolean(touched.fullName) && errors.fullName}
                />

                {/* phone ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="phone"
                >
                  Phone numbers
                </label>
                <Field
                  className="TextField"
                  id="phone"
                  name="phone"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Phone"
                  as={TextField}
                  error={Boolean(errors.phone) && Boolean(touched.phone)}
                  helperText={Boolean(touched.phone) && errors.phone}
                />

                {/* password ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="passsword"
                >
                  Password
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
                    helperText={Boolean(touched.password) && errors.password}
                  ></Field>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    sx={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "1rem",
                      color: `${showPassword ? "red" : null}`,
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Box>

                {/* submit button ************************** */}
                <ButtonPrimary
                  content="Register"
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
        <p className="text-gray-500">Or Continue With</p>

        {/* sign in with third party ************************** */}
        <Box>
          <ButtonSocial
            onClick={(e) => {
              signInWithDiscord();
            }}
            icon={BsDiscord}
            content="Discord"
          />
          <ButtonSocial
            onClick={(e) => {
              signInWithGoogle();
            }}
            icon={GoogleIcon}
            content="Google"
          />
        </Box>
        <p className="text-lg text-etc-black font-medium">
          Already have an account?{" "}
          <ButtonGhost
            content="Login"
            onClick={(e) => {
              nav("/login");
            }}
          />
        </p>
      </Box>
    </div>
  );
}

export default Register;
