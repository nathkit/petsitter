import { CreditCardIcon, WalletIcon } from "../systemdesign/Icons";
import { Vector } from "../systemdesign/image";
import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import Script from "react-load-script";
import { useOmise } from "../../contexts/OmiseContext";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import InputAdornment from "@mui/material/InputAdornment";
function Booking3({ setDisableButtonBooking3 }) {
  const { paymentMethod, setPaymentMethod, totalAmount, setConfirmbooking } =
    useBooking();
  // const { handleLoadScript, omiseCardHandler, status } = useOmise();
  // const navigate = useNavigate();
  const [credit, setCredit] = useState("#ff7037");
  const [wallet, setWallet] = useState(null);
  // const [status, setStatus] = useState("");
  const handleCreditClick = () => {
    setPaymentMethod("Credit");
    setWallet(null);
  };
  const handleCashClick = () => {
    setPaymentMethod("Cash");
    setCredit(null);
  };

  return (
    <>
      <div className="bg-etc-white h-fit p-10">
        <div className="flex justify-between w-full mb-12">
          <button
            className={`py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 
          
            ${
              paymentMethod === "Credit"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleCreditClick();
              setCredit("#ff7037");
            }}
          >
            <CreditCardIcon color={credit} />
            <p className="ml-2 text-gray-500">Credit Card</p>
          </button>
          <button
            className={`py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 
            ${
              paymentMethod === "Cash"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleCashClick();
              setWallet("#ff7037");
              setDisableButtonBooking3(false);
            }}
          >
            <WalletIcon color={wallet} />
            <p className="ml-2 text-gray-500">Cash</p>
          </button>
        </div>
        {paymentMethod === "Credit" ? (
          <Credit setDisableButtonBooking3={setDisableButtonBooking3} />
        ) : (
          <Cash />
        )}
      </div>
    </>
  );
}

function Cash() {
  return (
    <div className=" bg-gray-100 p-10 flex flex-col items-center">
      <Vector />
      <p className=" text-center mt-6">
        If you want to pay by cash,
        <br />
        you are required to make a cash payment <br />
        upon arrival at the pet sitter'slocation.
      </p>
    </div>
  );
}

