import * as React from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { TextField, Box, Tabs, Tab } from "@mui/material";
import {
  ButtonPrimary,
  ButtonSocial,
  ButtonGhost,
} from "../components/systemdesign/Button";
import { FacebookIcon, GoogleIcon } from "../components/systemdesign/Icons";
import { Star1, Vector, Ellipse15 } from "../components/systemdesign/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.jsx";

function Register() {
  const nav = useNavigate();
  // const [facebookLogin, SetFacebookLogin] = useState(false);
  // const [googleLogin, SetGoogleLogin] = useState(false);

  // supabase handle ****************************************
  const {
    handleRegisterSubmit,
    signInWithFacebook,
    signInWithGoogle,
    handleChangeRole,
    role,
  } = useAuth();

  const initialValues = {
    email: "",
    fullName: "",
    phone: "",
    password: "",
  };

  return (
    <div className="bg-etc-white  h-full w-full relative flex justify-center ">
      {/* image ************************************* */}
      <div className="h-[32%] w-[30%]  absolute bottom-0 left-0 overflow-hidden">
        <div className="absolute top-0 left-[10%] rotate-45">
          <Ellipse15 width="100%" />
        </div>
        <div className="absolute bottom-[-5.5rem] left-[-5rem] rotate-90">
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
        <Box className="mb-[1rem] ">
          <p className="text-headline1 text-etc-black">Join Us!</p>
          <p className="text-headline4">Find your perfect pet stter with us</p>
        </Box>

        {/* form ************************************* */}
        <Formik
          initialValues={initialValues}
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

                {/* full name ********************************* */}
                <label
                  className="text-lg text-etc-black font-medium"
                  htmlFor="fullName"
                >
                  Your name
                </label>
                <Field
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
