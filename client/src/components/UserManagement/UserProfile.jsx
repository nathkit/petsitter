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
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import { Alert } from "@mui/material";
// import { makeStyles } from "@material-ui/styles";

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
  const { updateUserData, handleAvatar } = useUserProfile();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const params = useParams();

  const formikValues = {
    yourName: "",
    email: "",
    idNumber: "",
    phone: "",
    dateOfBirth: dayjs(new Date()),
  };

  useEffect(() => {
    setAlertMessage({
      message: "",
      severity: "",
    });
    const user = JSON.parse(window.localStorage.getItem("user"));
    const date = dayjs(new Date(user.dateOfbirth ? user.dateOfbirth : null));
    (formikValues.yourName = user.fullName),
      (formikValues.email = user.email),
      (formikValues.idNumber = user.idNumber),
      (formikValues.phone = user.phone),
      (formikValues.dateOfBirth = date),
      // (formikValues.avartar = user.avatar.avatarUrl),
      setUserAvatar(user.avatar);
  }, []);
  // const date = dayjs(new Date());
  // formik function ***********************************************
  const formik = useFormik({
    // const avatarName = userAvatar.avatarName,
    initialValues: formikValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (avatarFile || userAvatar) {
        const newValue = {
          ...values,
          avatarName: userAvatar.avatarName,
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
      <h1 className="text-headline3 ">Profile</h1>
      {/* form *********************************** */}
      <form
        onSubmit={(e, values) => {
          formik.handleSubmit(e, values);
        }}
        className="h-auto flex flex-col gap-[2rem] relative"
      >
        {/* upload image *********************************** */}
        <Box className="h-[15rem] relative mb-10">
          <UploadImage
            img={
              avatarUrl ? avatarUrl : userAvatar ? userAvatar.avatarUrl : null
            }
            onChange={async (e) => {
              setAvatarFile(e.target.files[0]);
              const imgUrl = URL.createObjectURL(e.target.files[0]);
              setAvatarUrl(imgUrl);
            }}
          />
        </Box>
        {/* alert box *************************************** */}
        {alertMessage ? (
          <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
        ) : null}
        {/* your name *********************************** */}
        <label htmlFor="yourName" className="text-body1">
          <p className="mb-4">your name*</p>
          <TextField
            className="TextField"
            fullWidth
            id="yourName"
            name="yourName"
            label="your name"
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
            <label htmlFor="email" className="text-body1">
              <p className="mb-4">Email*</p>
              <TextField
                className="TextField"
                fullWidth
                id="email"
                name="email"
                label="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </label>

            {/* id number *********************************** */}
            <label htmlFor="idNumber" className="text-body1">
              <p className="mb-4">Id number</p>
              <TextField
                className="TextField"
                fullWidth
                id="idNumber"
                name="idNumber"
                label="Id number"
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
            <label htmlFor="phone" className="text-body1">
              <p className="mb-4">Phone*</p>
              <TextField
                className="TextField"
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </label>

            {/* date of birth *********************************** */}
            <label htmlFor="dateOfBirth" className="text-body1">
              <p className="mb-4">Date of birth</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  className="TextField"
                  sx={{
                    width: "100%",
                  }}
                  label="Select your date of birth"
                  value={formik.values.dateOfBirth}
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    const newValue = value.local();
                    formik.setFieldValue("dateOfBirth", newValue);
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
