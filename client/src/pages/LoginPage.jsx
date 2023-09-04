import { useEffect, useState } from "react";
import * as React from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import {
  Button,
  TextField,
  Box,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ButtonPrimary,
  ButtonSocial,
  ButtonGhost,
} from "../components/systemdesign/Button";
import { FacebookIcon, GoogleIcon } from "../components/systemdesign/Icons";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();

  const handleSubmit = (values, formikHelpers) => {
    console.log(values);
    formikHelpers.resetForm();
  };

  const initialValues = {
    email: "",
    fullName: "",
    phone: "",
    password: "",
  };

  const [alignment, setAlignment] = useState("user");
  console.log(alignment);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="bg-etc-white  h-[100%] w-[100vw] relative flex justify-center ">
      {/* image ************************************* */}
      <div className="h-[40%] w-[15%]  absolute bottom-0 left-0 overflow-hidden">
        <div className="absolute top-0 left-7 rotate-45">
          <Ellipse15 />
        </div>
        <div className="absolute w-auto bottom-[-5.5rem] left-[-5rem] rotate-90">
          <Star1 width="310" height="310" />
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
        <Box className="mb-[1rem] ">
          <p className="text-headline1 text-etc-black">Welcome back!</p>
          <p className="text-headline4">Find your perfect pet sitter with us</p>
        </Box>

        {/* form ************************************* */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            handleSubmit(values, formikHelpers);
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
              .required("Please enter phone number")
              .test(
                "startsWithZero",
                "Phone number must start with 0",
                (value) => {
                  if (value) {
                    return value.startsWith("0");
                  }
                  return true; // Allow empty value (optional phone number)
                }
              )
              .min(10, "Phone numbers should have 10 character"),
            password: string()
              .required("Please enter password")
              .min(12, "Password should have atleast 12 character"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => {
            return (
              <Form className="flex flex-col gap-5 text-left ">
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
                  className="text-lg text-etc-black font-medium"
                  htmlFor="passsword"
                >
                  Password
                </label>
                <Field
                  id="passsword"
                  name="password"
                  type="password"
                  variant="outlined"
                  color="primary"
                  label="password"
                  as={TextField}
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />

                <Box className="flex w-full justify-between items-center">
                  <p className="text-etc-black">
                    <Checkbox /> Remember?
                  </p>
                  <Link className="w" to="/register">
                    <ButtonGhost width="10rem" content="Forget Password?" />
                  </Link>
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
        <p className="text-gray-500">Or Continue With</p>

        {/* sign in with third party ************************** */}
        <Box>
          <ButtonSocial icon={FacebookIcon} content="Facebook" />
          <ButtonSocial icon={GoogleIcon} content="Google" />
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
