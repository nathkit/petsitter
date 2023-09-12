import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Box } from "@mui/material";
import { ButtonPrimary } from "../systemdesign/Button";
import { UploadImage } from "../systemdesign/uploadImage";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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
  IdNumbers: yup
    .number()
    .integer()
    .min(0)
    .test(
      "isNumber",
      "IdNumber must be a valid number and exactly 13 characters long",
      (val) =>
        typeof val === "number" && !isNaN(val) && val.toString().length === 12
    ),
});

const profile = () => {
  // formik function ***********************
  const formik = useFormik({
    // pull from server *********************
    initialValues: {
      yourName: "",
      email: "",
      IdNumbers: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div className="flex flex-col gap-[4rem] h-[55.5rem] w-full">
      <h1 className="text-headline3 ">Profile</h1>

      {/* upload image *********************************** */}
      <Box className="h-[15rem]">
        <UploadImage />
      </Box>

      {/* form *********************************** */}
      <form
        onSubmit={formik.handleSubmit}
        className="h-[19rem] flex flex-col gap-[2rem] relative"
      >
        {/* your name *********************************** */}
        <label htmlFor="yourName" className="text-body1">
          <p className="mb-4">your name*</p>
          <TextField
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
            <label htmlFor="IdNumbers" className="text-body1">
              <p className="mb-4">Id number</p>
              <TextField
                fullWidth
                id="IdNumbers"
                name="IdNumbers"
                label="Id number"
                value={formik.values.IdNumbers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.IdNumbers && Boolean(formik.errors.IdNumbers)
                }
                helperText={formik.touched.IdNumbers && formik.errors.IdNumbers}
              />
            </label>
          </Box>
          <Box className="w-[50%] flex flex-col gap-10 ">
            {/* phone *********************************** */}
            <label htmlFor="phone" className="text-body1">
              <p className="mb-4">Phone*</p>
              <TextField
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
                  sx={{ width: "100%" }}
                  label="Select your date of birth"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    const newValue = value.local().format("DD-MM-YYYY");
                    formik.setFieldValue("dateOfBirth", newValue);
                  }}
                  slotProps={{
                    TextField: {
                      error:
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth),

                      helperText:
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                    },
                  }}
                />
              </LocalizationProvider>
            </label>
          </Box>
        </Box>

        {/* submit button ************************** */}
        <Box className="absolute right-0 bottom-[-11rem]">
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
