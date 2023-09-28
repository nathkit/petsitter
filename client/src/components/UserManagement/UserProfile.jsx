import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Box } from "@mui/material";
import { ButtonPrimary } from "../systemdesign/Button";
import { UploadImage } from "../systemdesign/uploadImage";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState, useEffect } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import { useAuth } from "../../contexts/authentication";
import { Alert } from "@mui/material";

dayjs.extend(utc);

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your your name")
    .required("your name is required")
    .min(6, "your name is too short")
    .max(20, "your name is too long"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  idNumber: yup
    .string()
    .required("Enter your id number")
    .matches(/^\d+$/, "Id numbers must contain only numeric characters")
    .test(
      "isExactly13Characters",
      "Id numbers should have exactly 13 characters",
      (value) => {
        if (value) {
          return value.length === 13;
        }
        return true;
      }
    ),
  phone: yup
    .string()
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
        return true;
      }
    ),
});

const profile = () => {
  const { alertMessage, setAlertMessage, userData, setUserData } = useAuth();
  const { updateUserData } = useUserProfile();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const initialValues = {};
  const today = dayjs();

  useEffect(() => {
    setAvatarUrl("");
    setAvatarFile(null);
    setAlertMessage({
      message: "",
      severity: "",
    });
    const newUser = JSON.parse(window.localStorage.getItem("user"));
    const date = dayjs(
      new Date(newUser.dateOfbirth ? newUser.dateOfbirth : today)
    );
    initialValues.fullName = newUser.fullName;
    initialValues.email = newUser.email;
    initialValues.idNumber = newUser.idNumber;
    initialValues.phone = newUser.phone;
    initialValues.dateOfBirth = date;
    setUserData(newUser);
  }, []);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (avatarFile || userData) {
        const newValue = {
          ...values,
          avatarName: userData.image_name,
          avatarFile: avatarFile,
        };
        await updateUserData(newValue);
      } else {
        alert("Error is occured!");
      }
    },
  });
  return (
    <div className="flex flex-col gap-[4rem] h-[55.5rem] w-full">
      <Box className="flex justify-between">
        <h1 className="text-headline3 ">Profile</h1>
        {/* alert box *************************************** */}
        {alertMessage ? (
          <Alert
            severity={alertMessage.severity}
            className="min-w-[30%] w-auto"
            sx={alertMessage.severity ? { boxShadow: 1 } : null}
          >
            {alertMessage.message}
          </Alert>
        ) : null}
      </Box>
      {/* form *********************************** */}
      <form
        onSubmit={(values, formikHelpers) => {
          formik.handleSubmit(values, formikHelpers);
        }}
        className="h-auto flex flex-col gap-[2rem] relative"
      >
        {/* upload image *********************************** */}
        <Box className="h-[15rem] relative mb-10">
          <UploadImage
            img={avatarUrl ? avatarUrl : userData ? userData.image_path : null}
            onChange={async (e) => {
              setAvatarFile(e.target.files[0]);
              const imgUrl = URL.createObjectURL(e.target.files[0]);
              setAvatarUrl(imgUrl);
            }}
          />
        </Box>
        {/* your name *********************************** */}
        <label htmlFor="fullName" className="text-body1 text-etc-black">
          <p className="mb-4">your name*</p>
          <TextField
            className="TextField"
            fullWidth
            id="fullName"
            name="fullName"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </label>
        <Box className="flex gap-10">
          <Box className="w-[50%] flex flex-col gap-10">
            {/* email *********************************** */}
            <label htmlFor="email" className="text-body1 text-etc-black">
              <p className="mb-4">Email*</p>
              <TextField
                disabled={userData ? true : false}
                className="TextField"
                fullWidth
                id="email"
                name="email"
                // disabled={formik.values.email ? true : null}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </label>

            {/* id number *********************************** */}
            <label htmlFor="idNumber" className="text-body1 text-etc-black">
              <p className="mb-4">Id number</p>
              <TextField
                className="TextField"
                fullWidth
                id="idNumber"
                name="idNumber"
                value={formik.values.idNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.idNumber && Boolean(formik.errors.idNumber)
                }
                helperText={formik.touched.idNumber && formik.errors.idNumber}
              />
            </label>
          </Box>
          <Box className="w-[50%] flex flex-col gap-10 ">
            {/* phone *********************************** */}
            <label htmlFor="phone" className="text-body1 text-etc-black">
              <p className="mb-4">Phone*</p>
              <TextField
                className="TextField"
                fullWidth
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </label>

            {/* date of birth *********************************** */}
            <label htmlFor="dateOfBirth" className="text-body1 text-etc-black">
              <p className="mb-4">Date of birth</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  className="TextField"
                  sx={{
                    width: "100%",
                  }}
                  label="Select your date of birth"
                  maxDate={today}
                  value={formik.values.dateOfBirth}
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    formik.setFieldValue("dateOfBirth", value);
                  }}
                />
              </LocalizationProvider>
            </label>
          </Box>
        </Box>

        {/* submit button ************************** */}
        <Box className="flex justify-end mt-10">
          <ButtonPrimary
            content="Update Profile"
            width="9.93rem"
            type="submit"
            variant="contained"
            color="secondary"
          />
        </Box>
      </form>
    </div>
  );
};

export default profile;
