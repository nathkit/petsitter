import * as React from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { TextField, Box, Tabs, Tab, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ButtonPrimary,
  ButtonSocial,
  ButtonGhost,
} from "../components/systemdesign/Button";
import { BaseCheckbox } from "../components/systemdesign/BaseCheckbox.jsx";
import { FacebookIcon, GoogleIcon } from "../components/systemdesign/Icons";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.jsx";

function LoginPage() {
  const nav = useNavigate();

  // supabase handle ****************************************
  const {
    signInWithFacebook,
    signInWithGoogle,
    handleLoginSubmit,
    handleChangeRole,
    handleClickShowPassword,
    showPassword,
    signOut,
    role,
  } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="bg-etc-white m-0 p-0  h-[100%] w-full relative flex justify-center ">
      {/* image ************************************* */}
      <button onClick={signOut} className="bg-orange-500 h-8">
        signout test
      </button>
      <div className="h-[35%] w-[30%]  absolute bottom-0 left-0 overflow-hidden">
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
      <Box className="w-[30%] my-[5%] text-center pb-[24px] gap-[32px] flex flex-col">
        {/* header **************************************** */}
        <Box className="mb-[1rem] ">
          <p className="text-headline1 text-etc-black">Welcome back!</p>
          <p className="text-headline4">Find your perfect pet sitter with us</p>
        </Box>

        {/* form ************************************* */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            handleLoginSubmit(values, formikHelpers);
          }}
          validationSchema={object({
            email: string()
              .required("Please enter email")
              .email("Invalid email"),
            password: string()
              .required("Please enter password")
              .min(12, "Password should have atleast 12 character"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form className="flex flex-col gap-5 text-left ">
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
                {/* email ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="email"
                >
                  Email address
                </label>
                <Field
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

                {/* password ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium relative"
                  htmlFor="passsword"
                >
                  Password
                </label>
                <Box className="relative">
                  <Field
                    className="w-full"
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
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Box>

                <Box className="flex w-full justify-between items-center">
                  {/* <div className="text-etc-black flex items-center">
                    <BaseCheckbox /> Remember?
                  </div> */}
                </Box>

                {/* submit button ************************** */}
                <ButtonPrimary
                  content="Login"
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
        {/* reset password ******************** */}
        <ButtonGhost
          type="button"
          onClick={() => {
            nav("/resetPassword");
          }}
          width="10rem"
          content="Forget Password?"
        />
        <p className="text-gray-500">Or Continue With</p>

        {/* sign in with third party ************************** */}
        <Box>
          <ButtonSocial
            onClick={(e) => {
              signInWithFacebook();
            }}
            icon={FacebookIcon}
            content="Facebook"
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
          Dont you have any account?{" "}
          <ButtonGhost
            content="Register"
            onClick={(e) => {
              nav("/register");
            }}
          />
        </p>
      </Box>
    </div>
  );
}

export default LoginPage;