function Credit({ setDisableButtonBooking3 }) {
  const validationSchema = yup.object({
    cardOwner: yup
      .string("Enter your name")
      // .min(5, "Full name should be of minimum 5 characters length")
      .matches(/^[A-Za-z]+$/, "Name should contain only letters")
      .required("Name is required"),
    cardNumber: yup
      .string("Enter your card number")
      .test(
        "is-sixteen-digits",
        "Card number must be exactly 16 digits",
        (value) => {
          const numericValue = value.replace(/\D/g, "");
          return numericValue.length >= 16;
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
  });

  const isCardNumber = formik.touched.cardNumber && !formik.errors.cardNumber;
  const isCardOwner = formik.touched.cardOwner && !formik.errors.cardOwner;
  const isExpiryDate = formik.touched.expiryDate && !formik.errors.expiryDate;
  const isCVC = formik.touched.CVC && !formik.errors.CVC;

  setDisableButtonBooking3(
    !formik.isValid || !isCardNumber || !isCardOwner || !isCVC || !isExpiryDate
  );
  const { setCardNumber, setCardOwner, setMonth, setYear, setCVC, cardNumber } =
    useOmise();

  const formatCardNumber = (cardNumber) => {
    const numericValue = cardNumber.replace(/\D/g, "");
    const formattedValue = numericValue
      .slice(0, 16) // กำหนดความยาวสูงสุดให้เป็น 16 ตัวอักษร
      // .replace(/(\d{4})(?=\d{4})/g, "$1-") // จัดรูปแบบให้เป็น "xxxx-xxxx-xxxx-xxxx"
      // .trim();
      // .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    return formattedValue;
  };

  // const formatExpiryDate = (expiryDate) => {
  //   const numericValue = expiryDate.replace(/\D/g, ""); // ลบอักขระที่ไม่ใช่ตัวเลข
  //   const formattedValue = numericValue
  //     .slice(0, 4) // กำหนดความยาวสูงสุดให้เป็น 4 ตัวอักษร (xx/xx)
  //     .replace(/(\d{2})(?=\d{2})/, "$1/"); // จัดรูปแบบให้เป็น "xx/xx"
  //   return formattedValue;
  // };

  const formatExpiryDate = (expiryDate) => {
    const numericValue = expiryDate.replace(/\D/g, ""); // ลบอักขระที่ไม่ใช่ตัวเลข
    const formattedValue = numericValue
      .slice(0, 4) // กำหนดความยาวสูงสุดให้เป็น 4 ตัวอักษร (xx/xx)
      .replace(/(\d{2})(\d{2})/, "$1/$2"); // จัดรูปแบบให้เป็น "xxxx"
    return formattedValue;
  };

  // const {
  //   meta,
  //   getCardNumberProps,
  //   getExpiryDateProps,
  //   getCVCProps,
  //   getCardImageProps,
  // } = usePaymentInputs();

  return (
    <div>
      <div className=" flex  justify-between flex-wrap gap-10 w-full">
        <div className="flex w-full">
          <div className=" flex flex-col w-full mr-10">
            <label htmlFor="cardNumber">Card Number*</label>
            <TextField
              id="cardNumber"
              name="cardNumber"
              value={formatCardNumber(formik.values.cardNumber)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formattedValue = formatCardNumber(rawValue);
                formik.handleChange({
                  target: {
                    name: "cardNumber",
                    value: formattedValue,
                  },
                });
                // const cardNumberWithHyphen = formattedValue;
                // const cardNumberWithoutHyphen = cardNumberWithHyphen.replace(
                //   /-/g,
                //   ""
                // );
                // setCardNumber(cardNumberWithoutHyphen);
                // console.log(cardNumberWithoutHyphen);

                setCardNumber(formattedValue.replace(/\s/g, ""));
                console.log(formattedValue.replace(/\s/g, ""));
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              placeholder="xxxx xxxx xxxx xxxx"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <svg {...getCardImageProps({ images })} />
                //   </InputAdornment>
                // ),
                sx: { borderRadius: " 8px" },
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </div>
          <div className=" flex flex-col w-full">
            <label htmlFor="cardOwner">Card Owner*</label>
            <TextField
              id="cardOwner"
              name="cardOwner"
              // label="Card Owner"
              value={formik.values.cardOwner}
              onChange={(e) => {
                formik.handleChange(e);
                setCardOwner(e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardOwner && Boolean(formik.errors.cardOwner)
              }
              helperText={formik.touched.cardOwner && formik.errors.cardOwner}
              placeholder="Card owner name"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{ sx: { borderRadius: " 8px" } }}
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className=" flex flex-col w-full mr-10">
            <label htmlFor="expiryDate">Expiry Date*</label>
            <TextField
              id="expiryDate"
              name="expiryDate"
              // label="Expiry Date"
              value={formik.values.expiryDate}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue.replace(/\//g, ""); // ตัด / ออก
                const [month, year] = formattedValue.match(/.{1,2}/g) || []; // แยกเป็น 2 ค่า
                if (/^\d{2}$/.test(month) && /^\d{2}$/.test(year)) {
                  console.log("Month:", month);
                  console.log("Year:", year);
                  setMonth(month);
                  setYear(year);
                }
                formik.handleChange({
                  target: {
                    name: "expiryDate",
                    value: formatExpiryDate(formattedValue), // เรียกใช้ formatExpiryDate อีกครั้ง
                  },
                });
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
              placeholder="MM/YY"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{
                sx: { borderRadius: " 8px" },
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 5,
              }}
            />
          </div>
          <div className=" flex flex-col w-full ">
            <label htmlFor="CVC">CVC/CVV*</label>
            <TextField
              id="CVC"
              name="CVC"
              // label="CVC/CVV"
              value={formik.values.CVC}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/\D/g, ""); // ลบทุกอักขระที่ไม่ใช่ตัวเลข
                const formattedValue = numericValue.slice(0, 3); // กำหนดความยาวสูงสุดเป็น 3 ตัวเลข
                formik.handleChange({
                  target: {
                    name: "CVC",
                    value: formattedValue,
                  },
                });
                setCVC(formattedValue);
                console.log(formattedValue);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.CVC && Boolean(formik.errors.CVC)}
              helperText={formik.touched.CVC && formik.errors.CVC}
              placeholder="xxx"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{
                sx: { borderRadius: " 8px" },
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking3;
