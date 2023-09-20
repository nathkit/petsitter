import axios from "axios";
import { useEffect, useState } from "react";

function PaymentGateway() {
  useEffect(() => {
    const publicKey = import.meta.env.REACT_APP_OMISE_PUBLIC_KEY;

    const loadOmiseScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.omise.co/omise.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = initializeOmiseCard;
      document.head.appendChild(script);
    };

    const initializeOmiseCard = () => {
      const { OmiseCard } = window;

      OmiseCard.configure({ publicKey });

      const button = document.querySelector("#checkoutButton");
      const form = document.querySelector("#checkoutForm");

      button.addEventListener("click", (event) => {
        event.preventDefault();
        OmiseCard.open({
          amount: 12345,
          currency: "THB",
          frameLabel: "Petsitter App",
          defaultPaymentMethod: "credit_card",
          //   submitLabel: "Pay NOW",
          //   buttonLabel: "Pay with Omise",
          onCreateTokenSuccess: (token) => {
            axios.post(`http://localhost:4000/payment`, {
              email: "panyawit@gmail.com",
              name: "panyawit",
              amount: "12345",
              token: token,
              headers: {
                "Content-Type": "application/json",
              },
            });
            form.submit();
          },
        });
      });
    };

    loadOmiseScript();
  }, []);

  return (
    <div className="own-form">
      <form id="checkoutForm" method="POST" action="/charge">
        <input type="hidden" name="omiseToken" />
        <input type="hidden" name="omiseSource" />
        <button type="submit" id="checkoutButton">
          Payment with credit Card
        </button>
      </form>
    </div>
  );
}

// function PaymentGateway() {
//   const [isScriptLoaded, setScriptLoaded] = useState(false);

//   useEffect(() => {
//     // สร้างตัวแปรสคริปต์
//     const script = document.createElement("script");
//     script.src = "https://cdn.omise.co/omise.js";
//     script.type = "text/javascript";
//     script.async = true;
//     script.onload = () => {
//       // เมื่อสคริปต์โหลดเสร็จสมบูรณ์
//       setScriptLoaded(true);
//       handleLoadScript();
//     };

//     // เพิ่มสคริปต์ลงใน DOM
//     document.head.appendChild(script);

//     return () => {
//       // ถ้าคุณต้องการทำความสะอาดหลังจากคอมโพเนนต์ถูกถอดออก
//       // คุณสามารถลบสคริปต์ออกจาก DOM ได้
//       document.head.removeChild(script);
//     };
//   }, []);

//   const handleLoadScript = () => {
//     if (window.OmiseCard) {
//       const OmiseCard = window.OmiseCard;
//       OmiseCard.configure({
//         publicKey: import.meta.env.REACT_APP_OMISE_PUBLIC_KEY,
//         currency: "THB",
//         frameLabel: "Borntodev Shop",
//         submitLabel: "Pay NOW",
//         buttonLabel: "Pay with Omise",
//       });
//     }
//   };

//   const creditCardConfigure = () => {
//     if (window.OmiseCard) {
//       const OmiseCard = window.OmiseCard;
//       OmiseCard.configure({
//         defaultPaymentMethod: "credit_card",
//         otherPaymentMethods: [],
//       });
//       OmiseCard.configureButton("#credit-card");
//       OmiseCard.attach();
//     }
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     creditCardConfigure();
//   };

//   return (
//     <div className="own-form">
//       {isScriptLoaded ? (
//         <form>
//           <button id="credit-card" type="button" onClick={handleClick}>
//             ชำระเงินด้วยบัตรเครดิต
//           </button>
//         </form>
//       ) : (
//         <p>Loading Omise Script...</p>
//       )}
//     </div>
//   );
// }

export default PaymentGateway;
