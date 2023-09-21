import { Route, Routes } from "react-router-dom";

import LoginPage from "./LoginPage";
import Register from "./RegisterPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default UnauthenticatedApp;
