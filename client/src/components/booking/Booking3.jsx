import { CreditCardIcon, WalletIcon } from "../systemdesign/Icons";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";

function Booking3() {
  return (
    <>
      <div className=" bg-green-500 h-fit p-10">
        <div className=" flex justify-between w-full mb-12">
          <button
            className="py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 focus:text-orange-500
        focus:border-orange-500 "
          >
            <CreditCardIcon />
            <p className="ml-2">Credit Card</p>
          </button>
          <button className="py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 focus:text-orange-500 focus:border-orange-500">
            <WalletIcon />
            <p className="ml-2 ">Cash</p>
          </button>
        </div>
        {/* <Credit /> */}
        <Cash />
      </div>
    </>
  );
}

function Credit() {
  const validationSchema = yup.object({
    cardOwner: yup
      .string("Enter your name")
      .min(5, "Full name should be of minimum 5 characters length")
      .required("Name is required"),
    cardNumber: yup
      .string("Enter your card number")
      .test("is-number", "Enter a valid card number", (value) => {
        return /^\d+$/.test(value);
      })
      .test(
        "is-sixteen-digits",
        "Card number must be sixteen digits",
        (value) => {
          return value.length === 16;
        }
      )
      .required("Card number is required"),
    CVC: yup
      .string("Enter your CVC/CVV")
      .test("is-number", "Enter a valid CVC/CVV number", (value) => {
        return /^\d+$/.test(value);
      })
      .test(
        "is-three-digits",
        "CVC/CVV number must be three digits",
        (value) => {
          return value.length === 3;
        }
      )
      .required("CVC/CVV is required"),
    expiryDate: yup
      .string("Enter your expiry date")
      .required("Expiry date is required")
      .matches(
        /^[0-9]{2}\/[0-9]{2}$/,
        "Expiry date must be in the format MM/YY"
      ),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardOwner: "",
      expiryDate: "",
      CVC: "",
    },
    validationSchema: validationSchema,
    // onSubmit: (values) => {
    //   alert(JSON.stringify(values, null, 2));
    // },
  });
  return (
    <div>
      <div className=" flex justify-between flex-wrap gap-10">
        <TextField
          id="cardNumber"
          name="cardNumber"
          label="Card Number"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          placeholder="xxxx-xxxx-xxxx-xxxx"
          required
          className="w-[47%]"
        />
        <TextField
          id="cardOwner"
          name="cardOwner"
          label="Card Owner"
          value={formik.values.cardOwner}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cardOwner && Boolean(formik.errors.cardOwner)}
          helperText={formik.touched.cardOwner && formik.errors.cardOwner}
          placeholder="Card owner name"
          required
          className="w-[47%]"
        />
        <TextField
          id="expiryDate"
          name="expiryDate"
          label="Expiry Date"
          value={formik.values.expiryDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
          helperText={formik.touched.expiryDate && formik.errors.expiryDate}
          placeholder="xx/xx"
          required
          className="w-[47%]"
        />
        <TextField
          id="CVC"
          name="CVC"
          label="CVC/CVV"
          value={formik.values.CVC}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.CVC && Boolean(formik.errors.CVC)}
          helperText={formik.touched.CVC && formik.errors.CVC}
          placeholder="xxx"
          required
          className="w-[47%]"
        />
      </div>
    </div>
  );
}

function Cash() {
  return <div></div>;
}

export default Booking3;
