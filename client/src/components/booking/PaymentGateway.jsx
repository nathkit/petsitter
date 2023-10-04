import axios from "axios";
import Script from "react-load-script";
import { useBooking } from "../../contexts/BookingContext";

let OmiseCard;

export default function PaymentGateway() {
  const { totalAmount, setConfirmbooking } = useBooking();

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5x5w3xryolrnev4hk37",
      // publicKey: import.meta.env.REACT_APP_OMISE_PUBLIC_KEY,
      currency: "THB",
      frameLabel: "Pet Sitter",
      submitLabel: "Pay Now",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [
        // "shopeepay",
        // "mobile_banking_scb",
        // "mobile_banking_kbank",
      ],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: totalAmount * 100,
      onCreateTokenSuccess: async (token) => {
        const result = await axios.post(`/pamentGateway`, {
          amount: totalAmount * 100,
          token: token,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.data.status == "successful") {
          alert("Payment Successful");
        } else {
          alert("Payment Failed");
        }
        console.log(result.data.status);
        setConfirmbooking(result.data.status);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  };

  return (
    <div className="own-form">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <button
          id="credit-card"
          type="button"
          onClick={handleClick}
          className={`inline-flex justify-center items-center py-3 px-6 rounded-full gap-2 border-none
          bg-orange-100 text-orange-500 text-bodyButton
          hover:text-orange-400 active:text-orange-600
           disabled:bg-gray-200 disabled:text-gray-100`}>
          Pay with debit card
        </button>
      </form>
    </div>
  );
}
