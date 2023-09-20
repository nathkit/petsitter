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
  yourName: yup
    .string("Enter your your name")
    .required("your name is required")
    .min(6, "your name is too short")
    .max(20, "your name is too long"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Enter your phone number")
    .test("startsWithZero", "Phone number must start with 0", (value) => {
      if (value) {
        return value.startsWith("0");
      }
      return true; // Allow empty value (optional phone number)
    })
    .min(10, "Phone numbers should have 10 character"),
  idNumber: yup
    .number()
    .min(0)
    .test(
      "isNumber",
      "IdNumber must be a valid number and exactly 13 characters",
      (val) =>
        typeof val === "number" && !isNaN(val) && val.toString().length === 13
    ),
});

const profile = () => {
  const { alertMessage, setAlertMessage } = useAuth();
  const { updateUserData } = useUserProfile();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    setAlertMessage({
      message: "",
      severity: "",
    });
    const newUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(newUser);
  }, []);
  const today = dayjs();
  const date = dayjs(new Date(user.dateOfbirth ? user.dateOfbirth : today));
  const formik = useFormik({
    initialValues: {
      yourName: user.fullName,
      email: user.email,
      idNumber: user.idNumber,
      phone: user.phone,
      dateOfBirth: date,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (avatarFile || user) {
        const newValue = {
          ...values,
          avatarName: user.image_name,
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
            img={avatarUrl ? avatarUrl : user ? user.image_path : null}
            onChange={async (e) => {
              setAvatarFile(e.target.files[0]);
              const imgUrl = URL.createObjectURL(e.target.files[0]);
              setAvatarUrl(imgUrl);
            }}
          />
        </Box>
        {/* your name *********************************** */}
        <label htmlFor="yourName" className="text-body1 text-etc-black">
          <p className="mb-4">your name*</p>
          <TextField
            className="TextField"
            fullWidth
            id="yourName"
            name="yourName"
            value={formik.values.yourName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.yourName && Boolean(formik.errors.yourName)}
            helperText={formik.touched.yourName && formik.errors.yourName}
          />
        </label>
        <Box className="flex gap-10">
          <Box className="w-[50%] flex flex-col gap-10">
            {/* email *********************************** */}
            <label htmlFor="email" className="text-body1 text-etc-black">
              <p className="mb-4">Email*</p>
              <TextField
                className="TextField"
                fullWidth
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
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
                error={Boolean(formik.errors.idNumber)}
                helperText={formik.errors.idNumber}
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
