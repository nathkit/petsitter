import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useBooking } from "./BookingContext";
import usePosts from "../hooks/usePost";

// let OmiseCard;

const omiseContext = React.createContext();

function OmiseProvider(props) {
  const [status, setStatus] = useState("");
  const { totalAmount } = useBooking();
  const [cardNumber, setCardNumber] = useState(null);
  const [cardOwner, setCardOwner] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvc, setCVC] = useState(null);
  const [bookingDataOmise, setBookingDataOmise] = useState({});
  const { createBooking } = usePosts();
  //   const handleLoadScript = () => {
  //     OmiseCard = window.OmiseCard;
  //     OmiseCard.configure({
  //       publicKey: "pkey_test_5x5w3xryolrnev4hk37",
  //       currency: "THB",
  //       frameLabel: "Pet Sitter",
  //       submitLabel: "Pay Now",
  //       buttonLabel: "Pay with Omise",
  //     });
  //   };

  // const creditCardConfigure = () => {
  //   OmiseCard.configure({
  //     defaultPaymentMethod: "credit_card",
  //     otherPaymentMethods: [
  //       // "shopeepay",
  //       // "mobile_banking_scb",
  //       // "mobile_banking_kbank",
  //     ],
  //   });
  //   OmiseCard.configureButton("#credit-card");
  //   OmiseCard.attach();
  // };

  const omiseCardHandler = async (data) => {
    let bodyFormData = new FormData();
    bodyFormData.append("card[expiration_month]", Number(month));
    bodyFormData.append("card[expiration_year]", Number(year));
    bodyFormData.append("card[name]", cardOwner);
    bodyFormData.append("card[number]", cardNumber);

    console.log(Number(month), "month");
    console.log(Number(year), "year");
    console.log(cardOwner, "cardOwner");
    console.log(cardNumber, "cardNumber");

    try {
      console.log(0);
      const token = await axios.post(
        `https://vault.omise.co/tokens`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: "pkey_test_5x5w3xryolrnev4hk37",
            password: "",
          },
        }
      );
      console.log(token.data.id);
      console.log(1);
      const result = await axios.post(`http://localhost:4000/pamentGateway`, {
        amount: totalAmount * 100,
        token: token.data.id,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result.data.message);
      setStatus(result.data.message);
      if (result.data.message == "successful") {
        await Swal.fire("Payment Successful", "", "success");
        createBooking(data);
      }
    } catch (error) {
      await Swal.fire("Payment Failed", "Return to search page.", "error");
    }
  };

  return (
    <omiseContext.Provider
      value={{
        omiseCardHandler,
        status,
        cardNumber,
        setCardNumber,
        cardOwner,
        setCardOwner,
        cvc,
        setCVC,
        month,
        setMonth,
        year,
        setYear,
        bookingDataOmise,
        setBookingDataOmise,
      }}
    >
      {props.children}
    </omiseContext.Provider>
  );
}

const useOmise = () => React.useContext(omiseContext);

export { useOmise, OmiseProvider };
