import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";

function Booking2({ setDisableButtonBooking2 }) {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .test("valid-email", "Enter a valid email from hotmail", (value) => {
        // ตรวจสอบว่าอีเมลมีเครื่องหมาย "@" และเป็น hotmail.com
        return value.includes("@hotmail");
      })
      .required("Email is required"),
    name: yup
      .string("Enter your name")
      .min(5, "Full name should be of minimum 5 characters length")
      .matches(/^[A-Za-z]+$/, "Name should contain only letters")
      .required("Name is required"),
    phone: yup
      .string("Enter your phone number")
      .test("is-number", "Enter a valid phone number", (value) => {
        // ตรวจสอบว่าเป็นตัวเลข
        return /^\d+$/.test(value);
      })
      .test("is-ten-digits", "Phone number must be ten digits", (value) => {
        // ตรวจสอบว่ามีความยาว 10 หลัก
        return value.length === 10;
      })
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
  });
  const isNameValid = formik.touched.name && !formik.errors.name;
  const isEmailValid = formik.touched.email && !formik.errors.email;
  const isPhoneValid = formik.touched.phone && !formik.errors.phone;
  const checkStatus =
    !formik.isValid || !isNameValid || !isEmailValid || !isPhoneValid;
  setDisableButtonBooking2(checkStatus);

  return (
    <>
      <div className=" bg-etc-white p-10  h-fit">
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Your Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          placeholder="Full name"
          required
          color="warning"
        />
        <div className="flex justify-between my-10">
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="your email"
            required
            className="w-[47%]"
            color="warning"
          />
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            placeholder="xxx xxx xxxx"
            required
            className="w-[47%]"
            color="warning"
          />
        </div>
        <hr className="mb-10" />
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Additional Message (To pet sitter)"
          multiline
          rows={4}
          color="warning"
        />
      </div>
    </>
  );
}

export default Booking2;
