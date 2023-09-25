import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/authentication.jsx";
import { BrowserRouter } from "react-router-dom";
import { BookingStatusProvider } from "./contexts/BookingStatusContext";
import jwtInterceptor from "./utils/jwtIntercepter.js";
import { BookingProvider } from "./contexts/BookingContext.jsx";
import { PetProvider } from "./contexts/petContext.jsx";
import { SitterProvider } from "./contexts/sitterContext.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SitterProvider>
          <PetProvider>
            <BookingStatusProvider>
              <BookingProvider>
                <App />
              </BookingProvider>
            </BookingStatusProvider>
          </PetProvider>
        </SitterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
